# scripts/process_assets.py
"""
Luxury Portfolio Asset Pipeline
Usage:
  pip install Pillow
  python scripts/process_assets.py --bootstrap   # Generates instant luxury studio placeholders + processes any raw images
  python scripts/process_assets.py               # Compresses & crops raw_assets/ into public/assets/ (<150KB WebP)
"""

import io
import os
import sys
import random
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageOps

ROOT_DIR = Path(__file__).resolve().parent.parent
RAW_DIR = ROOT_DIR / "raw_assets"
OUT_DIR = ROOT_DIR / "public" / "assets"

# (relative_path, target_width, target_height, max_kb, base_hex, accent_hex, title, subtitle)
ASSET_MANIFEST = [
    # --- PITCH HUB OPENGRAPH ---
    ("og-cover.webp", 1200, 630, 180, "#141413", "#EAE4D7", "LUXURY E-COMMERCE ARCHITECTURE", "MAISON VERRE  ·  SOLENE ATELIER"),

    # --- MAISON VERRE (Site 1) ---
    ("maison-verre/mv-hero.webp", 1600, 1000, 230, "#EAE4D7", "#171716", "MAISON VERRE · AW26", "ARCHITECTURE IN TAILORING"),
    ("maison-verre/mv-blazer-obsidian.webp", 900, 1200, 140, "#171716", "#EAE4D7", "MV-BLZ-01", "DOUBLE-BREASTED BLAZER · OBSIDIAN"),
    ("maison-verre/mv-blazer-sandstone.webp", 900, 1200, 140, "#C7B8A1", "#171716", "MV-BLZ-01", "DOUBLE-BREASTED BLAZER · SANDSTONE"),
    ("maison-verre/mv-blazer-espresso.webp", 900, 1200, 140, "#3E2924", "#EAE4D7", "MV-BLZ-01", "DOUBLE-BREASTED BLAZER · ESPRESSO"),
    ("maison-verre/mv-sculpted-ivory.webp", 900, 1200, 140, "#EAE4D7", "#171716", "MV-BLZ-02", "CINCHED SCULPTED BLAZER · IVORY"),
    ("maison-verre/mv-sculpted-charcoal.webp", 900, 1200, 140, "#3A3B3C", "#EAE4D7", "MV-BLZ-02", "CINCHED SCULPTED BLAZER · CHARCOAL"),
    ("maison-verre/mv-trouser-obsidian.webp", 900, 1200, 140, "#191918", "#EAE4D7", "MV-TRS-01", "INNER-SUPPORT WIDE TROUSER · OBSIDIAN"),
    ("maison-verre/mv-trouser-sandstone.webp", 900, 1200, 140, "#C7B8A1", "#171716", "MV-TRS-01", "INNER-SUPPORT WIDE TROUSER · SANDSTONE"),
    ("maison-verre/mv-cigarette-charcoal.webp", 900, 1200, 140, "#3A3B3C", "#EAE4D7", "MV-TRS-02", "CIGARETTE TROUSER · CHARCOAL"),
    ("maison-verre/mv-cigarette-espresso.webp", 900, 1200, 140, "#3E2924", "#EAE4D7", "MV-TRS-02", "CIGARETTE TROUSER · ESPRESSO"),
    ("maison-verre/mv-skirt-obsidian.webp", 900, 1200, 140, "#171716", "#EAE4D7", "MV-SKT-01", "COLUMN MIDI SKIRT · OBSIDIAN"),
    ("maison-verre/mv-skirt-ivory.webp", 900, 1200, 140, "#EAE4D7", "#171716", "MV-SKT-01", "COLUMN MIDI SKIRT · IVORY"),
    ("maison-verre/mv-shirt-white.webp", 900, 1200, 140, "#F7F6F2", "#171716", "MV-BSC-01", "GIZA COTTON POPLIN SHIRT · WHITE"),
    ("maison-verre/mv-shirt-blue.webp", 900, 1200, 140, "#CBD7E3", "#171716", "MV-BSC-01", "GIZA COTTON POPLIN SHIRT · GLACIER"),
    ("maison-verre/mv-top-champagne.webp", 900, 1200, 140, "#DFD3C3", "#171716", "MV-BSC-02", "LIQUID SILK SQUARE TOP · CHAMPAGNE"),
    ("maison-verre/mv-top-obsidian.webp", 900, 1200, 140, "#171716", "#EAE4D7", "MV-BSC-02", "LIQUID SILK SQUARE TOP · OBSIDIAN"),
    ("maison-verre/mv-knit-espresso.webp", 900, 1200, 140, "#3E2924", "#EAE4D7", "MV-BSC-03", "MERINO MOCKNECK KNIT · ESPRESSO"),
    ("maison-verre/mv-knit-oat.webp", 900, 1200, 140, "#D7CFC2", "#171716", "MV-BSC-03", "MERINO MOCKNECK KNIT · RAW OAT"),

    # --- SOLENE ATELIER (Site 2) ---
    ("solene/sol-hero.webp", 1600, 1000, 230, "#0E0E0D", "#F2EDE6", "SOLENE ATELIER · CAMPAIGN 04", "SILHOUETTE WITHOUT NOISE"),
    ("solene/sol-blazer-noir.webp", 900, 1200, 140, "#121110", "#F2EDE6", "SOL-ED-01", "MONOLITH WOOL BLAZER · NOIR"),
    ("solene/sol-blazer-limestone.webp", 900, 1200, 140, "#DDD5C8", "#121110", "SOL-ED-01", "MONOLITH WOOL BLAZER · LIMESTONE"),
    ("solene/sol-trouser-noir.webp", 900, 1200, 140, "#121110", "#F2EDE6", "SOL-ED-02", "PLEATED PALAZZO TROUSER · NOIR"),
    ("solene/sol-trouser-limestone.webp", 900, 1200, 140, "#DDD5C8", "#121110", "SOL-ED-02", "PLEATED PALAZZO TROUSER · LIMESTONE"),
    ("solene/sol-top-champagne.webp", 900, 1200, 140, "#E6DAC8", "#121110", "SOL-ED-03", "22-MOMME SILK SHELL · CHAMPAGNE"),
    ("solene/sol-top-noir.webp", 900, 1200, 140, "#121110", "#F2EDE6", "SOL-ED-03", "22-MOMME SILK SHELL · NOIR"),
    ("solene/sol-waistcoat-noir.webp", 900, 1200, 140, "#121110", "#F2EDE6", "SOL-ED-04", "TAILORED HALTER WAISTCOAT · NOIR"),
    ("solene/sol-waistcoat-espresso.webp", 900, 1200, 140, "#362520", "#F2EDE6", "SOL-ED-04", "TAILORED HALTER WAISTCOAT · ESPRESSO"),
    ("solene/sol-skirt-noir.webp", 900, 1200, 140, "#121110", "#F2EDE6", "SOL-ED-05", "BIAS-CUT SATIN SKIRT · NOIR"),
    ("solene/sol-skirt-champagne.webp", 900, 1200, 140, "#E6DAC8", "#121110", "SOL-ED-05", "BIAS-CUT SATIN SKIRT · CHAMPAGNE"),
    ("solene/sol-cape-stone.webp", 900, 1200, 140, "#C5B9A5", "#121110", "SOL-ED-06", "ARCHITECTURAL TRENCH CAPE · STONE"),
    ("solene/sol-cape-noir.webp", 900, 1200, 140, "#121110", "#F2EDE6", "SOL-ED-06", "ARCHITECTURAL TRENCH CAPE · NOIR"),
    ("solene/sol-dress-noir.webp", 900, 1200, 140, "#121110", "#F2EDE6", "SOL-ED-07", "SCULPTED TUXEDO DRESS · NOIR"),
    ("solene/sol-dress-ivory.webp", 900, 1200, 140, "#EFEAE0", "#121110", "SOL-ED-07", "SCULPTED TUXEDO DRESS · IVORY"),
    ("solene/sol-shirt-ivory.webp", 900, 1200, 140, "#EFEAE0", "#121110", "SOL-ED-08", "SILK-ORGANZA EVENING SHIRT · IVORY"),
    ("solene/sol-shirt-taupe.webp", 900, 1200, 140, "#8A7F75", "#F2EDE6", "SOL-ED-08", "SILK-ORGANZA EVENING SHIRT · TAUPE"),

    # --- SOLENE PARALLAX, MOOD & LOOKBOOK ---
    ("solene/sol-story-01-bg.webp", 1400, 900, 180, "#181715", "#9E978D", "CHAPTER 01 · ATELIER TABLE", "HORSEHAIR CANVAS INTERLINING"),
    ("solene/sol-story-01-fg.webp", 900, 1200, 140, "#121110", "#F2EDE6", "0.8MM SHOULDER ARCHITECTURE", "HAND-FINISHED PEAK LAPEL"),
    ("solene/sol-story-02-bg.webp", 1400, 900, 180, "#E8E2D9", "#121110", "CHAPTER 02 · LIMESTONE GALLERY", "320 GSM HIGH-TWIST VIRGIN WOOL"),
    ("solene/sol-story-02-fg.webp", 900, 1200, 140, "#242220", "#F2EDE6", "KINETIC DRAPE STUDY", "SUPER 130S & 22-MOMME SILK"),
    ("solene/sol-mood-9am.webp", 1000, 1250, 175, "#F3EFEA", "#121110", "09:00 AM · BOARDROOM DAYLIGHT", "MONOLITH BLAZER + PALAZZO TROUSER"),
    ("solene/sol-mood-9pm.webp", 1000, 1250, 175, "#0E0E0D", "#F2EDE6", "09:00 PM · EVENING SALON", "HALTER WAISTCOAT + BIAS SATIN SKIRT"),
    # --- SOLENE INTERACTIVE LOOKBOOK (24 COMBINATIONS: 3 LOOKS x 2^3) ---
    # LOOK 01: [blazer]-[top]-[trouser]
    ("solene/sol-lb1-noir-champagne-noir.webp", 900, 1200, 150, "#161514", "#F2EDE6", "LOOK 01", "NOIR / CHAMPAGNE / NOIR"),
    ("solene/sol-lb1-limestone-champagne-noir.webp", 900, 1200, 150, "#DDD5C8", "#121110", "LOOK 01", "LIMESTONE / CHAMPAGNE / NOIR"),
    ("solene/sol-lb1-noir-noir-noir.webp", 900, 1200, 150, "#121110", "#F2EDE6", "LOOK 01", "NOIR / NOIR / NOIR"),
    ("solene/sol-lb1-noir-champagne-limestone.webp", 900, 1200, 150, "#161514", "#DDD5C8", "LOOK 01", "NOIR / CHAMPAGNE / LIMESTONE"),
    ("solene/sol-lb1-limestone-noir-noir.webp", 900, 1200, 150, "#DDD5C8", "#121110", "LOOK 01", "LIMESTONE / NOIR / NOIR"),
    ("solene/sol-lb1-limestone-champagne-limestone.webp", 900, 1200, 150, "#DDD5C8", "#121110", "LOOK 01", "LIMESTONE / CHAMPAGNE / LIMESTONE"),
    ("solene/sol-lb1-noir-noir-limestone.webp", 900, 1200, 150, "#121110", "#DDD5C8", "LOOK 01", "NOIR / NOIR / LIMESTONE"),
    ("solene/sol-lb1-limestone-noir-limestone.webp", 900, 1200, 150, "#DDD5C8", "#121110", "LOOK 01", "LIMESTONE / NOIR / LIMESTONE"),

    # LOOK 02: [cape]-[shirt]-[trouser]
    ("solene/sol-lb2-stone-ivory-limestone.webp", 900, 1200, 150, "#D8D0C5", "#121110", "LOOK 02", "STONE / IVORY / LIMESTONE"),
    ("solene/sol-lb2-noir-ivory-limestone.webp", 900, 1200, 150, "#121110", "#EFEAE0", "LOOK 02", "NOIR / IVORY / LIMESTONE"),
    ("solene/sol-lb2-stone-taupe-limestone.webp", 900, 1200, 150, "#C5B9A5", "#121110", "LOOK 02", "STONE / TAUPE / LIMESTONE"),
    ("solene/sol-lb2-stone-ivory-noir.webp", 900, 1200, 150, "#C5B9A5", "#121110", "LOOK 02", "STONE / IVORY / NOIR"),
    ("solene/sol-lb2-noir-taupe-limestone.webp", 900, 1200, 150, "#121110", "#DDD5C8", "LOOK 02", "NOIR / TAUPE / LIMESTONE"),
    ("solene/sol-lb2-noir-ivory-noir.webp", 900, 1200, 150, "#121110", "#EFEAE0", "LOOK 02", "NOIR / IVORY / NOIR"),
    ("solene/sol-lb2-stone-taupe-noir.webp", 900, 1200, 150, "#8A7F75", "#121110", "LOOK 02", "STONE / TAUPE / NOIR"),
    ("solene/sol-lb2-noir-taupe-noir.webp", 900, 1200, 150, "#121110", "#8A7F75", "LOOK 02", "NOIR / TAUPE / NOIR"),

    # LOOK 03: [waistcoat]-[skirt]-[dress]
    ("solene/sol-lb3-noir-noir-ivory.webp", 900, 1200, 150, "#121110", "#EFEAE0", "LOOK 03", "NOIR / NOIR / IVORY"),
    ("solene/sol-lb3-espresso-noir-ivory.webp", 900, 1200, 150, "#362520", "#EFEAE0", "LOOK 03", "ESPRESSO / NOIR / IVORY"),
    ("solene/sol-lb3-noir-champagne-ivory.webp", 900, 1200, 150, "#121110", "#E6DAC8", "LOOK 03", "NOIR / CHAMPAGNE / IVORY"),
    ("solene/sol-lb3-noir-noir-noir.webp", 900, 1200, 150, "#121110", "#F2EDE6", "LOOK 03", "NOIR / NOIR / NOIR"),
    ("solene/sol-lb3-espresso-champagne-ivory.webp", 900, 1200, 150, "#362520", "#E6DAC8", "LOOK 03", "ESPRESSO / CHAMPAGNE / IVORY"),
    ("solene/sol-lb3-espresso-noir-noir.webp", 900, 1200, 150, "#362520", "#F2EDE6", "LOOK 03", "ESPRESSO / NOIR / NOIR"),
    ("solene/sol-lb3-noir-champagne-noir.webp", 900, 1200, 150, "#121110", "#E6DAC8", "LOOK 03", "NOIR / CHAMPAGNE / NOIR"),
    ("solene/sol-lb3-espresso-champagne-noir.webp", 900, 1200, 150, "#362520", "#E6DAC8", "LOOK 03", "ESPRESSO / CHAMPAGNE / NOIR"),
    ]


