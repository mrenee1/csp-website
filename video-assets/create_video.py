"""
Social media video creator for Creative Solutions Partners website.
Creates a 1080x1080 slideshow video highlighting navigation and updates.
"""
import os
import sys
import glob
import subprocess
import imageio
import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path

SCREENSHOTS_DIR = Path(__file__).parent / "screenshots"
OUTPUT_DIR = Path(__file__).parent
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

WIDTH, HEIGHT = 1080, 1080
FPS = 30
SLIDE_DURATION = 3.5   # seconds per slide
TRANSITION_FRAMES = 20  # frames for fade transition

# Brand colors
BRAND_PURPLE = (93, 46, 142)
BRAND_GOLD = (197, 160, 89)
DARK_BG = (15, 15, 25)
WHITE = (255, 255, 255)
LIGHT_GRAY = (200, 200, 210)

def load_font(size, bold=False):
    """Try to load a nice font, fall back to default."""
    font_paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        "/usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf" if bold else "/usr/share/fonts/truetype/ubuntu/Ubuntu-R.ttf",
    ]
    for fp in font_paths:
        if os.path.exists(fp):
            try:
                return ImageFont.truetype(fp, size)
            except:
                pass
    return ImageFont.load_default()

def add_overlay_text(img_array, title, subtitle=None):
    """Add branded text overlay to an image frame."""
    img = Image.fromarray(img_array).convert("RGBA")

    # Dark gradient overlay at bottom
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Gradient from transparent to dark at bottom
    for i in range(240):
        alpha = int(200 * (i / 240) ** 1.5)
        draw.rectangle([(0, HEIGHT - 240 + i), (WIDTH, HEIGHT - 240 + i + 1)],
                       fill=(10, 5, 20, alpha))

    img = Image.alpha_composite(img, overlay).convert("RGB")
    draw = ImageDraw.Draw(img)

    # Gold accent bar
    draw.rectangle([(60, HEIGHT - 100), (60 + len(title) * 14 + 20, HEIGHT - 94)],
                   fill=BRAND_GOLD)

    # Title text
    font_title = load_font(38, bold=True)
    draw.text((60, HEIGHT - 90), title, font=font_title, fill=WHITE)

    # Subtitle
    if subtitle:
        font_sub = load_font(22)
        draw.text((60, HEIGHT - 48), subtitle, font=font_sub, fill=LIGHT_GRAY)

    # Small logo text top-left
    font_logo = load_font(18, bold=True)
    draw.text((30, 30), "CSP", font=font_logo, fill=BRAND_GOLD)
    font_logo_full = load_font(14)
    draw.text((62, 34), "Creative Solutions Partners", font=font_logo_full, fill=WHITE)

    return np.array(img)

