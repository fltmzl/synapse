import { TransformResult } from "@/components/spider-graph/utils/graph-transformer";
import { api } from "@/lib/axios";

export class SpiderGraphApi {
  static async getSpiderGraph(type: "company" | "person", id: string) {
    const response = await api.post<{ data: TransformResult }>(
      "/api/get-spider-graph",
      { type, id }
    );
    return response.data.data;
  }
}
