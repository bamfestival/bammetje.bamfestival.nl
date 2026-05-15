#!/usr/bin/env python3
import json
import math
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
LEDWALL_DIR = ROOT / "ledwall"
OUTPUT_DIR = LEDWALL_DIR / "artists"
BACKGROUND_PATH = LEDWALL_DIR / "background.png"
SITE_JSON_PATH = ROOT / "nuxt-bammetje" / "content" / "site.json"
ARTIST_DIR = ROOT / "nuxt-bammetje" / "content" / "artists"
PUBLIC_DIR = ROOT / "nuxt-bammetje" / "public"
LOGO_PATH = ROOT / "content" / "bammetje-logo" / "Bammetje-logo wit.png"

WIDTH = 1920
HEIGHT = 1080

FONT_DISPLAY = "/System/Library/Fonts/Supplemental/Impact.ttf"
FONT_HEAVY = "/System/Library/Fonts/Supplemental/Arial Black.ttf"
FONT_NARROW = "/System/Library/Fonts/Supplemental/Arial Narrow.ttf"
FONT_BODY = "/System/Library/Fonts/Supplemental/Arial.ttf"

WHITE = (253, 250, 251, 255)
YELLOW = (248, 190, 5, 255)
ORANGE = (226, 100, 38, 255)
RED = (198, 33, 68, 255)
BURGUNDY = (83, 10, 29, 255)
BLACK = (18, 2, 6, 255)


def font(path, size):
    return ImageFont.truetype(path, size)


def text_bbox(draw, text, fnt, stroke_width=0):
    return draw.textbbox((0, 0), text, font=fnt, stroke_width=stroke_width)


def text_size(draw, text, fnt, stroke_width=0):
    left, top, right, bottom = text_bbox(draw, text, fnt, stroke_width)
    return right - left, bottom - top


def slugify(value):
    value = value.lower().replace("ø", "o").replace("é", "e").replace("è", "e")
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def rounded_mask(size, radius):
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    return mask


def cover_crop(image, size, focus_x=0.5, focus_y=0.5):
    target_w, target_h = size
    src_w, src_h = image.size
    scale = max(target_w / src_w, target_h / src_h)
    resized = image.resize((math.ceil(src_w * scale), math.ceil(src_h * scale)), Image.Resampling.LANCZOS)
    crop_w, crop_h = resized.size
    left = max(0, min(crop_w - target_w, int((crop_w - target_w) * focus_x)))
    top = max(0, min(crop_h - target_h, int((crop_h - target_h) * focus_y)))
    return resized.crop((left, top, left + target_w, top + target_h))


def draw_gradient_bar(base):
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    pixels = overlay.load()
    colors = [
        (83, 10, 29),
        (146, 18, 52),
        (198, 33, 68),
        (226, 100, 38),
        (248, 190, 5),
    ]
    for x in range(WIDTH):
        t = x / (WIDTH - 1)
        segment = min(len(colors) - 2, int(t * (len(colors) - 1)))
        local_t = (t * (len(colors) - 1)) - segment
        c1 = colors[segment]
        c2 = colors[segment + 1]
        color = tuple(int(c1[i] + (c2[i] - c1[i]) * local_t) for i in range(3))
        for y in range(930, HEIGHT):
            alpha = int(235 * ((y - 930) / 150))
            pixels[x, y] = (*color, alpha)
    base.alpha_composite(overlay)