def create_title_card(title, subtitle=None, bg_color=DARK_BG):
    """Create a full-screen title card."""
    img = Image.new("RGB", (WIDTH, HEIGHT), bg_color)
    draw = ImageDraw.Draw(img)

    # Background gradient effect using rectangles
    for i in range(HEIGHT):
        r = int(bg_color[0] + (BRAND_PURPLE[0] - bg_color[0]) * (i / HEIGHT) * 0.3)
        g = int(bg_color[1] + (BRAND_PURPLE[1] - bg_color[1]) * (i / HEIGHT) * 0.3)
        b = int(bg_color[2] + (BRAND_PURPLE[2] - bg_color[2]) * (i / HEIGHT) * 0.3)
        draw.rectangle([(0, i), (WIDTH, i+1)], fill=(r, g, b))

    # Decorative circles
    draw.ellipse([(-100, -100), (300, 300)], fill=(BRAND_PURPLE[0]+20, BRAND_PURPLE[1]+10, BRAND_PURPLE[2]+30))
    draw.ellipse([(850, 800), (1200, 1200)], fill=(BRAND_GOLD[0]//3, BRAND_GOLD[1]//3, BRAND_GOLD[2]//3))

    # CSP logo area
    font_csp = load_font(72, bold=True)
    draw.text((70, 80), "CSP", font=font_csp, fill=BRAND_GOLD)

    font_full = load_font(22)
    draw.text((70, 165), "Creative Solutions Partners", font=font_full, fill=WHITE)

    # Divider line
    draw.rectangle([(70, 200), (WIDTH - 70, 202)], fill=BRAND_GOLD)

    # Main title
    font_title = load_font(52, bold=True)
    # Word wrap
    words = title.split()
    lines = []
    line = ""
    for word in words:
        test = (line + " " + word).strip()
        bbox = font_title.getbbox(test)
        if bbox[2] - bbox[0] > WIDTH - 140:
            if line:
                lines.append(line)
            line = word
        else:
            line = test
    if line:
        lines.append(line)

    y = 280
    for line in lines:
        draw.text((70, y), line, font=font_title, fill=WHITE)
        y += 65

    # Subtitle
    if subtitle:
        font_sub = load_font(28)
        y += 20
        draw.text((70, y), subtitle, font=font_sub, fill=BRAND_GOLD)

    # Bottom branding
    font_url = load_font(20)
    draw.text((70, HEIGHT - 60), "creativesolutionspartners.com", font=font_url, fill=LIGHT_GRAY)

    return np.array(img)

def load_screenshot(filepath):
    """Load a screenshot and ensure it's 1080x1080."""
    img = Image.open(filepath).convert("RGB")
    if img.size != (WIDTH, HEIGHT):
        img = img.resize((WIDTH, HEIGHT), Image.LANCZOS)
    return np.array(img)

def apply_ken_burns(frame_array, frame_idx, total_frames, zoom_start=1.0, zoom_end=1.08):
    """Apply subtle Ken Burns (slow zoom) effect."""
    progress = frame_idx / max(total_frames - 1, 1)
    zoom = zoom_start + (zoom_end - zoom_start) * progress

    img = Image.fromarray(frame_array)
    new_w = int(WIDTH * zoom)
    new_h = int(HEIGHT * zoom)

    img_zoomed = img.resize((new_w, new_h), Image.BILINEAR)

    # Crop center
    left = (new_w - WIDTH) // 2
    top = (new_h - HEIGHT) // 2
    img_cropped = img_zoomed.crop((left, top, left + WIDTH, top + HEIGHT))

    return np.array(img_cropped)

def make_fade(frame_a, frame_b, t):
    """Blend two frames for cross-fade transition."""
    return (frame_a * (1 - t) + frame_b * t).astype(np.uint8)

def create_video():
    print("🎬 Creating social media video for Creative Solutions Partners")
    print(f"   Using ffmpeg: {FFMPEG}")

    # Define slides: (screenshot_pattern, title, subtitle)
    slide_defs = [
        # Intro title card
        ("TITLE", "Welcome to Creative Solutions Partners", "Health · Wealth · Technology"),

        # Home
        ("000_home_hero.png", "Your Business. Simplified.", "Comprehensive solutions for entrepreneurs"),
        ("001_home_services_intro.png", "Built for Modern Business", "Solutions that grow with you"),
        ("002_home_services_cards.png", "Three Pillars of Success", "Health · Wealth · Technology"),

        # Navigation title
        ("TITLE_NAV", "Explore Our Solutions", "Navigate your path to success"),

        # Solutions overview
        ("004_solutions_overview.png", "Our Platform", "Everything you need in one place"),
        ("005_solutions_cards.png", "Choose Your Solution", "Tailored for your goals"),

        # Health
        ("TITLE_HEALTH", "Creative Care", "Premium Health Solutions"),
        ("017_creative_care_hero.png", "Creative Care", "Your health, our priority"),
        ("018_creative_care_detail.png", "Comprehensive Coverage", "Plans designed for entrepreneurs"),

        # Wealth
        ("TITLE_WEALTH", "Creative Compensation", "Building Wealth Together"),
        ("025_wealthwave_hero.png", "WealthWave", "Ride the wave to financial freedom"),
        ("026_wealthwave_detail.png", "Smart Wealth Strategies", "Grow, protect, and transfer wealth"),

        # Technology
        ("TITLE_TECH", "Creative Technology", "Powering Your Business"),
        ("019_clarity_hero.png", "Clarity Commissions", "Track every dollar you earn"),
        ("020_clarity_detail.png", "Commission Management", "Automated & accurate"),
        ("021_impact_payments_hero.png", "Impact Payments", "Fast, secure payment processing"),
        ("023_creative_web_hero.png", "Creative Web", "Your digital presence, elevated"),

        # About
        ("TITLE_ABOUT", "About CSP", "Partners in Your Success"),
        ("015_about_hero.png", "About Creative Solutions Partners", "A team dedicated to your growth"),
        ("016_about_detail.png", "Our Partners", "Experienced professionals on your side"),

        # Blog
        ("013_blog_hero.png", "CSP Insights", "Stay informed, stay ahead"),

        # CTA
        ("012_footer_cta.png", "Ready to Get Started?", "Your solutions are waiting"),
        ("TITLE_CTA", "creativesolutionspartners.com", "Start your journey today"),
    ]

    print(f"\n📊 Building {len(slide_defs)} slides...")

    # Set up video writer
    output_path = str(OUTPUT_DIR / "csp_social_video.mp4")
    writer = imageio.get_writer(
        output_path,
        fps=FPS,
        codec="libx264",
        quality=8,
        ffmpeg_log_level="quiet",
        macro_block_size=1,
        bitrate="4M",
    )

    slide_frames = int(SLIDE_DURATION * FPS)
    total_frames_count = 0

    prev_frame = None

    for i, slide_def in enumerate(slide_defs):
        screenshot_name = slide_def[0]
        title = slide_def[1]
        subtitle = slide_def[2] if len(slide_def) > 2 else None

        print(f"  [{i+1}/{len(slide_defs)}] {title[:50]}...")

        # Load or create base frame
        if screenshot_name.startswith("TITLE"):
            base_frame = create_title_card(title, subtitle)
            use_ken_burns = False
        else:
            screenshot_path = SCREENSHOTS_DIR / screenshot_name
            if not screenshot_path.exists():
                print(f"    ⚠ Screenshot not found: {screenshot_name}, using title card")
                base_frame = create_title_card(title, subtitle)
                use_ken_burns = False
            else:
                base_frame = load_screenshot(screenshot_path)
                base_frame = add_overlay_text(base_frame, title, subtitle)
                use_ken_burns = True

        # Generate frames for this slide
        frames_for_slide = []
        for f in range(slide_frames):
            if use_ken_burns:
                frame = apply_ken_burns(base_frame, f, slide_frames)
            else:
                frame = base_frame.copy()
            frames_for_slide.append(frame)

        # Write frames with transition from previous slide
        for f_idx, frame in enumerate(frames_for_slide):
            if prev_frame is not None and f_idx < TRANSITION_FRAMES:
                # Cross-fade from previous slide
                t = f_idx / TRANSITION_FRAMES
                frame = make_fade(prev_frame, frame, t)
            writer.append_data(frame)
            total_frames_count += 1

        prev_frame = frames_for_slide[-1]

    writer.close()

    size_mb = os.path.getsize(output_path) / (1024 * 1024)
    duration_s = total_frames_count / FPS
    print(f"\n✅ Video created successfully!")
    print(f"   Output: {output_path}")
    print(f"   Duration: {duration_s:.1f}s ({duration_s/60:.1f}m)")
    print(f"   Frames: {total_frames_count}")
    print(f"   Size: {size_mb:.1f} MB")
    print(f"   Resolution: {WIDTH}x{HEIGHT} @ {FPS}fps")

if __name__ == "__main__":
    create_video()
