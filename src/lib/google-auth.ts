import { GoogleAuth } from "google-auth-library";

/**
 * Gets a valid Google Cloud Access Token using the Service Account credentials
 * defined in the GOOGLE_CLOUD_CREDENTIALS environment variable.
 */
export async function getGoogleAccessToken(): Promise<string> {
  const credentials = JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS || "{}");

  const auth = new GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/cloud-platform"]
  });

  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();

  if (!tokenResponse.token) {
    throw new Error("Failed to retrieve Google Access Token");
  }

  return tokenResponse.token;
}
