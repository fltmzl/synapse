import * as XLSX from "xlsx";

function normalizeKey(value: string): string {
  return (
    value
      .toString()
      // 1. Normalisasi unicode (memisahkan aksen dsb)
      .normalize("NFKD")

      // 2. Hapus invisible characters & ganti NBSP jadi spasi biasa
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      .replace(/\u00A0/g, " ")

      // 3. Pangkas spasi di awal & akhir (termasuk U+0020 dan whitespace lainnya)
      .trim()

      // 4. Ubah ke lowercase
      .toLowerCase()

      // 5. Ubah spasi beruntun di tengah menjadi satu underscore
      .replace(/\s+/g, "_")

      // 6. Hapus semua karakter yang bukan huruf, angka, atau underscore
      .replace(/[^\w]/g, "")
  );
}

function debugStringChars(label: string, value: any) {
  if (!value) return;

  console.log(`🔍 ${label}`);
  [...value.toString()].forEach((char, i) => {
    console.log(
      i,
      `'${char}'`,
      `U+${char.charCodeAt(0).toString(16).toUpperCase()}`
    );
  });
}

type ParsedRow = Record<string, Record<string, any>>;

export function parseGroupedExcel(buffer: ArrayBuffer): ParsedRow[] {
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const rows = XLSX.utils.sheet_to_json<any[]>(sheet, {
    header: 1,
    defval: ""
  });

  if (rows.length < 3) return [];

  const groupHeader = rows[0];
  const fieldHeader = rows[1];

  const resolvedGroups: string[] = [];
  let currentGroup = "";

  for (let i = 0; i < fieldHeader.length; i++) {
    if (groupHeader[i]) {
      currentGroup = normalizeKey(groupHeader[i]);
    }
    resolvedGroups[i] = currentGroup;
  }

  const dataRows = rows.slice(2);

  return dataRows.map((row) => {
    const result: ParsedRow[number] = {};

    row.forEach((cell, index) => {
      const group = resolvedGroups[index];
      const field = normalizeKey(fieldHeader[index]);

      if (!group || !field) return;

      result[group] ??= {};
      // Trim cell value if it's a string, otherwise use as-is
      const trimmedValue = typeof cell === "string" ? cell.trim() : cell;
      result[group][field] = trimmedValue;
    });

    return result;
  });
}
