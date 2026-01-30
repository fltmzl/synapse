import { api } from "@/lib/axios";

export class SpiderGraphApi {
  static async getSpiderGraph(type: "company" | "person", id: string) {
    const response = await api.post("/api/get-spider-graph", { type, id });
    return response.data.data;
  }
}
