import { ShoppingBag } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { MARKET_CURRENCIES } from "../../data/sharedData";

export default function UtilityControls({ showBag = true, dark = false }) {
  const { lang, toggleLang, currency, setCurrency, totals, setIsCartOpen } =
    useStore();

  const borderTone = dark ? "border-[#2B2926]" : "border-[#E4DFD6]";
  const textTone = dark ? "text-[#F2EDE6]" : "text-[#141413]";
  const mutedTone = dark ? "text-[#9E978D]" : "text-[#6E6A63]";

  return (
    <div className={`flex items-center gap-3 sm:gap-5 ${textTone}`}>
      {/* Currency Selector */}
      <label className="sr-only" htmlFor="currency-select">
        Currency
      </label>
      <select
        id="currency-select"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className={`bg-transparent text-[11px] uppercase ltr:tracking-[0.16em] rtl:tracking-normal py-2 pe-1 cursor-pointer focus:outline-none ${textTone}`}
      >
        {Object.values(MARKET_CURRENCIES).map((curr) => (
          <option
            key={curr.code}
            value={curr.code}
            className="bg-[#FAF9F6] text-[#141413]"
          >
            {curr.code}
          </option>
        ))}
      </select>

      <span className={`h-3.5 w-[1px] ${dark ? "bg-[#2B2926]" : "bg-[#D5CEC3]"}`} />

      {/* Language Toggle */}
      <button
        type="button"
        onClick={toggleLang}
        className={`min-h-[44px] px-1 text-[11px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal transition-opacity hover:opacity-60 ${textTone}`}
        aria-label="Toggle language"
      >
        {lang === "en" ? "العربية" : "EN"}
      </button>

      {/* Bag Trigger */}
      {showBag && (
        <>
          <span className={`h-3.5 w-[1px] ${dark ? "bg-[#2B2926]" : "bg-[#D5CEC3]"}`} />
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className={`min-h-[44px] flex items-center gap-2 text-[11px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal transition-opacity hover:opacity-60 ${textTone}`}
            aria-label="Open shopping bag"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.25]" />
            <span className="hidden sm:inline">
              {lang === "en" ? "Bag" : "الحقيبة"}
            </span>
            <span
              className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[10px] border ${borderTone} ${
                totals.totalItems > 0 ? textTone : mutedTone
              }`}
            >
              {totals.totalItems}
            </span>
          </button>
        </>
      )}
    </div>
  );
}