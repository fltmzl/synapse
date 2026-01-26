import driver, { databaseName } from "@/lib/neo4j";

export class SpiderGraphService {
  static async getSpiderGraph(type: "company" | "person", id: string) {
    const session = driver.session({
      database: databaseName
    });

    try {
      // const query = `
      //   MATCH (center {id: $id})
      //   OPTIONAL MATCH (center)-[r1]-(l1)
      //   OPTIONAL MATCH (l1)-[r2]-(l2)
      //   WITH center, r1, l1, r2, l2
      //   WHERE l2 IS NULL OR l2 <> center
      //   RETURN center, r1, l1, r2, l2;
      // `;

      const query = `
          MATCH (center {id: $id})
          OPTIONAL MATCH path = (center)-[*1..3]-(n)
          RETURN center, path;
      `;

      const result = await session.run(query, { id });

      return result;
    } finally {
      await session.close();
    }
  }
}
