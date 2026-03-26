/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import axios from "axios";
import { getGoogleAccessToken } from "@/lib/google-auth";
import {
  VertexAnswerResponse,
  VertexSearchResponse
} from "@/types/vertex-ai.type";
import { marked } from "marked";

const PROJECT_NUMBER = "998658913219";
const LOCATION = "global";
const COLLECTION = "default_collection";
// const ENGINE_ID = "impact-ai-search_1772979629111";
const ENGINE_ID = "testing-impact-app-with-fi_1773505751585";
const SERVING_CONFIG = "default_search";

const BASE_URL = `https://discoveryengine.googleapis.com/v1alpha/projects/${PROJECT_NUMBER}/locations/${LOCATION}/collections/${COLLECTION}/engines/${ENGINE_ID}/servingConfigs/${SERVING_CONFIG}`;

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json(
        { message: "Query is required" },
        { status: 400 }
      );
    }

    const token = await getGoogleAccessToken();

    // 1. Hit Search Endpoint
    const searchResponse = await axios.post<VertexSearchResponse>(
      `${BASE_URL}:search`,
      {
        query,
        pageSize: 10,
        spellCorrectionSpec: { mode: "AUTO" },
        languageCode: "en-US",
        userInfo: { timeZone: "Asia/Jakarta" },
        session: `projects/${PROJECT_NUMBER}/locations/${LOCATION}/collections/${COLLECTION}/engines/${ENGINE_ID}/sessions/-`,
        contentSearchSpec: { snippetSpec: { returnSnippet: true } }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    const { sessionInfo } = searchResponse.data;

    if (!sessionInfo || !sessionInfo.queryId) {
      return NextResponse.json(
        {
          message: "Failed to initialize search session",
          detail: searchResponse.data
        },
        { status: 500 }
      );
    }

    // 2. Hit Answer Endpoint
    const answerResponse = await axios.post<VertexAnswerResponse>(
      `${BASE_URL}:answer`,
      {
        query: {
          text: query,
          queryId: sessionInfo.queryId
        },
        session: sessionInfo.name,
        relatedQuestionsSpec: { enable: true },
        answerGenerationSpec: {
          ignoreAdversarialQuery: false,
          ignoreNonAnswerSeekingQuery: false,
          ignoreLowRelevantContent: false,
          includeCitations: true,
          modelSpec: { modelVersion: "stable" }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("answerResponse", JSON.stringify(answerResponse.data, null, 2));
    const { answer } = answerResponse.data;

    // Enrichment: Map search results to answer references to include thumbnails and real URIs
    if (answer.references && searchResponse.data.results) {
      answer.references.forEach(async (ref) => {
        const docName =
          ref.chunkInfo?.documentMetadata?.document ||
          ref.structuredDocumentInfo?.document;
        if (docName) {
          const matchedResult = searchResponse.data.results.find(
            (r) => r.document.name === docName
          );
          if (matchedResult) {
            ref.thumbnail = (
              matchedResult.document.derivedStructData as any
            )?.image?.thumbnail;
            ref.gcsUri = (
              matchedResult.document.derivedStructData as any
            )?.link;
            ref.snippet = ref.chunkInfo?.content;
          }
        }
      });
    }

    return NextResponse.json({
      answer: answer,
      results: searchResponse.data.results
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Vertex AI API Error:",
        error.response?.data || error.message
      );
      return NextResponse.json(
        {
          message: "Error communicating with Vertex AI",
          detail: error.response?.data || error.message
        },
        { status: error.response?.status || 500 }
      );
    }

    console.error("Search Error:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
