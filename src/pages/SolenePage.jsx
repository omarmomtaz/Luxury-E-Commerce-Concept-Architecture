import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { useStore } from "../context/StoreContext";
import SoleneHeaderHero from "../components/solene/SoleneHeaderHero";
import SoleneParallaxCraft from "../components/solene/SoleneParallaxCraft";
import SoleneMoodSwitcher from "../components/solene/SoleneMoodSwitcher";
import SoleneLookbookArchive from "../components/solene/SoleneLookbookArchive";

export default function SolenePage() {
  const { isCartOpen, isCheckoutOpen } = useStore();
  // Opens in 9 PM Velvet Noir to contrast starkly with Maison Verre's Ivory
  const [mood, setMood] = useState("pm");
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return undefined;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Freeze Lenis cleanly while Cart Drawer or Checkout Modal is open
  useEffect(() => {
    if (!lenisRef.current) return;
    if (isCartOpen || isCheckoutOpen) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isCartOpen, isCheckoutOpen]);

  const toggleMood = () => setMood((prev) => (prev === "pm" ? "am" : "pm"));

  return (
    <div
      data-solene-mode={mood}
      className="min-h-screen bg-[var(--sol-bg)] text-[var(--sol-ink)] transition-colors duration-700 ease-luxury"
    >
      <SoleneHeaderHero mood={mood} onToggleMood={toggleMood} />
      <main>
        <SoleneParallaxCraft />
        <SoleneMoodSwitcher mood={mood} onSelectMood={setMood} />
        <SoleneLookbookArchive />
      </main>
    </div>
  );
}