import { WhatsAppCard } from "@/components/WhatsAppCard";
import { Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

const categories = [
  { emoji: "🥦", label: "פירות וירקות טריים" },
  { emoji: "🍞", label: "מוצרי מזון בסיסיים" },
  { emoji: "🥛", label: "חלב ביצים וגבינות" },
  { emoji: "🍬", label: "ממתקים וחטיפים" },
  { emoji: "🧴", label: "ניקיון וטואלטיקה" },
  { emoji: "🥤", label: "משקאות קלים" },
];

const whyUs = [
  { title: "מחיר שכונתי", text: "מחירים נוחים על המוצרים שאתם קונים כל יום" },
  { title: "קרוב לבית", text: "ברחוב צבי הרר, נכנסים קונים ויוצאים בלי לבזבז זמן" },
  { title: "תמיד במלאי", text: "לחם חלב ביצים — תמיד על המדף" },
  { title: "שירות אישי", text: "פה מכירים את הלקוחות בשם לא רק את העגלה שלהם" },
];

function isStoreOpen() {
  const now = new Date();
  const day = now.getDay();
  const t = now.getHours() + now.getMinutes() / 60;
  if (day === 6) return false;
  if (day === 5) return t >= 7 && t < 15;
  return t >= 7 && t < 21;
}

export default function Home() {
  const [open, setOpen] = useState(isStoreOpen);

  useEffect(() => {
    const id = setInterval(() => setOpen(isStoreOpen()), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      {/* ─── Hero ─── */}
      <section style={{ background: "#13301F" }} className="px-4 pt-16 pb-20 text-center relative overflow-hidden">
        {/* subtle grid texture */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 32px)" }} />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* store name tag */}
          <div className="inline-block mb-6 px-5 py-2 text-sm font-bold"
            style={{ background: "#E2A23B", color: "#221C14", border: "2px solid #221C14", borderRadius: 8, boxShadow: "2px 3px 0 rgba(0,0,0,0.3)", transform: "rotate(-1deg)" }}>
            קרית אתא • רחוב צבי הרר 35
          </div>

          <h1 className="mb-4 leading-tight"
            style={{ fontSize: "clamp(2.8rem,8vw,6rem)", fontWeight: 800, color: "#FBF6EA", letterSpacing: "-0.02em" }}>
            סנטר זול טובי
          </h1>
          <p className="text-lg mb-10" style={{ color: "#ECDBB0", fontWeight: 500 }}>
            המכולת השכונתית שלכם — ממוצרי יסוד ועד ממתקים
          </p>

          {/* status + CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="px-6 py-3 font-bold text-base flex items-center gap-2"
              style={{
                background: open ? "#7FB87A" : "#C95C46",
                color: "#FBF6EA",
                border: "2px solid #221C14",
                borderRadius: 8,
                boxShadow: "2px 3px 0 rgba(0,0,0,0.3)",
              }}>
              <Clock className="w-5 h-5" />
              {open ? "פתוח עכשיו" : "סגור כעת"}
            </div>
            <Link href="/location"
              className="app-btn px-6 py-3 text-base"
              style={{ background: "#ECDBB0", color: "#221C14", border: "2px solid #221C14", boxShadow: "2px 3px 0 rgba(0,0,0,0.3)" }}>
              <MapPin className="w-5 h-5" />
              איך מגיעים?
            </Link>
          </div>
        </div>

        {/* bottom wave */}
        <svg viewBox="0 0 1440 60" className="absolute bottom-0 left-0 w-full" preserveAspectRatio="none" style={{ fill: "#FBF6EA" }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" />
        </svg>
      </section>

      {/* ─── Categories ─── */}
      <section className="px-4 py-14" style={{ background: "#FBF6EA" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl text-center mb-8" style={{ fontWeight: 800, color: "#221C14" }}>
            מה תמצאו אצלנו על המדף?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <div key={i}
                className="flex items-center gap-3 p-4"
                style={{
                  background: "#ECDBB0",
                  border: "2px solid #221C14",
                  borderRadius: 8,
                  boxShadow: "3px 4px 0 rgba(34,28,20,0.12)",
                }}>
                <span style={{ fontSize: 28 }}>{cat.emoji}</span>
                <span style={{ fontWeight: 700, color: "#221C14", fontSize: 15, lineHeight: 1.3 }}>{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Us ─── */}
      <section className="px-4 py-14" style={{ background: "#1F4D38" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl text-center mb-8" style={{ fontWeight: 800, color: "#FBF6EA" }}>
            למה לקנות אצל טובי?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {whyUs.map((item, i) => (
              <div key={i} className="p-6"
                style={{
                  background: "#13301F",
                  border: "2px solid #221C14",
                  borderRadius: 8,
                  boxShadow: "4px 5px 0 rgba(0,0,0,0.2)",
                }}>
                <div className="inline-block px-3 py-1 text-xs font-bold mb-3"
                  style={{ background: "#E2A23B", color: "#221C14", border: "2px solid #221C14", borderRadius: 6, boxShadow: "2px 2px 0 rgba(0,0,0,0.2)" }}>
                  {item.title}
                </div>
                <p style={{ color: "#ECDBB0", fontWeight: 500, lineHeight: 1.6 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WhatsApp Card ─── */}
      <section className="px-4 py-14" style={{ background: "#FBF6EA" }}>
        <div className="max-w-md mx-auto">
          <WhatsAppCard />
        </div>
      </section>
    </div>
  );
}
