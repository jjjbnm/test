const crypto = require("crypto");
function cookies(header = "") {
  return Object.fromEntries(header.split(";").map(x => x.trim()).filter(Boolean).map(x => { const i=x.indexOf("="); return [x.slice(0,i), decodeURIComponent(x.slice(i+1))]; }));
}
function signature(value, secret) { return crypto.createHmac("sha256", secret).update(value).digest("base64url"); }
module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).json({ error: "method_not_allowed" });
  const { code, state, error } = req.query || {};
  const jar = cookies(req.headers.cookie);
  const clear = "google_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/api/auth; Max-Age=0";
  if (error) { res.setHeader("Set-Cookie", clear); return res.redirect("/?login=cancelled"); }
  if (!code || !state || !jar.google_oauth_state || state !== jar.google_oauth_state) { res.setHeader("Set-Cookie", clear); return res.status(400).send("Invalid or expired OAuth state. Please try again."); }
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SESSION_SECRET, APP_BASE_URL } = process.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !SESSION_SECRET) { res.setHeader("Set-Cookie", clear); return res.status(500).send("Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and SESSION_SECRET in Vercel Environment Variables."); }
  const base = (APP_BASE_URL || "https://test-pi-self-42.vercel.app").replace(/\/$/, "");
  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", { method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body:new URLSearchParams({code,client_id:GOOGLE_CLIENT_ID,client_secret:GOOGLE_CLIENT_SECRET,redirect_uri:base+"/api/auth/callback/google",grant_type:"authorization_code"}) });
    const tokens = await tokenRes.json();
    if (!tokenRes.ok || !tokens.access_token) throw new Error("Token exchange failed");
    const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {headers:{Authorization:"Bearer "+tokens.access_token}});
    const profile = await profileRes.json();
    if (!profileRes.ok || !profile.id || !profile.email) throw new Error("Profile lookup failed");
    const payload = Buffer.from(JSON.stringify({sub:profile.id,email:profile.email,name:profile.name||"",picture:profile.picture||"",exp:Math.floor(Date.now()/1000)+604800})).toString("base64url");
    const session = payload + "." + signature(payload, SESSION_SECRET);
    res.setHeader("Set-Cookie", [clear, "retzef_session="+session+"; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800"]);
    return res.redirect("/?login=success");
  } catch (e) { res.setHeader("Set-Cookie", clear); return res.status(502).send("Google sign-in failed. Please try again."); }
};