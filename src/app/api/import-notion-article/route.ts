import { NextResponse } from "next/server";
import AdmZip from "adm-zip";
import z from "zod";
import { storage } from "@/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const formSchema = z.object({
  zipFile: z
    .instanceof(File, { message: "Zip file is required" })
    .refine((file) => file.size > 0, {
      message: "Zip file is empty"
    })
    .refine(
      (file) => {
        const validTypes = [
          "application/zip",
          "application/x-zip-compressed",
          "application/x-zip",
          "application/octet-stream"
        ];
        return (
          validTypes.includes(file.type) ||
          file.name.toLowerCase().endsWith(".zip")
        );
      },
      {
        message: "File must be a ZIP"
      }
    )
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const data = {
      zipFile: formData.get("zipFile")
    };

    const parsed = formSchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: z.treeifyError(parsed.error)
        },
        { status: 400 }
      );
    }
    const { zipFile } = parsed.data;

    // 1️⃣ File → Buffer
    const buffer = Buffer.from(await zipFile.arrayBuffer());

    // 2️⃣ Load Outer ZIP
    const outerZip = new AdmZip(buffer);
    const outerEntries = outerZip.getEntries();

    // 3️⃣ Find Inner ZIP (Notion export usually contains one zip file)
    const innerZipEntry = outerEntries.find((entry) =>
      entry.entryName.endsWith(".zip")
    );

    if (!innerZipEntry) {
      return NextResponse.json(
        { message: "Inner ZIP file not found in the uploaded archive" },
        { status: 400 }
      );
    }

    // 4️⃣ Load Inner ZIP
    const innerZipBuffer = innerZipEntry.getData();
    const innerZip = new AdmZip(innerZipBuffer);
    const innerEntries = innerZip.getEntries();

    // 5️⃣ Find HTML file
    const htmlEntry = innerEntries.find((entry) =>
      entry.entryName.endsWith(".html")
    );

    if (!htmlEntry) {
      return NextResponse.json(
        { message: "HTML file not found in the inner ZIP" },
        { status: 400 }
      );
    }

    let htmlContent = htmlEntry.getData().toString("utf8");

    // 6️⃣ Process Images
    // Find all img tags and their src
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    let match;
    const imageReplacements: { original: string; newUrl: string }[] = [];

    while ((match = imgRegex.exec(htmlContent)) !== null) {
      const originalSrc = match[1];
      // Skip absolute URLs
      if (originalSrc.startsWith("http") || originalSrc.startsWith("data:")) {
        continue;
      }

      // Decode URI component because Notion might encode spaces as %20
      const decodedSrc = decodeURIComponent(originalSrc);

      // Find the image entry in the inner zip
      const imageEntry = innerEntries.find(
        (entry) => entry.entryName === decodedSrc
      );

      if (imageEntry) {
        const imageBuffer = imageEntry.getData();
        const timestamp = Date.now();
        const fileName = `${timestamp}-${imageEntry.name.replace(/\s+/g, "-")}`;
        const storagePath = `images/${fileName}`;

        // Upload to Firebase Storage
        const storageRef = ref(storage, storagePath);
        await uploadBytes(storageRef, imageBuffer);
        const downloadUrl = await getDownloadURL(storageRef);

        imageReplacements.push({ original: originalSrc, newUrl: downloadUrl });
      }
    }

    // Replace original src with download URLs in HTML
    for (const replacement of imageReplacements) {
      // Use a more specific replacement to avoid partial matches
      const escapedOriginal = replacement.original.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );
      const regex = new RegExp(`src="${escapedOriginal}"`, "g");
      htmlContent = htmlContent.replace(regex, `src="${replacement.newUrl}"`);
    }

    // 7️⃣ Extract Title and Body Content
    const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : "Untitled Article";

    const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const bodyContent = bodyMatch ? bodyMatch[1] : htmlContent;

    return NextResponse.json({
      message: "Article imported successfully",
      data: {
        title: title,
        htmlContent: bodyContent
      }
    });
  } catch (err) {
    const error = err as { message: string; code: string };

    console.error("Import error:", error.message);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error.message
      },
      { status: 500 }
    );
  }
}
