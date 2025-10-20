export class QueryParams {
  private static isWindowExists() {
    return typeof window !== "undefined";
  }
  static set(key: string, value: string) {
    if (!this.isWindowExists()) return;

    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.pushState({}, "", url.toString());
  }

  static get(key: string) {
    if (!this.isWindowExists()) return "";

    const url = new URL(window.location.href);
    return url.searchParams.get(key) || "";
  }

  static delete(key: string) {
    if (!this.isWindowExists()) return;

    const url = new URL(window.location.href);
    url.searchParams.delete(key);
    window.history.pushState({}, "", url.toString());
  }

  static rawSet(params: string) {
    if (!this.isWindowExists()) return;

    const url = new URL(window.location.href);

    // Clear existing query params
    url.search = "";

    // Set the new params from the input string
    params.split("&").forEach((param) => {
      const [key, value] = param.split("=");
      if (key) url.searchParams.set(key, value || "");
    });

    window.history.pushState({}, "", url.toString());
  }

  static objectToQueryParams(
    obj: Record<string, string | number | boolean>
  ): string {
    if (typeof obj !== "object" || obj === null) {
      throw new Error("Input must be a non-null object.");
    }

    return Object.entries(obj)
      .map(([key, value]) => {
        // Handle nested objects or arrays
        if (typeof value === "object" && value !== null) {
          return (
            encodeURIComponent(key) +
            "=" +
            encodeURIComponent(JSON.stringify(value))
          );
        }
        return encodeURIComponent(key) + "=" + encodeURIComponent(value);
      })
      .join("&");
  }
}
