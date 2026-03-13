"""
Creates a 9:16 vertical video (1080x1920) for Instagram Reels/TikTok.
Shorter, faster-paced version.
"""
import os
import imageio
import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

SCREENSHOTS_DIR = Path(__file__).parent / "screenshots"
OUTPUT_DIR = Path(__file__).parent
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

# 9:16 aspect ratio for Reels/TikTok
WIDTH, HEIGHT = 1080, 1920
FPS = 30
SLIDE_DURATION = 2.5
TRANSITION_FRAMES = 15

BRAND_PURPLE = (93, 46, 142)
BRAND_GOLD = (197, 160, 89)
DARK_BG = (10, 8, 20)
WHITE = (255, 255, 255)
LIGHT_GRAY = (200, 200, 210)

def load_font(size, bold=False):
    paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for fp in paths:
        if os.path.exists(fp):
            try:
                return ImageFont.truetype(fp, size)
            except:
                pass
    return ImageFont.load_default()

def load_screenshot_vertical(filepath):
    """Load screenshot and fit to 9:16 frame with branded background."""
    img = Image.open(filepath).convert("RGB")
    # Place 1080x1080 screenshot in center of 1080x1920 with branded top/bottom
    frame = Image.new("RGB", (WIDTH, HEIGHT), DARK_BG)

    # Add gradient background
    draw = ImageDraw.Draw(frame)
    for i in range(HEIGHT):
        t = i / HEIGHT
        r = int(DARK_BG[0] * (1-t) + BRAND_PURPLE[0] * t * 0.4)
        g = int(DARK_BG[1] * (1-t) + BRAND_PURPLE[1] * t * 0.4)
        b = int(DARK_BG[2] * (1-t) + BRAND_PURPLE[2] * t * 0.4)
        draw.rectangle([(0, i), (WIDTH, i+1)], fill=(r, g, b))

    # Place screenshot centered vertically
    img_resized = img.resize((WIDTH, WIDTH), Image.LANCZOS)  # 1080x1080
    y_offset = (HEIGHT - WIDTH) // 2
    frame.paste(img_resized, (0, y_offset))

    return np.array(frame)

def add_text_overlay_vertical(frame_array, title, subtitle=None, section=None):
    """Add text overlays for 9:16 format."""
    img = Image.fromarray(frame_array).convert("RGBA")
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Top banner
    draw.rectangle([(0, 0), (WIDTH, 200)], fill=(10, 8, 20, 230))
    # Bottom banner
    draw.rectangle([(0, HEIGHT - 220), (WIDTH, HEIGHT)], fill=(10, 8, 20, 220))

    img = Image.alpha_composite(img, overlay).convert("RGB")
    draw = ImageDraw.Draw(img)

    # Top: CSP branding
    font_csp = load_font(54, bold=True)
    draw.text((40, 30), "CSP", font=font_csp, fill=BRAND_GOLD)
    font_full = load_font(20)
    draw.text((40, 100), "Creative Solutions Partners", font=font_full, fill=WHITE)

    # Gold accent line
    draw.rectangle([(40, 140), (WIDTH - 40, 143)], fill=BRAND_GOLD)

    # Bottom: title
    if section:
        font_section = load_font(22)
        draw.text((40, HEIGHT - 200), section.upper(), font=font_section, fill=BRAND_GOLD)

    font_title = load_font(44, bold=True)
    draw.text((40, HEIGHT - 170), title, font=font_title, fill=WHITE)

    if subtitle:
        font_sub = load_font(26)
        draw.text((40, HEIGHT - 110), subtitle, font=font_sub, fill=LIGHT_GRAY)

    # URL bottom
    font_url = load_font(22)
    draw.text((40, HEIGHT - 60), "creativesolutionspartners.com", font=font_url, fill=BRAND_GOLD)

    return np.array(img)