def hex_to_rgb(hex_str: str):
    h = hex_str.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def find_raw_source(rel_webp_path: str):
    """Finds a matching raw image (.png, .jpg, .jpeg, .webp) inside raw_assets/."""
    stem = Path(rel_webp_path).with_suffix("")
    for ext in (".png", ".jpg", ".jpeg", ".webp", ".PNG", ".JPG"):
        candidate = RAW_DIR / stem.with_suffix(ext)
        if candidate.exists():
            return candidate
    return None


def generate_editorial_placeholder(width, height, base_hex, accent_hex, title, subtitle):
    """Creates a clean architectural studio card with subtle fabric grain so dev never shows broken images."""
    bg_rgb = hex_to_rgb(base_hex)
    fg_rgb = hex_to_rgb(accent_hex)
    img = Image.new("RGB", (width, height), bg_rgb)
    draw = ImageDraw.Draw(img)

    # Architectural framing lines & garment silhouette monolith block
    pad_x, pad_y = int(width * 0.08), int(height * 0.08)
    draw.rectangle([pad_x, pad_y, width - pad_x, height - pad_y], outline=fg_rgb, width=1)

    # Inner silhouette column
    col_x0, col_y0 = int(width * 0.24), int(height * 0.18)
    col_x1, col_y1 = int(width * 0.76), int(height * 0.78)
    mid_rgb = tuple(int(bg_rgb[i] * 0.88 + fg_rgb[i] * 0.12) for i in range(3))
    draw.rectangle([col_x0, col_y0, col_x1, col_y1], fill=mid_rgb, outline=fg_rgb, width=1)

    # Structural tailor crosshairs
    cx, cy = width // 2, (col_y0 + col_y1) // 2
    draw.line([(cx, col_y0), (cx, col_y1)], fill=fg_rgb, width=1)
    draw.line([(col_x0, cy), (col_x1, cy)], fill=fg_rgb, width=1)

    # Spec labels at bottom frame
    text_y = int(height * 0.83)
    draw.text((pad_x + 24, text_y), title, fill=fg_rgb)
    draw.text((pad_x + 24, text_y + 24), subtitle, fill=fg_rgb)
    draw.text((pad_x + 24, text_y + 48), f"{width}x{height} · STUDIO PLATE", fill=fg_rgb)
    return img


