import { createHmac, timingSafeEqual } from "node:crypto";

function parseCookies(header = "") {
  return Object.fromEntries(
    header.split(";").map(part => part.trim()).filter(Boolean).map(part => {
      const i = part.indexOf("=");
      return [part.slice(0, i), decodeURIComponent(part.slice(i + 1))];
    })
  );
}

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const secret = process.env.SESSION_SECRET;
  const token = parseCookies(req.headers.cookie).retzef_session;
  if (!secret || !token) return res.status(401).json({ authenticated: false });

  const [payload, sig] = token.split(".");
  if (!payload || !sig) return res.status(401).json({ authenticated: false });

  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    const user = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!user.exp || user.exp < Date.now() / 1000) {
      return res.status(401).json({ authenticated: false });
    }
    return res.status(200).json({ authenticated: true, user });
  } catch {
    return res.status(401).json({ authenticated: false });
  }
}