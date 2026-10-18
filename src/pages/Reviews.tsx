import { useState, useEffect } from "react";
import { Star, MessageSquare } from "lucide-react";
import { format } from "date-fns";

type Review = { id: string; name: string; rating: number; text: string; date: string };

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    try { setReviews(JSON.parse(localStorage.getItem("reviews_tovi") || "[]")); } catch {}
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const r: Review = { id: Math.random().toString(36).slice(2), name: name.trim() || "לקוח/ה", rating, text: text.trim(), date: new Date().toISOString() };
    const updated = [r, ...reviews];
    setReviews(updated);
    localStorage.setItem("reviews_tovi", JSON.stringify(updated));
    setName(""); setText(""); setRating(5);
  };

  return (
    <div style={{ background: "#FBF6EA", minHeight: "100%" }}>
      {/* header */}
      <div style={{ background: "#13301F" }} className="px-4 pt-14 pb-16 text-center relative overflow-hidden">
        <svg viewBox="0 0 1440 60" className="absolute bottom-0 left-0 w-full" preserveAspectRatio="none" style={{ fill: "#FBF6EA" }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" />
        </svg>
        <div className="relative z-10 inline-flex items-center gap-3 mb-4">
          <div style={{ background: "#E2A23B", border: "2px solid #221C14", borderRadius: 8, boxShadow: "2px 3px 0 rgba(0,0,0,0.3)" }} className="p-3">
            <MessageSquare className="w-7 h-7" style={{ color: "#221C14" }} />
          </div>
        </div>
        <h1 className="relative z-10 text-4xl" style={{ fontWeight: 800, color: "#FBF6EA" }}>מה מספרים עלינו?</h1>
        <p className="relative z-10 mt-2 text-base" style={{ color: "#ECDBB0" }}>נשמח לשמוע איך הייתה הקנייה שלכם</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {/* form card */}
        <div className="p-6"
          style={{ background: "#ECDBB0", border: "2px solid #221C14", borderRadius: 8, boxShadow: "4px 5px 0 rgba(34,28,20,0.12)" }}>
          <h2 className="text-xl font-bold mb-6 text-center" style={{ color: "#221C14" }}>השאירו ביקורת</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* stars */}
            <div className="flex flex-col items-center gap-3">
              <span className="text-sm font-bold" style={{ color: "#221C14" }}>איך הייתם מדרגים את החוויה?</span>
              <div className="flex gap-1 p-3" dir="ltr"
                style={{ background: "#FBF6EA", border: "2px solid #221C14", borderRadius: 8 }}>
                {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} type="button"
                    onClick={() => setRating(s)}
                    onMouseEnter={() => setHover(s)}
                    onMouseLeave={() => setHover(0)}
                    className="p-1 transition-transform hover:scale-110 focus:outline-none">
                    <Star className="w-9 h-9"
                      style={{ color: s <= (hover || rating) ? "#E2A23B" : "#ECDBB0", fill: s <= (hover || rating) ? "#E2A23B" : "transparent", stroke: "#221C14", strokeWidth: 1.5 }} />
                  </button>
                ))}
              </div>
            </div>
            <input type="text" placeholder="השם שלכם (לא חובה)" value={name} onChange={e => setName(e.target.value)}
              className="w-full p-4 focus:outline-none text-base"
              style={{ background: "#FBF6EA", border: "2px solid #221C14", borderRadius: 8, color: "#221C14" }} />
            <textarea placeholder="ספרו לנו איך היה..." value={text} onChange={e => setText(e.target.value)} required
              className="w-full p-4 resize-none h-32 focus:outline-none text-base leading-relaxed"
              style={{ background: "#FBF6EA", border: "2px solid #221C14", borderRadius: 8, color: "#221C14" }} />
            <button type="submit" disabled={!text.trim()}
              className="w-full py-4 font-bold text-base"
              style={{
                background: "#D1432A", border: "2px solid #221C14", borderRadius: 8,
                color: "#FBF6EA", boxShadow: "2px 3px 0 rgba(0,0,0,0.2)",
                opacity: !text.trim() ? 0.5 : 1, cursor: !text.trim() ? "not-allowed" : "pointer",
              }}>
              שלח ביקורת לחנות
            </button>
          </form>
        </div>

        {/* reviews list */}
        <h3 className="text-lg font-bold" style={{ color: "#221C14" }}>ביקורות אחרונות</h3>
        {reviews.length === 0 ? (
          <div className="py-16 text-center"
            style={{ background: "#ECDBB0", border: "2px dashed #221C14", borderRadius: 8 }}>
            <p style={{ fontWeight: 700, color: "#221C14" }}>עדיין אין ביקורות</p>
            <p style={{ color: "#6b6555", fontSize: 14, marginTop: 4 }}>תהיו הראשונים לשתף!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {reviews.map(r => (
              <div key={r.id} className="p-5 flex flex-col gap-3"
                style={{ background: "#ECDBB0", border: "2px solid #221C14", borderRadius: 8, boxShadow: "3px 4px 0 rgba(34,28,20,0.1)" }}>
                <div className="flex items-center justify-between">
                  <span style={{ fontWeight: 800, color: "#221C14" }}>{r.name}</span>
                  <div className="flex gap-0.5" dir="ltr">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4"
                        style={{ color: i < r.rating ? "#E2A23B" : "#ECDBB0", fill: i < r.rating ? "#E2A23B" : "transparent", stroke: "#221C14", strokeWidth: 1.5 }} />
                    ))}
                  </div>
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#221C14" }}>{r.text}</p>
                <p className="text-xs font-mono" dir="ltr" style={{ color: "#6b6555" }}>
                  {format(new Date(r.date), "dd/MM/yyyy")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