def wrap_words(draw, text, fnt, max_width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = word if not current else f"{current} {word}"
        if text_size(draw, candidate, fnt, stroke_width=3)[0] <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def fit_title(draw, title, max_width, max_height):
    # Long artist names need predictable line breaks on a LED wall, so we fit by both width and height.
    for size in range(178, 72, -4):
        fnt = font(FONT_DISPLAY, size)
        lines = wrap_words(draw, title.upper(), fnt, max_width)
        line_gap = int(size * 0.08)
        total_h = sum(text_size(draw, line, fnt, stroke_width=3)[1] for line in lines)
        total_h += line_gap * max(0, len(lines) - 1)
        if len(lines) <= 3 and total_h <= max_height:
            return fnt, lines, line_gap
    fnt = font(FONT_DISPLAY, 72)
    return fnt, wrap_words(draw, title.upper(), fnt, max_width), 6


def draw_title(draw, xy, lines, fnt, line_gap):
    x, y = xy
    for index, line in enumerate(lines):
        fill = YELLOW if index == 0 else WHITE
        draw.text((x + 8, y + 8), line, font=fnt, fill=(18, 2, 6, 130), stroke_width=4, stroke_fill=(18, 2, 6, 180))
        draw.text((x, y), line, font=fnt, fill=fill, stroke_width=3, stroke_fill=BURGUNDY)
        y += text_size(draw, line, fnt, stroke_width=3)[1] + line_gap
    return y


def draw_pill(draw, xy, text, fill, text_fill=WHITE):
    x, y = xy
    fnt = font(FONT_HEAVY, 54)
    padding_x = 34
    box_height = 86
    tw, th = text_size(draw, text, fnt)
    box = (x, y, x + tw + padding_x * 2, y + box_height)
    draw.rounded_rectangle((box[0] + 8, box[1] + 8, box[2] + 8, box[3] + 8), radius=28, fill=(18, 2, 6, 120))
    draw.rounded_rectangle(box, radius=28, fill=fill)
    text_left, text_top, text_right, text_bottom = text_bbox(draw, text, fnt)
    text_y = y + ((box_height - (text_bottom - text_top)) / 2) - text_top
    draw.text((x + padding_x, text_y), text, font=fnt, fill=text_fill)
    return box


def draw_photo(base, artist):
    image_path = PUBLIC_DIR / artist["image_square"].lstrip("/")
    photo = Image.open(image_path).convert("RGB")
    photo_size = (720, 720)
    photo = cover_crop(photo, photo_size).convert("RGBA")
    photo = ImageEnhance.Contrast(photo).enhance(1.08)
    photo = ImageEnhance.Color(photo).enhance(1.12)

    x, y = 1080, 185
    shadow = Image.new("RGBA", (photo_size[0] + 80, photo_size[1] + 80), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle((30, 30, photo_size[0] + 50, photo_size[1] + 50), radius=50, fill=(18, 2, 6, 210))
    shadow = shadow.filter(ImageFilter.GaussianBlur(22))
    base.alpha_composite(shadow, (x - 40, y - 30))

    frame = Image.new("RGBA", (photo_size[0] + 46, photo_size[1] + 46), (0, 0, 0, 0))
    frame_draw = ImageDraw.Draw(frame)
    frame_draw.rounded_rectangle((0, 0, photo_size[0] + 46, photo_size[1] + 46), radius=62, fill=YELLOW)
    frame_draw.rounded_rectangle((12, 12, photo_size[0] + 34, photo_size[1] + 34), radius=54, fill=ORANGE)
    frame_draw.rounded_rectangle((23, 23, photo_size[0] + 23, photo_size[1] + 23), radius=46, fill=WHITE)
    base.alpha_composite(frame, (x - 23, y - 23))

    mask = rounded_mask(photo_size, 38)
    base.paste(photo, (x, y), mask)


def load_artists():
    with open(SITE_JSON_PATH, encoding="utf-8") as handle:
        site = json.load(handle)
    artists = []
    for path in sorted(ARTIST_DIR.glob("*.json")):
        with open(path, encoding="utf-8") as handle:
            artist = json.load(handle)
        if artist.get("published") and artist.get("performances"):
            artist["_slug"] = path.stem
            artists.append(artist)
    artists.sort(key=lambda item: item["performances"][0]["starttime"])
    return site, artists


def create_slide(site, artist):
    base = Image.open(BACKGROUND_PATH).convert("RGBA")
    base = base.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    draw_gradient_bar(base)

    dark_overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    dark_draw = ImageDraw.Draw(dark_overlay)
    dark_draw.rectangle((0, 0, 1120, HEIGHT), fill=(18, 2, 6, 42))
    base.alpha_composite(dark_overlay)

    draw_photo(base, artist)
    draw = ImageDraw.Draw(base)

    logo = Image.open(LOGO_PATH).convert("RGBA")
    logo_w = 300
    logo_h = int(logo.height * (logo_w / logo.width))
    logo = logo.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
    base.alpha_composite(logo, (92, 74))

    title_font, title_lines, gap = fit_title(draw, artist["title"], 850, 330)
    title_bottom = draw_title(draw, (98, 285), title_lines, title_font, gap)

    performance = artist["performances"][0]
    stage_name = site["stages"][performance["stage"]]["name"]
    time_text = f'{performance["starttime"]} - {performance["endtime"]}'

    meta_y = min(max(title_bottom + 36, 675), 700)
    draw_pill(draw, (102, meta_y), time_text, RED)

    stage_font = font(FONT_HEAVY, 48)
    stage_label_font = font(FONT_NARROW, 38)
    draw.text((106, meta_y + 135), "STAGE", font=stage_label_font, fill=(253, 250, 251, 210))
    draw.text((106, meta_y + 178), stage_name.upper(), font=stage_font, fill=WHITE, stroke_width=2, stroke_fill=BURGUNDY)

    output_path = OUTPUT_DIR / f'{performance["starttime"].replace(":", "")}-{slugify(artist["title"])}.png'
    base.convert("RGB").save(output_path, "PNG", optimize=True)
    return output_path


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    site, artists = load_artists()
    for artist in artists:
        path = create_slide(site, artist)
        print(path.relative_to(ROOT))


if __name__ == "__main__":
    main()
