import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import {
  Store, Clock, MapPin, Bell, MessageSquare, HelpCircle,
  ShoppingBasket, LogIn, ChevronDown, Link2, Info
} from "lucide-react";

type SessionUser = {
  name?: string;
  email?: string;
  picture?: string;
};

const navItems = [
  { href: "/", label: "בית", icon: Store },
  { href: "/hours", label: "שעות", icon: Clock },
  { href: "/menu", label: "תפריט", icon: ShoppingBasket },
  { href: "/location", label: "מיקום", icon: MapPin },
  { href: "/notices", label: "מודעות", icon: Bell },
  { href: "/reviews", label: "ביקורות", icon: MessageSquare },
  { href: "/help", label: "עזרה", icon: HelpCircle },
];

const quickLinks = [
  { href: "/", label: "דף הבית" },
  { href: "/hours", label: "שעות פתיחה" },
  { href: "/menu", label: "התפריט שלנו" },
  { href: "/location", label: "איך מגיעים אלינו" },
  { href: "/notices", label: "מודעות ועדכונים" },
  { href: "/reviews", label: "ביקורות" },
];

export function Navbar() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [linksOpen, setLinksOpen] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me", { credentials: "include", cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (active && data?.authenticated && data.user) setUser(data.user);
      })
      .catch(() => {
        if (active) setUser(null);
      });
    return () => { active = false; };
  }, []);

  const profileName = user?.name?.trim() || user?.email || "החשבון שלי";
  const initials = profileName.charAt(0).toUpperCase();

  const ProfileControl = () => user ? (
    <div className="relative">
      <button
        type="button"
        aria-label="פתיחת תפריט החשבון"
        aria-expanded={menuOpen}
        onClick={() => { setMenuOpen((open) => !open); setLinksOpen(false); }}
        className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center font-bold"
        style={{ background: "#D1432A", color: "#FBF6EA", border: "2px solid #ECDBB0", boxShadow: "2px 3px 0 rgba(0,0,0,0.3)" }}
      >
        {user.picture ? (
          <img src={user.picture} alt="תמונת פרופיל" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
        ) : <span>{initials}</span>}
      </button>

      {menuOpen && (
        <div
          dir="rtl"
          className="absolute left-0 mt-3 w-64 rounded-xl p-2 z-[100] shadow-xl"
          style={{ background: "#13301F", border: "2px solid #221C14", color: "#FBF6EA" }}
        >
          <div className="px-3 py-2 mb-1 border-b" style={{ borderColor: "#355642" }}>
            <div className="font-bold truncate">{profileName}</div>
            {user.email && <div className="text-xs truncate" style={{ color: "#ECDBB0" }}>{user.email}</div>}
          </div>

          <button
            type="button"
            onClick={() => setLinksOpen((open) => !open)}
            className="w-full flex items-center justify-between gap-2 px-3 py-3 rounded-lg text-sm font-bold text-right hover:bg-white/10"
          >
            <span className="flex items-center gap-2"><Link2 className="w-4 h-4" />קישורים</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${linksOpen ? "rotate-180" : ""}`} />
          </button>

          {linksOpen && (
            <div className="mr-3 mb-2 pr-3 border-r space-y-1" style={{ borderColor: "#D1432A" }}>
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => { setMenuOpen(false); setLinksOpen(false); }}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          <Link
            href="/help"
            onClick={() => { setMenuOpen(false); setLinksOpen(false); }}
            className="w-full flex items-center gap-2 px-3 py-3 rounded-lg text-sm font-bold hover:bg-white/10"
          >
            <Info className="w-4 h-4" />
            יצירת קשר ומידע
          </Link>
        </div>
      )}
    </div>
  ) : (
    <a
      href="/api/auth/google"
      className="ml-2 px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-2 whitespace-nowrap"
      style={{ background: "#D1432A", color: "#FBF6EA", border: "2px solid #221C14" }}
    >
      <LogIn className="w-4 h-4" />התחברות עם Google
    </a>
  );

  return (
    <nav style={{ background: "#13301F", borderBottom: "2px solid #221C14" }} className="sticky top-0 z-50 w-full">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <Link href="/" className="font-bold text-2xl flex items-center gap-2 shrink-0" style={{ color: "#ECDBB0" }}>
          <Store className="w-7 h-7" />
          <span style={{ fontWeight: 800 }}>סנטר זול טובי</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const [isActive] = useRoute(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm transition-opacity"
                style={{
                  background: isActive ? "#D1432A" : "transparent",
                  color: isActive ? "#FBF6EA" : "#ECDBB0",
                  border: isActive ? "2px solid #221C14" : "2px solid transparent",
                  boxShadow: isActive ? "2px 3px 0 rgba(0,0,0,0.3)" : "none",
                  fontWeight: 700,
                }}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
        <ProfileControl />
      </div>

      {/* Mobile tab bar */}
      <div className="md:hidden flex overflow-x-auto pb-3 px-4 pt-1 gap-2 hide-scrollbar">
        {navItems.map((item) => {
          const [isActive] = useRoute(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shrink-0 transition-opacity"
              style={{
                background: isActive ? "#D1432A" : "#1F4D38",
                color: "#FBF6EA",
                border: "2px solid #221C14",
                boxShadow: isActive ? "2px 3px 0 rgba(0,0,0,0.3)" : "none",
                fontWeight: 700,
              }}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
