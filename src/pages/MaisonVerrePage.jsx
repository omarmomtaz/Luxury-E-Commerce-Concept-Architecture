import { useState } from "react";
import MVHeaderHero from "../components/maison-verre/MVHeaderHero";
import MVCatalog from "../components/maison-verre/MVCatalog";
import MVSuitBundler from "../components/maison-verre/MVSuitBundler";
import MVFitCalculator from "../components/maison-verre/MVFitCalculator";

export default function MaisonVerrePage() {
  const [sizeFilter, setSizeFilter] = useState(null);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#141413]">
      <MVHeaderHero />
      <main>
        <MVCatalog
          sizeFilter={sizeFilter}
          onClearSizeFilter={() => setSizeFilter(null)}
        />
        <MVSuitBundler recommendedSize={sizeFilter} />
        <MVFitCalculator onApplySizeFilter={(eu) => setSizeFilter(eu)} />
      </main>
    </div>
  );
}