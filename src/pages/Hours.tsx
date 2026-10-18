import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

const schedule = [
  { day: "ראשון",  time: "07:00 – 21:00", jsDay: 0 },
  { day: "שני",    time: "07:00 – 21:00", jsDay: 1 },
  { day: "שלישי", time: "07:00 – 21:00", jsDay: 2 },
  { day: "רביעי", time: "07:00 – 21:00", jsDay: 3 },
  { day: "חמישי", time: "07:00 – 21:00", jsDay: 4 },
  { day: "שישי",  time: "07:00 – 15:00", jsDay: 5 },
  { day: "שבת",   time: "סגור",           jsDay: 6 },
];

export default function Hours() {
  const [today, setToday] = useState(new Date().getDay());
  useEffect(() => { setToday(new Date().getDay()); }, []);

  return (
    <div style={{ background: "#FBF6EA", minHeight: "100%" }}>
      {/* header band */}
      <div style={{ background: "#13301F" }} className="px-4 pt-14 pb-16 text-center relative overflow-hidden">
        <svg viewBox="0 0 1440 60" className="absolute bottom-0 left-0 w-full" preserveAspectRatio="none" style={{ fill: "#FBF6EA" }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" />
        </svg>
        <div className="relative z-10 inline-flex items-center gap-3 mb-4">
          <div style={{ background: "#E2A23B", border: "2px solid #221C14", borderRadius: 8, boxShadow: "2px 3px 0 rgba(0,0,0,0.3)" }} className="p-3">
            <Clock className="w-7 h-7" style={{ color: "#221C14" }} />
          </div>
        </div>
        <h1 className="relative z-10 text-4xl" style={{ fontWeight: 800, color: "#FBF6EA" }}>שעות פתיחה</h1>
        <p className="relative z-10 mt-2 text-base" style={{ color: "#ECDBB0" }}>אנחנו כאן לאורך כל השבוע</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div style={{ border: "2px solid #221C14", borderRadius: 8, overflow: "hidden", boxShadow: "4px 5px 0 rgba(34,28,20,0.12)", background: "#ECDBB0" }}>
          {schedule.map((row, i) => {
            const isToday = row.jsDay === today;
            const isClosed = row.time === "סגור";
            return (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-5"
                style={{
                  background: isToday ? "#1F4D38" : i % 2 === 0 ? "#ECDBB0" : "#FBF6EA",
                  borderBottom: i < schedule.length - 1 ? "2px solid #221C14" : "none",
                }}>
                <div className="flex items-center gap-3">
                  {isToday && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded"
                      style={{ background: "#E2A23B", color: "#221C14", border: "1.5px solid #221C14" }}>
                      היום
                    </span>
                  )}
                  <span style={{ fontWeight: 800, fontSize: 18, color: isToday ? "#FBF6EA" : "#221C14" }}>{row.day}</span>
                </div>
                <span
                  dir="ltr"
                  style={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    fontSize: 17,
                    color: isClosed ? "#C95C46" : isToday ? "#ECDBB0" : "#1F4D38",
                  }}>
                  {row.time}
                </span>
              </div>
            );
          })}
        </div>

        {/* note */}
        <p className="text-center mt-6 text-sm" style={{ color: "#6b6555" }}>
          * שינויים בשעות יפורסמו בלוח המודעות
        </p>
      </div>
    </div>
  );
}
