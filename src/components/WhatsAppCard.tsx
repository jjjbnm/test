import { MessageCircle } from "lucide-react";

export function WhatsAppCard() {
  return (
    <div
      className="p-6 flex flex-col items-center text-center"
      style={{
        background: "#1F4D38",
        border: "2px solid #221C14",
        borderRadius: 8,
        boxShadow: "4px 5px 0 rgba(0,0,0,0.2)",
      }}
    >
      <div
        className="w-16 h-16 flex items-center justify-center mb-4"
        style={{ background: "#ECDBB0", borderRadius: 8, border: "2px solid #221C14" }}
      >
        <MessageCircle className="w-8 h-8" style={{ color: "#25D366" }} />
      </div>
      <h3 className="text-xl mb-2" style={{ fontWeight: 800, color: "#FBF6EA" }}>
        רוצים תגובה מהירה יותר?
      </h3>
      <p className="text-sm mb-6 leading-relaxed" style={{ color: "#ECDBB0" }}>
        צרו קצר עם יוצר האתר רציתם עם בעל הבית אל תדאגו נעשה כרטיס
      </p>
      <a
        href="https://wa.me/972548789008?text=%D7%A9%D7%9C%D7%95%D7%9D!%20%D7%A4%D7%A0%D7%99%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%A9%D7%9C%20%D7%A1%D7%A0%D7%98%D7%A8%20%D7%96%D7%95%D7%9C%20%D7%98%D7%95%D7%91%D7%99%20%F0%9F%9B%92"
        target="_blank"
        rel="noopener noreferrer"
        className="app-btn px-6 py-3 text-base w-full max-w-xs"
        style={{ background: "#25D366", color: "#fff", border: "2px solid #221C14" }}
      >
        <MessageCircle className="w-5 h-5" />
        פתחו וואטסאפ עכשיו
      </a>
      <p className="text-xs mt-4" dir="ltr" style={{ color: "#ECDBB0", fontFamily: "monospace" }}>
        054-878-9008
      </p>
    </div>
  );
}
