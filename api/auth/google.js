import { randomBytes } from "node:crypto";

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const { GOOGLE_CLIENT_ID, APP_BASE_URL } = process.env;
  if (!GOOGLE_CLIENT_ID) {
    return res.status(500).send("Missing GOOGLE_CLIENT_ID.");
  }

  const base = (APP_BASE_URL || "https://test-pi-self-42.vercel.app").replace(/\/$/, "");
  const redirectUri = base + "/api/auth/callback/google";
  const state = randomBytes(32).toString("hex");

  res.setHeader("Set-Cookie", "google_oauth_state=" + state + "; HttpOnly; Secure; SameSite=Lax; Path=/api/auth; Max-Age=600");
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account"
  });

  res.statusCode = 302;
  res.setHeader("Location", "https://accounts.google.com/o/oauth2/v2/auth?" + params.toString());
  return res.end();
}