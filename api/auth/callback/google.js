import { createHmac, timingSafeEqual } from "node:crypto";

function parseCookies(header = "") {
  return Object.fromEntries(
    header.split(";").map(part => part.trim()).filter(Boolean).map(part => {
      const i = part.indexOf("=");
      return [part.slice(0, i), decodeURIComponent(part.slice(i + 1))];
    })
  );
}

function sign(value, secret) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const { code, state, error } = req.query || {};
  const jar = parseCookies(req.headers.cookie);
  const clearState = "google_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/api/auth; Max-Age=0";

  if (error) {
    res.setHeader("Set-Cookie", clearState);
    return res.redirect("/?login=cancelled");
  }

  if (!code || !state || !jar.google_oauth_state || state !== jar.google_oauth_state) {
    res.setHeader("Set-Cookie", clearState);
    return res.status(400).send("Invalid or expired OAuth state. Please try again.");
  }

  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SESSION_SECRET, APP_BASE_URL } = process.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !SESSION_SECRET) {
    res.setHeader("Set-Cookie", clearState);
    return res.status(500).send("Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and SESSION_SECRET in Vercel Environment Variables.");
  }

  const base = (APP_BASE_URL || "https://test-pi-self-42.vercel.app").replace(/\/$/, "");
  const redirectUri = base + "/api/auth/callback/google";

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
      })
    });
    const tokens = await tokenRes.json();
    if (!tokenRes.ok || !tokens.access_token) throw new Error("Token exchange failed");

    const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: "Bearer " + tokens.access_token }
    });
    const profile = await profileRes.json();
    if (!profileRes.ok || !profile.id || !profile.email) throw new Error("Profile lookup failed");

    const payload = Buffer.from(JSON.stringify({
      sub: profile.id,
      email: profile.email,
      name: profile.name || "",
      picture: profile.picture || "",
      exp: Math.floor(Date.now() / 1000) + 604800
    })).toString("base64url");

    const session = payload + "." + sign(payload, SESSION_SECRET);
    res.setHeader("Set-Cookie", [
      clearState,
      "retzef_session=" + session + "; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800"
    ]);
    return res.redirect("/?login=success");
  } catch (err) {
    console.error("Google OAuth callback failed:", err?.message || "unknown error");
    res.setHeader("Set-Cookie", clearState);
    return res.status(502).send("Google sign-in failed. Please try again.");
  }
}