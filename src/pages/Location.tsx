import { WhatsAppCard } from "@/components/WhatsAppCard";
import { MapPin, Phone, Navigation, Map } from "lucide-react";

export default function Location() {
  return (
    <div style={{ background: "#FBF6EA", minHeight: "100%" }}>
      {/* header */}
      <div style={{ background: "#13301F" }} className="px-4 pt-14 pb-16 text-center relative overflow-hidden">
        <svg viewBox="0 0 1440 60" className="absolute bottom-0 left-0 w-full" preserveAspectRatio="none" style={{ fill: "#FBF6EA" }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" />
        </svg>
        <div className="relative z-10 inline-flex items-center gap-3 mb-4">
          <div style={{ background: "#E2A23B", border: "2px solid #221C14", borderRadius: 8, boxShadow: "2px 3px 0 rgba(0,0,0,0.3)" }} className="p-3">
            <MapPin className="w-7 h-7" style={{ color: "#221C14" }} />
          </div>
        </div>
        <h1 className="relative z-10 text-4xl" style={{ fontWeight: 800, color: "#FBF6EA" }}>איך מגיעים?</h1>
        <p className="relative z-10 mt-2 text-base" style={{ color: "#ECDBB0" }}>קופצים רגע לטובי — צבי הרר 35, קרית אתא</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-5">
        {/* address card */}
        <div className="flex items-start gap-4 p-5"
          style={{ background: "#ECDBB0", border: "2px solid #221C14", borderRadius: 8, boxShadow: "4px 5px 0 rgba(34,28,20,0.12)" }}>
          <div style={{ background: "#1F4D38", border: "2px solid #221C14", borderRadius: 8 }} className="p-3 shrink-0">
            <MapPin className="w-6 h-6" style={{ color: "#FBF6EA" }} />
          </div>
          <div>
            <p style={{ fontWeight: 800, fontSize: 17, color: "#221C14" }}>הכתובת שלנו</p>
            <p style={{ color: "#6b6555", marginTop: 4 }}>רחוב צבי הרר 35, קרית אתא</p>
          </div>
        </div>

        {/* phone card */}
        <div className="flex items-start gap-4 p-5"
          style={{ background: "#ECDBB0", border: "2px solid #221C14", borderRadius: 8, boxShadow: "4px 5px 0 rgba(34,28,20,0.12)" }}>
          <div style={{ background: "#1F4D38", border: "2px solid #221C14", borderRadius: 8 }} className="p-3 shrink-0">
            <Phone className="w-6 h-6" style={{ color: "#FBF6EA" }} />
          </div>
          <div>
            <p style={{ fontWeight: 800, fontSize: 17, color: "#221C14" }}>טלפון בחנות</p>
            <p dir="ltr" style={{ color: "#6b6555", marginTop: 4, fontFamily: "monospace", fontSize: 16 }}>054-236-6800</p>
          </div>
        </div>

        {/* nav buttons */}
        <div className="grid grid-cols-2 gap-4">
          <a href="https://waze.com/ul?q=%D7%A6%D7%91%D7%99+%D7%94%D7%A8%D7%A8+35+%D7%A7%D7%A8%D7%99%D7%AA+%D7%90%D7%AA%D7%90&navigate=yes"
            target="_blank" rel="noreferrer"
            className="app-btn py-4 text-base"
            style={{ background: "#33CCFF", color: "#221C14", border: "2px solid #221C14", borderRadius: 8, boxShadow: "3px 4px 0 rgba(0,0,0,0.15)" }}>
            <Navigation className="w-5 h-5" />
            ניווט ב-Waze
          </a>
          <a href="https://www.google.com/maps/search/?api=1&query=%D7%A6%D7%91%D7%99+%D7%94%D7%A8%D7%A8+35+%D7%A7%D7%A8%D7%99%D7%AA+%D7%90%D7%AA%D7%90"
            target="_blank" rel="noreferrer"
            className="app-btn py-4 text-base"
            style={{ background: "#4285F4", color: "#fff", border: "2px solid #221C14", borderRadius: 8, boxShadow: "3px 4px 0 rgba(0,0,0,0.15)" }}>
            <Map className="w-5 h-5" />
            Google Maps
          </a>
        </div>

        {/* map placeholder */}
        <div className="w-full flex items-center justify-center py-12 mt-2"
          style={{ background: "#ECDBB0", border: "2px solid #221C14", borderRadius: 8, boxShadow: "4px 5px 0 rgba(34,28,20,0.12)" }}>
          <div className="text-center">
            <MapPin className="w-14 h-14 mx-auto mb-3" style={{ color: "#D1432A" }} />
            <p style={{ fontWeight: 700, color: "#221C14" }}>צבי הרר 35, קרית אתא</p>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="pt-4">
          <WhatsAppCard />
        </div>
      </div>
    </div>
  );
}
