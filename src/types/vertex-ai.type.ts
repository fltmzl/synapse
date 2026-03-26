export interface VertexSearchResponse {
  results: VertexSearchResult[];
  totalSize: number;
  attributionToken: string;
  sessionInfo: {
    name: string;
    queryId: string;
  };
  semanticState: string;
}

export interface VertexSearchResult {
  id: string;
  document: {
    name: string;
    id: string;
    structData: Record<string, string>;
    derivedStructData: {
      clearbox_escorer_score: number;
      is_exact_match_query: number;
      source_type: string;
      can_fetch_raw_content: string;
      entity_type: string;
      snippets: Array<{
        snippet_status: string;
        snippet: string;
      }>;
    };
  };
  rankSignals: {
    keywordSimilarityScore: number;
    topicalityRank: number;
    boostingFactor: number;
    defaultRank: number;
  };
}

export interface VertexAnswerResponse {
  answer: {
    name: string;
    state: string;
    answerText: string;
    citations: Array<{
      startIndex?: string;
      endIndex: string;
      sources: Array<{
        referenceId: string;
      }>;
    }>;
    references: Array<{
      chunkInfo?: {
        content: string;
        relevanceScore: number;
        documentMetadata: {
          document: string;
          uri: string;
          title: string;
          pageIdentifier: string;
        };
      };
      structuredDocumentInfo?: {
        document: string;
        structData: Record<string, string>;
      };
      // Enrichment fields added by backend
      thumbnail?: string;
      gcsUri?: string;
      snippet?: string;
    }>;
    relatedQuestions: string[];
  };
  session: {
    name: string;
    state: string;
    userPseudoId: string;
    turns: Array<{
      query: {
        queryId: string;
        text: string;
      };
      answer: string;
    }>;
    startTime: string;
    endTime: string;
  };
  answerQueryToken: string;
}