def create_title_card_vertical(title, subtitle=None):
    """Full-screen title card in 9:16."""
    img = Image.new("RGB", (WIDTH, HEIGHT), DARK_BG)
    draw = ImageDraw.Draw(img)

    # Background gradient
    for i in range(HEIGHT):
        t = i / HEIGHT
        r = int(DARK_BG[0] + (BRAND_PURPLE[0] - DARK_BG[0]) * t * 0.5)
        g = int(DARK_BG[1] + (BRAND_PURPLE[1] - DARK_BG[1]) * t * 0.5)
        b = int(DARK_BG[2] + (BRAND_PURPLE[2] - DARK_BG[2]) * t * 0.5)
        draw.rectangle([(0, i), (WIDTH, i+1)], fill=(r, g, b))

    # Decorative elements
    draw.ellipse([(-80, 100), (280, 460)], fill=(BRAND_PURPLE[0]+30, BRAND_PURPLE[1]+15, BRAND_PURPLE[2]+40))
    draw.ellipse([(800, 1500), (1200, 1900)], fill=(BRAND_GOLD[0]//4, BRAND_GOLD[1]//4, BRAND_GOLD[2]//4))

    # CSP Logo
    font_csp = load_font(120, bold=True)
    draw.text((80, 120), "CSP", font=font_csp, fill=BRAND_GOLD)

    font_full = load_font(30)
    draw.text((80, 270), "Creative Solutions Partners", font=font_full, fill=WHITE)

    # Divider
    draw.rectangle([(80, 330), (WIDTH - 80, 334)], fill=BRAND_GOLD)

    # Main title
    font_title = load_font(68, bold=True)
    words = title.split()
    lines, line = [], ""
    for word in words:
        test = (line + " " + word).strip()
        bbox = font_title.getbbox(test)
        if bbox[2] - bbox[0] > WIDTH - 160:
            if line: lines.append(line)
            line = word
        else:
            line = test
    if line: lines.append(line)

    y = 400
    for ln in lines:
        draw.text((80, y), ln, font=font_title, fill=WHITE)
        y += 90

    if subtitle:
        y += 30
        font_sub = load_font(38)
        draw.text((80, y), subtitle, font=font_sub, fill=BRAND_GOLD)

    # URL
    font_url = load_font(26)
    draw.text((80, HEIGHT - 80), "creativesolutionspartners.com", font=font_url, fill=LIGHT_GRAY)

    return np.array(img)

def make_fade(a, b, t):
    return (a * (1-t) + b * t).astype(np.uint8)

def create_reels_video():
    print("🎬 Creating 9:16 Reels/TikTok video for Creative Solutions Partners")

    slides = [
        # Format: (screenshot or TITLE, title, subtitle, section_label)
        ("TITLE", "Discover Creative Solutions Partners", "Health · Wealth · Technology", None),
        ("000_home_hero.png", "Grow. Expand. Simplify.", "Business solutions for entrepreneurs", "Home"),
        ("004_solutions_overview.png", "Our Platform", "All your tools in one place", "Solutions"),
        ("TITLE_HEALTH", "Creative Care", "Your Health Solution", None),
        ("017_creative_care_hero.png", "Creative Care", "Premium health plans", "Health"),
        ("TITLE_WEALTH", "WealthWave", "Your Wealth Solution", None),
        ("025_wealthwave_hero.png", "WealthWave", "Financial freedom starts here", "Wealth"),
        ("TITLE_TECH", "Creative Technology", "Your Tech Solutions", None),
        ("019_clarity_hero.png", "Clarity Commissions", "Automated tracking", "Technology"),
        ("021_impact_payments_hero.png", "Impact Payments", "Secure payment processing", "Technology"),
        ("023_creative_web_hero.png", "Creative Web", "Your digital presence", "Technology"),
        ("015_about_hero.png", "About CSP", "Partners in your success", "About"),
        ("013_blog_hero.png", "CSP Insights", "Stay ahead with expert knowledge", "Blog"),
        ("TITLE_CTA", "Ready to Get Started?", "Visit creativesolutionspartners.com", None),
    ]

    output_path = str(OUTPUT_DIR / "csp_reels_video.mp4")
    writer = imageio.get_writer(
        output_path,
        fps=FPS,
        codec="libx264",
        quality=8,
        ffmpeg_log_level="quiet",
        macro_block_size=1,
        bitrate="6M",
    )

    slide_frames = int(SLIDE_DURATION * FPS)
    prev_frame = None
    total_frames = 0

    for i, (name, title, subtitle, section) in enumerate(slides):
        print(f"  [{i+1}/{len(slides)}] {title}...")

        if name.startswith("TITLE"):
            base = create_title_card_vertical(title, subtitle)
        else:
            path = SCREENSHOTS_DIR / name
            if not path.exists():
                print(f"    ⚠ Not found: {name}")
                base = create_title_card_vertical(title, subtitle)
            else:
                base = load_screenshot_vertical(path)
                base = add_text_overlay_vertical(base, title, subtitle, section)

        frames = []
        for f in range(slide_frames):
            frames.append(base.copy())

        for f_idx, frame in enumerate(frames):
            if prev_frame is not None and f_idx < TRANSITION_FRAMES:
                t = f_idx / TRANSITION_FRAMES
                frame = make_fade(prev_frame, frame, t)
            writer.append_data(frame)
            total_frames += 1

        prev_frame = frames[-1]

    writer.close()

    size_mb = os.path.getsize(output_path) / (1024 * 1024)
    dur = total_frames / FPS
    print(f"\n✅ Reels video created!")
    print(f"   Output: {output_path}")
    print(f"   Duration: {dur:.1f}s")
    print(f"   Size: {size_mb:.1f} MB")
    print(f"   Resolution: {WIDTH}x{HEIGHT} @ {FPS}fps (9:16)")

if __name__ == "__main__":
    create_reels_video()
