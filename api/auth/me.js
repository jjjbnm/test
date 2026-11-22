const crypto = require("crypto");
function cookies(header = "") { return Object.fromEntries(header.split(";").map(x=>x.trim()).filter(Boolean).map(x=>{const i=x.indexOf("=");return [x.slice(0,i),decodeURIComponent(x.slice(i+1))];})); }
module.exports = (req,res) => {
  res.setHeader("Cache-Control","no-store");
  const secret=process.env.SESSION_SECRET, token=cookies(req.headers.cookie).retzef_session;
  if(!secret||!token) return res.status(401).json({authenticated:false});
  const [payload,sig]=token.split(".");
  if(!payload||!sig) return res.status(401).json({authenticated:false});
  const expected=crypto.createHmac("sha256",secret).update(payload).digest("base64url");
  const a=Buffer.from(sig),b=Buffer.from(expected);
  if(a.length!==b.length||!crypto.timingSafeEqual(a,b)) return res.status(401).json({authenticated:false});
  try { const user=JSON.parse(Buffer.from(payload,"base64url").toString("utf8")); if(!user.exp||user.exp<Date.now()/1000)return res.status(401).json({authenticated:false}); return res.status(200).json({authenticated:true,user}); }
  catch { return res.status(401).json({authenticated:false}); }
};