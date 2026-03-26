import { marked } from "marked";
import { VertexAnswerResponse } from "@/types/vertex-ai.type";

/**
 * Processes the Vertex AI answer text to include citation markers and convert markdown to HTML.
 */
export async function processVertexResponse(
  answer: VertexAnswerResponse["answer"]
): Promise<string> {
  const { answerText, citations } = answer;
  if (!answerText) return "";

  // Helper to convert byte offset to character index.
  // Vertex AI citations often use UTF-8 byte offsets, which drift in JS strings
  // due to multi-byte characters like emojis, currency symbols (€), or accented letters (é).
  const encoder = new TextEncoder();
  const bytes = encoder.encode(answerText);
  const decoder = new TextDecoder();

  const getCharIndex = (byteOffset: number): number => {
    if (byteOffset <= 0) return 0;
    if (byteOffset >= bytes.length) return answerText.length;

    // Slice bytes up to the offset and decode to get the correct character count
    const subBytes = bytes.slice(0, byteOffset);
    return decoder.decode(subBytes).length;
  };

  // 1. Process citations and convert offsets
  const citationsWithCharIndex = citations.map((citation) => ({
    ...citation,
    charEndIndex: getCharIndex(Number(citation.endIndex))
  }));

  // Sort by charEndIndex descending to avoid shifting existing indices as we modify the string
  const sortedCitations = [...citationsWithCharIndex].sort(
    (a, b) => b.charEndIndex - a.charEndIndex
  );

  let processedText = answerText;

  sortedCitations.forEach((citation) => {
    const pos = citation.charEndIndex;
    if (pos < 0 || pos > processedText.length) return;

    const refId = citation.sources[0]?.referenceId || "0";
    const refIndex = parseInt(refId) - 1;
    const ref = answer.references?.[refIndex];

    let typeClass = "citation-file"; // Default fallback
    if (ref) {
      const gcsUri = ref.gcsUri || "";
      const metaTitle = ref.chunkInfo?.documentMetadata?.title || "";
      const structDoc = ref.structuredDocumentInfo?.document || "";
      const structTitle = ref.structuredDocumentInfo?.structData?.title || "";
      const title = metaTitle || structTitle || structDoc || "";

      if (
        gcsUri.toLowerCase().endsWith(".pdf") ||
        title.toLowerCase().includes("pdf")
      ) {
        typeClass = "citation-pdf";
      } else if (
        gcsUri.toLowerCase().match(/\.(png|jpg|jpeg|gif|webp)$/) ||
        title.toLowerCase().includes("image")
      ) {
        typeClass = "citation-image";
      }
    }

    // We add a data-ref attribute to link it to the reference data
    const citationHtml = `<span class="vertex-citation ${typeClass}" data-ref="${refId}"></span>`;

    processedText =
      processedText.slice(0, pos) + citationHtml + processedText.slice(pos);
  });

  // 2. Convert Markdown to HTML
  const rawHtml = await marked.parse(processedText);

  return rawHtml;
}
