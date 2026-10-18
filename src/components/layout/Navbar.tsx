import { Link, useRoute } from "wouter";
import { Store, Clock, MapPin, Bell, MessageSquare, HelpCircle, ShoppingBasket } from "lucide-react";

const navItems = [
  { href: "/", label: "בית", icon: Store },
  { href: "/hours", label: "שעות", icon: Clock },
  { href: "/menu", label: "תפריט", icon: ShoppingBasket },
  { href: "/location", label: "מיקום", icon: MapPin },
  { href: "/notices", label: "מודעות", icon: Bell },
  { href: "/reviews", label: "ביקורות", icon: MessageSquare },
  { href: "/help", label: "עזרה", icon: HelpCircle },
];

export function Navbar() {
  return (
    <nav style={{ background: "#13301F", borderBottom: "2px solid #221C14" }} className="sticky top-0 z-50 w-full">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl flex items-center gap-2" style={{ color: "#ECDBB0" }}>
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
