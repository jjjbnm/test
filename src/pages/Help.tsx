import { useState } from "react";
import { HelpCircle, AlertCircle, Lightbulb, MessageCircle, Mail } from "lucide-react";

const categories = [
  { id: "idea",     label: "הצעת רעיון",   icon: Lightbulb,    accent: "#E2A23B" },
  { id: "issue",    label: "דיווח על בעיה", icon: AlertCircle,  accent: "#D1432A" },
  { id: "question", label: "שאלה",          icon: HelpCircle,   accent: "#1F4D38" },
] as const;

const messages: Record<string, string> = {
  idea:     "היי טובי, יש לי רעיון לשפר את החנות:",
  issue:    "היי טובי, נתקלתי בבעיה באתר או בחנות:",
  question: "היי טובי, רציתי לשאול:",
};

export default function Help() {
  const [sel, setSel] = useState<string | null>(null);
  const prefill = sel ? messages[sel] : "";
  const selData = categories.find(c => c.id === sel);

  return (
    <div style={{ background: "#FBF6EA", minHeight: "100%" }}>
      {/* header */}
      <div style={{ background: "#13301F" }} className="px-4 pt-14 pb-16 text-center relative overflow-hidden">
        <svg viewBox="0 0 1440 60" className="absolute bottom-0 left-0 w-full" preserveAspectRatio="none" style={{ fill: "#FBF6EA" }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" />
        </svg>
        <div className="relative z-10 inline-flex items-center gap-3 mb-4">
          <div style={{ background: "#E2A23B", border: "2px solid #221C14", borderRadius: 8, boxShadow: "2px 3px 0 rgba(0,0,0,0.3)" }} className="p-3">
            <HelpCircle className="w-7 h-7" style={{ color: "#221C14" }} />
          </div>
        </div>
        <h1 className="relative z-10 text-4xl" style={{ fontWeight: 800, color: "#FBF6EA" }}>איך אפשר לעזור?</h1>
        <p className="relative z-10 mt-2 text-base" style={{ color: "#ECDBB0" }}>אנחנו כאן לכל שאלה, בקשה או הערה</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-5">
        {/* category cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isActive = sel === cat.id;
            return (
              <button key={cat.id} onClick={() => setSel(cat.id)}
                className="flex flex-col items-center p-7 text-center transition-opacity"
                style={{
                  background: isActive ? cat.accent : "#ECDBB0",
                  border: "2px solid #221C14",
                  borderRadius: 8,
                  boxShadow: isActive ? "4px 5px 0 rgba(0,0,0,0.2)" : "3px 4px 0 rgba(34,28,20,0.1)",
                  cursor: "pointer",
                }}>
                <div className="p-3 mb-4"
                  style={{
                    background: isActive ? "rgba(255,255,255,0.2)" : "#FBF6EA",
                    border: "2px solid #221C14",
                    borderRadius: 8,
                  }}>
                  <Icon className="w-8 h-8" style={{ color: isActive ? "#FBF6EA" : cat.accent }} />
                </div>
                <span style={{ fontWeight: 800, fontSize: 16, color: isActive ? "#FBF6EA" : "#221C14" }}>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* contact buttons */}
        {sel && (
          <div className="p-7 text-center space-y-5"
            style={{ background: "#ECDBB0", border: "2px solid #221C14", borderRadius: 8, boxShadow: "4px 5px 0 rgba(34,28,20,0.12)" }}>
            <div>
              <h3 className="text-xl font-bold" style={{ color: "#221C14" }}>צרו איתנו קשר עכשיו</h3>
              <p className="text-sm mt-1" style={{ color: "#6b6555" }}>
                בחרו את הדרך הנוחה לכם לשלוח לנו את ה{selData?.label}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`https://wa.me/972548789008?text=${encodeURIComponent(prefill)}`}
                target="_blank" rel="noreferrer"
                className="app-btn flex-1 py-4 text-base"
                style={{ background: "#25D366", border: "2px solid #221C14", borderRadius: 8, color: "#fff", boxShadow: "2px 3px 0 rgba(0,0,0,0.2)" }}>
                <MessageCircle className="w-5 h-5" />
                הודעת WhatsApp
              </a>
              <a href={`mailto:helpme9284772@gmail.com?subject=${encodeURIComponent("פנייה מסנטר זול טובי: " + (selData?.label ?? ""))}&body=${encodeURIComponent(prefill)}`}
                className="app-btn flex-1 py-4 text-base"
                style={{ background: "#D1432A", border: "2px solid #221C14", borderRadius: 8, color: "#FBF6EA", boxShadow: "2px 3px 0 rgba(0,0,0,0.2)" }}>
                <Mail className="w-5 h-5" />
                שליחת אימייל
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