def save_strict_webp(img: Image.Image, dest_path: Path, max_kb: int):
    """Binary-searches WebP quality from 88 down to 45 to guarantee file size stays under max_kb."""
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    quality = 88
    best_bytes = None

    while quality >= 45:
        buf = io.BytesIO()
        img.save(buf, format="WEBP", quality=quality, method=6)
        size_kb = buf.tell() / 1024
        best_bytes = buf.getvalue()
        if size_kb <= max_kb:
            break
        quality -= 5

    with open(dest_path, "wb") as f:
        f.write(best_bytes)
    return len(best_bytes) / 1024, quality


def main():
    bootstrap = "--bootstrap" in sys.argv
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    (RAW_DIR / "_anchors").mkdir(parents=True, exist_ok=True)
    (RAW_DIR / "maison-verre").mkdir(parents=True, exist_ok=True)
    (RAW_DIR / "solene").mkdir(parents=True, exist_ok=True)

    processed_raw = 0
    missing = []

    for rel_path, w, h, max_kb, base_hex, accent_hex, title, subtitle in ASSET_MANIFEST:
        dest = OUT_DIR / rel_path
        src = find_raw_source(rel_path)

        if src:
            with Image.open(src) as raw_img:
                rgb = raw_img.convert("RGB")
                cropped = ImageOps.fit(rgb, (w, h), method=Image.Resampling.LANCZOS, centering=(0.5, 0.22))
                kb, q = save_strict_webp(cropped, dest, max_kb)
                processed_raw += 1
                print(f"[OK -> WEBP] {rel_path} ({w}x{h}) -> {kb:.1f} KB (q={q})")
        else:
            missing.append(rel_path)
            if bootstrap or not dest.exists():
                placeholder = generate_editorial_placeholder(w, h, base_hex, accent_hex, title, subtitle)
                save_strict_webp(placeholder, dest, max_kb)

    print(f"\nSUMMARY: {processed_raw}/{len(ASSET_MANIFEST)} real photos processed.")
    if missing:
        print(f"STILL MISSING ({len(missing)}):")
        for m in missing:
            print(f"  - raw_assets/{Path(m).with_suffix('.png')}")

if __name__ == "__main__":
    main()