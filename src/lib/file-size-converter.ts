export class FileSizeConverter {
  /**
   * Convert bytes to kilobytes (KB)
   * @param bytes Number of bytes
   * @param decimals Number of decimal places (default: 0)
   * @returns Converted size in KB
   */
  static bytesToKB(bytes: number, decimals: number = 0): string {
    if (isNaN(bytes) || bytes < 0) {
      throw new Error("Invalid byte value. It must be a non-negative number.");
    }

    const kb = bytes / 1024;
    return `${kb.toFixed(decimals)} KB`;
  }

  /**
   * Convert bytes to human-readable format (KB, MB, GB, etc.)
   * @param bytes Number of bytes
   * @param decimals Number of decimal places (default: 2)
   * @returns Converted size with unit
   */
  static formatBytes(bytes: number, decimals: number = 0): string {
    if (isNaN(bytes) || bytes < 0) {
      throw new Error("Invalid byte value. It must be a non-negative number.");
    }

    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const converted = bytes / Math.pow(k, i);

    return `${converted.toFixed(decimals)} ${sizes[i]}`;
  }
}
