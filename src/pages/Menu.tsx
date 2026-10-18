import { useMemo, useState } from "react";
import { Filter, ShoppingBasket, Tag } from "lucide-react";

type Category = "all" | "produce" | "sweets" | "cleaning" | "drinks" | "over100" | "basics";
type Product = { id: number; name: string; description: string; price: number; category: Exclude<Category, "all" | "over100">; emoji: string };

const categories: { id: Category; label: string; emoji: string }[] = [
  { id: "all", label: "הכול", emoji: "🛒" },
  { id: "produce", label: "פירות וירקות", emoji: "🥦" },
  { id: "sweets", label: "ממתקים וחטיפים", emoji: "🍬" },
  { id: "cleaning", label: "ניקיון וטואלטיקה", emoji: "🧴" },
  { id: "drinks", label: "משקאות", emoji: "🥤" },
  { id: "basics", label: "מוצרי יסוד", emoji: "🍞" },
  { id: "over100", label: "מעל 100 ש״ח", emoji: "💰" },
];

const products: Product[] = [
  { id: 1, name: "מארז פירות וירקות", description: "מבחר טרי ומשתנה לפי העונה", price: 119, category: "produce", emoji: "🥬" },
  { id: 2, name: "ארגז תפוזים", description: "תפוזים מתוקים — כ-10 ק״ג", price: 109, category: "produce", emoji: "🍊" },
  { id: 3, name: "בננות טריות", description: "מחיר לפי ק״ג", price: 8.9, category: "produce", emoji: "🍌" },
  { id: 4, name: "מארז חטיפים משפחתי", description: "מבחר חטיפים לכל המשפחה", price: 39.9, category: "sweets", emoji: "🍿" },
  { id: 5, name: "שוקולד חלב", description: "טבלת שוקולד 100 גרם", price: 8.5, category: "sweets", emoji: "🍫" },
  { id: 6, name: "מארז ממתקים למסיבה", description: "ממתקים צבעוניים לאירוח", price: 129, category: "sweets", emoji: "🍭" },
  { id: 7, name: "נוזל כביסה", description: "מארז גדול וחסכוני", price: 34.9, category: "cleaning", emoji: "🧼" },
  { id: 8, name: "נייר טואלט", description: "מארז 30 גלילים", price: 42.9, category: "cleaning", emoji: "🧻" },
  { id: 9, name: "מארז ניקיון לבית", description: "מטליות, חומר ניקוי וסבון", price: 115, category: "cleaning", emoji: "✨" },
  { id: 10, name: "מארז שתייה קלה", description: "מגוון בקבוקים ופחיות", price: 54.9, category: "drinks", emoji: "🥤" },
  { id: 11, name: "קפה טחון", description: "אריזה 500 גרם", price: 29.9, category: "drinks", emoji: "☕" },
  { id: 12, name: "מארז שתייה לאירוע", description: "מים ומשקאות קלים בכמות גדולה", price: 149, category: "drinks", emoji: "🧃" },
  { id: 13, name: "שמן, סוכר וקמח", description: "מארז מוצרי יסוד למטבח", price: 49.9, category: "basics", emoji: "🛍️" },
  { id: 14, name: "מארז קניות משפחתי", description: "מבחר מוצרי יסוד לשבוע", price: 189, category: "basics", emoji: "📦" },
];

const money = new Intl.NumberFormat("he-IL", { style: "currency", currency: "ILS" });

export default function Menu() {
  const [selected, setSelected] = useState<Category>("all");
  const filteredProducts = useMemo(
    () => products.filter((product) => selected === "all" || (selected === "over100" ? product.price > 100 : product.category === selected)),
    [selected],
  );

  return (
    <div style={{ background: "#FBF6EA", minHeight: "100%" }}>
      <header style={{ background: "#13301F" }} className="px-4 pt-14 pb-16 text-center relative overflow-hidden">
        <div className="relative z-10 inline-flex items-center gap-3 mb-4">
          <div style={{ background: "#E2A23B", border: "2px solid #221C14", borderRadius: 8, boxShadow: "2px 3px 0 rgba(0,0,0,0.3)" }} className="p-3">
            <ShoppingBasket className="w-8 h-8" style={{ color: "#221C14" }} />
          </div>
        </div>
        <h1 className="relative z-10 text-4xl" style={{ fontWeight: 800, color: "#FBF6EA" }}>התפריט שלנו</h1>
        <p className="relative z-10 mt-2 text-base" style={{ color: "#ECDBB0" }}>מוצרים, מחירים ומבצעים אצל טובי</p>
        <svg viewBox="0 0 1440 60" className="absolute bottom-0 left-0 w-full" preserveAspectRatio="none" style={{ fill: "#FBF6EA" }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" />
        </svg>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-4" style={{ color: "#221C14" }}>
          <Filter className="w-5 h-5" />
          <h2 className="text-xl font-bold">סינון לפי קטגוריה</h2>
        </div>
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((category) => {
            const active = selected === category.id;
            return (
              <button key={category.id} type="button" onClick={() => setSelected(category.id)}
                className="px-4 py-2.5 rounded-lg font-bold text-sm transition-transform hover:-translate-y-0.5"
                style={{ background: active ? "#D1432A" : "#ECDBB0", color: active ? "#FBF6EA" : "#221C14", border: "2px solid #221C14", boxShadow: active ? "2px 3px 0 rgba(0,0,0,0.2)" : "none" }}>
                <span className="ml-1.5">{category.emoji}</span>{category.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold" style={{ color: "#221C14" }}>{categories.find((category) => category.id === selected)?.label}</h2>
          <span className="text-sm font-bold" style={{ color: "#6b6555" }}>{filteredProducts.length} מוצרים</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center" style={{ background: "#ECDBB0", border: "2px dashed #221C14", borderRadius: 8 }}>אין מוצרים בקטגוריה הזו כרגע</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map((product) => (
              <article key={product.id} className="p-5 flex flex-col" style={{ background: "#ECDBB0", border: "2px solid #221C14", borderRadius: 8, boxShadow: "4px 5px 0 rgba(34,28,20,0.12)" }}>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="text-5xl" aria-hidden="true">{product.emoji}</div>
                  {product.price > 100 && <span className="px-2 py-1 text-xs font-bold" style={{ background: "#D1432A", color: "#FBF6EA", borderRadius: 5 }}><Tag className="inline w-3 h-3 ml-1" />מעל 100</span>}
                </div>
                <h3 className="text-lg font-bold" style={{ color: "#221C14" }}>{product.name}</h3>
                <p className="text-sm mt-1 mb-5 flex-1" style={{ color: "#6b6555" }}>{product.description}</p>
                <div className="text-2xl font-bold" style={{ color: "#D1432A" }}>{money.format(product.price)}</div>
              </article>
            ))}
          </div>
        )}
        <p className="text-center text-sm mt-10" style={{ color: "#6b6555" }}>המחירים עשויים להשתנות. למלאי ולמחיר עדכני מוזמנים לפנות אלינו.</p>
      </main>
    </div>
  );
}
