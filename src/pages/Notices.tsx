import { useState } from "react";
import { useListNotices, useCreateNotice, useDeleteNotice, getListNoticesQueryKey } from "../lib-api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Bell, AlertTriangle, Info, Tag, Trash2, Plus, Lock } from "lucide-react";
import { format } from "date-fns";

const typeStyles = {
  promo:   { bg: "#E2A23B", border: "#221C14", icon: Tag,           label: "מבצע" },
  info:    { bg: "#ECDBB0", border: "#221C14", icon: Info,          label: "עדכון" },
  warning: { bg: "#D1432A", border: "#221C14", icon: AlertTriangle, label: "חשוב" },
};

export default function Notices() {
  const { data: notices, isLoading } = useListNotices();
  const createNotice = useCreateNotice();
  const deleteNotice = useDeleteNotice();
  const queryClient = useQueryClient();

  const [clicks, setClicks] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pin, setPin] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [newText, setNewText] = useState("");
  const [newType, setNewType] = useState<"promo" | "info" | "warning">("info");

  const handleTitleClick = () => {
    if (isAdmin) return;
    const n = clicks + 1;
    setClicks(n);
    if (n >= 5) { setShowPinModal(true); setClicks(0); }
  };

  const verifyPin = () => {
    if (pin === "1234") { setIsAdmin(true); setShowPinModal(false); }
    else alert("קוד שגוי");
    setPin("");
  };

  const handlePost = () => {
    if (!newText.trim()) return;
    createNotice.mutate({ data: { text: newText, type: newType }, headers: { "x-admin-pin": "1234" } }, {
      onSuccess: () => {
        setNewText(""); setIsPosting(false);
        queryClient.invalidateQueries({ queryKey: getListNoticesQueryKey() });
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("למחוק הודעה זו?")) return;
    deleteNotice.mutate({ id, headers: { "x-admin-pin": "1234" } }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListNoticesQueryKey() })
    });
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
            <Bell className="w-7 h-7" style={{ color: "#221C14" }} />
          </div>
        </div>
        <h1 className="relative z-10 text-4xl select-none cursor-default" style={{ fontWeight: 800, color: "#FBF6EA" }}
          onClick={handleTitleClick}>
          לוח מודעות
        </h1>
        <p className="relative z-10 mt-2 text-base" style={{ color: "#ECDBB0" }}>עדכונים, מבצעים והודעות מהחנות</p>
      </div>

      {/* PIN modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(19,48,31,0.85)" }}>
          <div className="w-full max-w-sm p-8 space-y-5"
            style={{ background: "#ECDBB0", border: "2px solid #221C14", borderRadius: 8, boxShadow: "6px 7px 0 rgba(0,0,0,0.3)" }}>
            <h3 className="text-xl font-bold flex items-center justify-center gap-2" style={{ color: "#221C14" }}>
              <Lock className="w-5 h-5" /> כניסת מנהל
            </h3>
            <input type="password" placeholder="הקש קוד גישה" value={pin} onChange={e => setPin(e.target.value)}
              className="w-full p-4 text-center text-3xl tracking-[1em] font-mono focus:outline-none"
              style={{ background: "#FBF6EA", border: "2px solid #221C14", borderRadius: 8, color: "#221C14" }} />
            <div className="flex gap-3">
              <button onClick={() => setShowPinModal(false)} className="flex-1 py-3 font-bold rounded-lg"
                style={{ background: "#FBF6EA", border: "2px solid #221C14", color: "#221C14" }}>ביטול</button>
              <button onClick={verifyPin} className="flex-1 py-3 font-bold rounded-lg"
                style={{ background: "#D1432A", border: "2px solid #221C14", color: "#FBF6EA", boxShadow: "2px 3px 0 rgba(0,0,0,0.2)" }}>אישור</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-5">
        {/* admin panel */}
        {isAdmin && (
          <div className="p-6 space-y-4"
            style={{ background: "#1F4D38", border: "2px solid #221C14", borderRadius: 8, boxShadow: "4px 5px 0 rgba(0,0,0,0.2)" }}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-base flex items-center gap-2" style={{ color: "#FBF6EA" }}>
                <Plus className="w-5 h-5" /> פרסם מודעה חדשה
              </span>
              <button onClick={() => setIsPosting(!isPosting)} className="text-sm px-4 py-1.5 font-bold"
                style={{ background: "#ECDBB0", border: "2px solid #221C14", borderRadius: 6, color: "#221C14" }}>
                {isPosting ? "סגור" : "פתח"}
              </button>
            </div>
            {isPosting && (
              <div className="space-y-4 pt-4" style={{ borderTop: "2px solid rgba(255,255,255,0.15)" }}>
                <textarea value={newText} onChange={e => setNewText(e.target.value)}
                  placeholder="מה תרצו לעדכן את הלקוחות?..."
                  className="w-full p-4 resize-none h-28 focus:outline-none text-base"
                  style={{ background: "#FBF6EA", border: "2px solid #221C14", borderRadius: 8, color: "#221C14" }} />
                <div className="flex flex-wrap gap-2">
                  {(["info", "promo", "warning"] as const).map(t => (
                    <button key={t} onClick={() => setNewType(t)} className="px-4 py-2 text-sm font-bold"
                      style={{
                        background: newType === t ? "#E2A23B" : "#FBF6EA",
                        border: "2px solid #221C14", borderRadius: 6,
                        color: "#221C14",
                        boxShadow: newType === t ? "2px 2px 0 rgba(0,0,0,0.2)" : "none",
                      }}>
                      {t === "info" ? "עדכון" : t === "promo" ? "מבצע" : "חשוב"}
                    </button>
                  ))}
                </div>
                <button onClick={handlePost} disabled={!newText.trim() || createNotice.isPending}
                  className="w-full py-3 font-bold text-base"
                  style={{ background: "#D1432A", border: "2px solid #221C14", borderRadius: 8, color: "#FBF6EA", boxShadow: "2px 3px 0 rgba(0,0,0,0.2)", opacity: (!newText.trim() || createNotice.isPending) ? 0.6 : 1, cursor: (!newText.trim() || createNotice.isPending) ? "not-allowed" : "pointer" }}>
                  {createNotice.isPending ? "מפרסם..." : "פרסם מודעה עכשיו"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* notices list */}
        {isLoading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="h-28 animate-pulse"
              style={{ background: "#ECDBB0", border: "2px solid #221C14", borderRadius: 8 }} />
          ))
        ) : notices?.length === 0 ? (
          <div className="py-20 text-center"
            style={{ background: "#ECDBB0", border: "2px dashed #221C14", borderRadius: 8 }}>
            <Bell className="w-10 h-10 mx-auto mb-3" style={{ color: "#6b6555" }} />
            <p style={{ fontWeight: 700, color: "#221C14" }}>אין הודעות כרגע</p>
            <p style={{ color: "#6b6555", fontSize: 14 }}>חזרו להתעדכן מאוחר יותר</p>
          </div>
        ) : (
          notices?.map(notice => {
            const ts = typeStyles[notice.type as keyof typeof typeStyles] ?? typeStyles.info;
            const Icon = ts.icon;
            return (
              <div key={notice.id} className="p-5 relative"
                style={{ background: ts.bg, border: `2px solid ${ts.border}`, borderRadius: 8, boxShadow: "4px 5px 0 rgba(34,28,20,0.12)" }}>
                <div className="flex items-start gap-4">
                  <div className="p-2 shrink-0" style={{ background: "rgba(0,0,0,0.12)", borderRadius: 8 }}>
                    <Icon className="w-5 h-5" style={{ color: notice.type === "warning" ? "#FBF6EA" : "#221C14" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base leading-relaxed whitespace-pre-wrap"
                      style={{ fontWeight: 600, color: notice.type === "warning" ? "#FBF6EA" : "#221C14" }}>
                      {notice.text}
                    </p>
                    <p className="text-xs mt-2 font-mono" dir="ltr"
                      style={{ color: notice.type === "warning" ? "#ECDBB0" : "#6b6555" }}>
                      {format(new Date(notice.createdAt), "dd/MM/yyyy HH:mm")}
                    </p>
                  </div>
                </div>
                {isAdmin && (
                  <button onClick={() => handleDelete(notice.id)}
                    className="absolute top-3 left-3 p-2"
                    style={{ background: "rgba(0,0,0,0.15)", borderRadius: 6 }}>
                    <Trash2 className="w-4 h-4" style={{ color: notice.type === "warning" ? "#FBF6EA" : "#221C14" }} />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
