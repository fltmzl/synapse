/**
 * Code Generator Utility for Neo4j Sync
 * Generates unique codes in format: PREFIX_XXXXX (5 random digits)
 */

export const CODE_PREFIXES = {
  PERSON: "PERSON",
  COMPANY: "COMP",
  EDUCATION: "EDU",
  ASSOCIATION: "ASSOC",
  POLITICAL_PARTY: "PARTY",
  TERRITORY: "TERR",
  CATEGORY: "CAT",
  PLACE: "PLACE"
} as const;

type CodePrefix = (typeof CODE_PREFIXES)[keyof typeof CODE_PREFIXES];

/**
 * Generate a random 5-digit number
 */
function generateRandomDigits(length: number = 5): string {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum.toString();
}

/**
 * Generate a unique code with the given prefix
 * @param prefix - The prefix to use (e.g., 'PERSON', 'COMP')
 * @returns A unique code in format PREFIX_XXXXX
 */
export function generateCode(prefix: CodePrefix): string {
  const digits = generateRandomDigits(5);
  return `${prefix}_${digits}`;
}

/**
 * Validate if a code follows the correct format
 * @param code - The code to validate
 * @returns true if valid, false otherwise
 */
export function isValidCode(code: string): boolean {
  const validPrefixes = Object.values(CODE_PREFIXES).join("|");
  const codeRegex = new RegExp(`^(${validPrefixes})_\\d{5}$`);
  return codeRegex.test(code);
}

/**
 * Extract prefix from a code
 * @param code - The code to extract from (e.g., 'PERSON_12345')
 * @returns The prefix (e.g., 'PERSON') or null if invalid
 */
export function extractPrefix(code: string): CodePrefix | null {
  if (!isValidCode(code)) return null;
  return code.split("_")[0] as CodePrefix;
}
