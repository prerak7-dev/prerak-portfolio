from __future__ import annotations

import argparse
import math
import shutil
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
CINEMATIC = ROOT / "public" / "cinematic"
SOURCE = ROOT / "scripts" / "cinematic-source"
WATERCOLOR_SOURCE = SOURCE / "watercolor"
FRAME_COUNT = 24
OUTPUT_SIZE = (2560, 1440)
ARTIFACT_MAX_EDGE = 2560
ARTIFACT_CANVASES = {
    "pipeline": (2560, 1600),
    "plugin": (1707, 2560),
    "telemetry": (2560, 1707),
}
BACKGROUND_QUALITY = 90
ARTIFACT_QUALITY = 95
GATEWAY_FRAME_DIR = "cosmic-frames-v9"
GATEWAY_GROWTH_OVERLAY = "growth-overlay-watercolor-v2.png"
GATEWAY_NAME_OCCLUDER = "name-occluder-v2.webp"
GATEWAY_VEGETATION_OUTPUT = "vegetation-watercolor-v2.webp"
CANONICAL_GATEWAY_SOURCE = WATERCOLOR_SOURCE / "default" / "gateway" / "cosmic-closed-v2.png"
CANONICAL_GATEWAY_OPEN_SOURCE = WATERCOLOR_SOURCE / "default" / "gateway" / "open.png"
PORTAL_LIGHTS = {
    "default": (224, 183, 111),
    "spring": (182, 215, 173),
    "fall": (230, 114, 53),
    "winter": (214, 230, 242),
}
GATEWAY_GRADES = {
    "spring": {
        "black": (4, 20, 19),
        "mid": (72, 102, 84),
        "white": (219, 230, 196),
        "color": 1.08,
        "brightness": 1.03,
    },
    "fall": {
        "black": (18, 5, 6),
        "mid": (126, 55, 31),
        "white": (239, 174, 103),
        "color": 1.12,
        "brightness": 0.98,
    },
    "winter": {
        "black": (6, 17, 31),
        "mid": (91, 117, 137),
        "white": (229, 239, 243),
        "color": 0.92,
        "brightness": 1.06,
    },
}
GATEWAY_GROWTH_GRADES = {
    "default": {
        "black": (20, 20, 18),
        "mid": (98, 88, 67),
        "white": (205, 184, 131),
    },
    "spring": {
        "black": (8, 31, 25),
        "mid": (74, 108, 79),
        "white": (198, 218, 174),
    },
    "fall": {
        "black": (47, 17, 11),
        "mid": (133, 66, 33),
        "white": (218, 151, 79),
    },
    "winter": {
        "black": (11, 25, 42),
        "mid": (89, 119, 145),
        "white": (211, 228, 239),
    },
}


THEMES = {
    "default": {
        "gateway_closed": CANONICAL_GATEWAY_SOURCE,
        "gateway_open": CANONICAL_GATEWAY_OPEN_SOURCE,
        "gateway_authored": False,
        "gateway_atmosphere": CINEMATIC / "default" / "systems.webp",
        "gateway_growth": WATERCOLOR_SOURCE / "default" / "gateway" / GATEWAY_GROWTH_OVERLAY,
        "gateway_vegetation": None,
        "systems": WATERCOLOR_SOURCE / "default" / "systems.png",
        "chronology": WATERCOLOR_SOURCE / "default" / "chronology.png",
        "field": WATERCOLOR_SOURCE / "default" / "field.png",
        "surface": WATERCOLOR_SOURCE / "default" / "surface.png",
    },
    "spring": {
        "gateway_closed": WATERCOLOR_SOURCE / "spring" / "gateway" / "cosmic-closed-v9-seasonal.png",
        "gateway_open": WATERCOLOR_SOURCE / "spring" / "gateway" / "cosmic-open-v9-seasonal.png",
        "gateway_authored": True,
        "gateway_atmosphere": CINEMATIC / "spring" / "systems.webp",
        "gateway_growth": None,
        "gateway_vegetation": WATERCOLOR_SOURCE / "spring" / "gateway" / "vegetation-watercolor-v9-matted.png",
        "systems": WATERCOLOR_SOURCE / "spring" / "systems.png",
        "chronology": WATERCOLOR_SOURCE / "spring" / "chronology.png",
        "field": WATERCOLOR_SOURCE / "spring" / "field.png",
        "surface": WATERCOLOR_SOURCE / "spring" / "surface.png",
    },
    "fall": {
        "gateway_closed": WATERCOLOR_SOURCE / "fall" / "gateway" / "cosmic-closed-v9-seasonal.png",
        "gateway_open": WATERCOLOR_SOURCE / "fall" / "gateway" / "cosmic-open-v9-seasonal.png",
        "gateway_authored": True,
        "gateway_atmosphere": CINEMATIC / "fall" / "systems.webp",
        "gateway_growth": None,
        "gateway_vegetation": WATERCOLOR_SOURCE / "fall" / "gateway" / "vegetation-watercolor-v9-matted.png",
        "systems": WATERCOLOR_SOURCE / "fall" / "systems.png",
        "chronology": WATERCOLOR_SOURCE / "fall" / "chronology.png",
        "field": WATERCOLOR_SOURCE / "fall" / "field.png",
        "surface": WATERCOLOR_SOURCE / "fall" / "surface.png",
    },
    "winter": {
        "gateway_closed": WATERCOLOR_SOURCE / "winter" / "gateway" / "cosmic-closed-v9-seasonal.png",
        "gateway_open": WATERCOLOR_SOURCE / "winter" / "gateway" / "cosmic-open-v9-seasonal.png",
        "gateway_authored": True,
        "gateway_atmosphere": CINEMATIC / "winter" / "systems.webp",
        "gateway_growth": None,
        "gateway_vegetation": WATERCOLOR_SOURCE / "winter" / "gateway" / "vegetation-watercolor-v9-matted.png",
        "systems": WATERCOLOR_SOURCE / "winter" / "systems.png",
        "chronology": WATERCOLOR_SOURCE / "winter" / "chronology.png",
        "field": WATERCOLOR_SOURCE / "winter" / "field.png",
        "surface": WATERCOLOR_SOURCE / "winter" / "surface.png",
    },
}


def clamp(value: float, minimum: float = 0.0, maximum: float = 1.0) -> float:
    return min(maximum, max(minimum, value))


def smoother_step(value: float) -> float:
    t = clamp(value)
    return t * t * t * (t * (t * 6 - 15) + 10)


def normalize_plate(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    image = image.convert("RGB")
    source_ratio = image.width / image.height
    target_ratio = size[0] / size[1]
    if source_ratio > target_ratio:
        crop_width = round(image.height * target_ratio)
        left = (image.width - crop_width) // 2
        image = image.crop((left, 0, left + crop_width, image.height))
    elif source_ratio < target_ratio:
        crop_height = round(image.width / target_ratio)
        top = (image.height - crop_height) // 2
        image = image.crop((0, top, image.width, top + crop_height))
    normalized = image.resize(size, Image.Resampling.LANCZOS)
    if size[0] > image.width or size[1] > image.height:
        normalized = normalized.filter(ImageFilter.UnsharpMask(radius=1.25, percent=62, threshold=3))
    return normalized


def normalize_alpha_plate(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    image = image.convert("RGBA")
    source_ratio = image.width / image.height
    target_ratio = size[0] / size[1]
    if source_ratio > target_ratio:
        crop_width = round(image.height * target_ratio)
        left = (image.width - crop_width) // 2
        image = image.crop((left, 0, left + crop_width, image.height))
    elif source_ratio < target_ratio:
        crop_height = round(image.width / target_ratio)
        top = (image.height - crop_height) // 2
        image = image.crop((0, top, image.width, top + crop_height))
    return image.resize(size, Image.Resampling.LANCZOS)


def grade_gateway_growth(image: Image.Image, theme: str) -> Image.Image:
    grade = GATEWAY_GROWTH_GRADES[theme]
    alpha = image.getchannel("A")
    themed = ImageOps.colorize(
        ImageOps.grayscale(image),
        black=grade["black"],
        mid=grade["mid"],
        white=grade["white"],
        midpoint=124,
    ).convert("RGBA")
    themed.putalpha(alpha)
    return themed


def decorate_gateway(closed: Image.Image, overlay_path: Path | None, theme: str) -> Image.Image:
    """Composite seasonal growth without changing the canonical scene geometry."""
    if not overlay_path or not overlay_path.exists():
        return closed
    decorated = closed.convert("RGBA")
    growth = normalize_alpha_plate(Image.open(overlay_path), closed.size)
    decorated.alpha_composite(grade_gateway_growth(growth, theme))
    return decorated.convert("RGB")


def grade_gateway_master(image: Image.Image, theme: str) -> Image.Image:
    """Apply theme materials without changing one pixel of scene geometry."""
    if theme == "default":
        return image.convert("RGB")

    grade = GATEWAY_GRADES[theme]
    luminance = ImageOps.autocontrast(ImageOps.grayscale(image), cutoff=(0.35, 0.35))
    themed = ImageOps.colorize(
        luminance,
        black=grade["black"],
        mid=grade["mid"],
        white=grade["white"],
        midpoint=126,
    )
    themed = ImageEnhance.Color(themed).enhance(grade["color"])
    themed = ImageEnhance.Brightness(themed).enhance(grade["brightness"])
    return themed.filter(ImageFilter.UnsharpMask(radius=0.55, percent=24, threshold=3))


def normalize_artifact(image: Image.Image, canvas_size: tuple[int, int]) -> Image.Image:
    image = image.convert("RGBA")
    scale = max(1.0, ARTIFACT_MAX_EDGE / max(image.size))
    if scale > 1.0:
        image = image.resize(
            (round(image.width * scale), round(image.height * scale)),
            Image.Resampling.LANCZOS,
        )
        rgb = image.convert("RGB").filter(
            ImageFilter.UnsharpMask(radius=1.1, percent=72, threshold=2),
        )
        rgb.putalpha(image.getchannel("A"))
        image = rgb

    if image.width > canvas_size[0] or image.height > canvas_size[1]:
        fit_scale = min(canvas_size[0] / image.width, canvas_size[1] / image.height)
        image = image.resize(
            (round(image.width * fit_scale), round(image.height * fit_scale)),
            Image.Resampling.LANCZOS,
        )

    canvas = Image.new("RGBA", canvas_size, (0, 0, 0, 0))
    canvas.alpha_composite(
        image,
        ((canvas.width - image.width) // 2, (canvas.height - image.height) // 2),
    )
    return canvas


def polygon_mask(size: tuple[int, int], points: list[tuple[float, float]]) -> Image.Image:
    width, height = size
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    draw.polygon([(round(x * width), round(y * height)) for x, y in points], fill=255)
    return mask.filter(ImageFilter.GaussianBlur(1.35))


def translated_layer(
    source: Image.Image,
    mask: Image.Image,
    clip_mask: Image.Image,
    x: int,
    y: int,
) -> Image.Image:
    layer = Image.new("RGBA", source.size, (0, 0, 0, 0))
    cutout = source.convert("RGBA")
    cutout.putalpha(mask)
    layer.alpha_composite(cutout, (x, y))
    layer.putalpha(ImageChops.multiply(layer.getchannel("A"), clip_mask))
    return layer


def align_open_gateway(opened: Image.Image, closed: Image.Image) -> Image.Image:
    """Fit the earlier corridor scene to the standardized cosmic monument."""
    width, height = closed.size
    mask_width, mask_height = opened.size
    source_mask = Image.new("L", opened.size, 0)
    mask_draw = ImageDraw.Draw(source_mask)

    def draw_mask_polygon(points: list[tuple[float, float]]) -> None:
        mask_draw.polygon(
            [(round(x * mask_width), round(y * mask_height)) for x, y in points],
            fill=255,
        )

    draw_mask_polygon(
        [(0.255, 0.145), (0.407, 0.100), (0.407, 0.765), (0.355, 0.79), (0.145, 0.79), (0.245, 0.605)],
    )
    draw_mask_polygon(
        [(0.593, 0.100), (0.745, 0.145), (0.755, 0.605), (0.855, 0.79), (0.645, 0.79), (0.593, 0.765)],
    )
    draw_mask_polygon(
        [(0.392, 0.145), (0.608, 0.145), (0.608, 0.785), (0.392, 0.785)],
    )
    draw_mask_polygon(
        [(0.455, 0.72), (0.545, 0.72), (0.675, 1.0), (0.325, 1.0)],
    )
    source_mask = source_mask.filter(ImageFilter.GaussianBlur(4.5))

    scale_x = 1.0
    scale_y = 0.75
    scaled_size = (round(width * scale_x), round(height * scale_y))
    scaled_open = opened.resize(scaled_size, Image.Resampling.LANCZOS)
    scaled_mask = source_mask.resize(scaled_size, Image.Resampling.LANCZOS)
    offset = (
        0,
        round(height * 0.2205),
    )

    layer = Image.new("RGB", closed.size, (0, 0, 0))
    layer.paste(scaled_open, offset)
    mask = Image.new("L", closed.size, 0)
    mask.paste(scaled_mask, offset)
    return Image.composite(layer, closed, mask)


def portal_glow(
    size: tuple[int, int],
    door_mask: Image.Image,
    color: tuple[int, int, int],
    progress: float,
) -> Image.Image:
    eased = smoother_step(progress)
    if eased <= 0:
        return Image.new("RGBA", size, (0, 0, 0, 0))

    glow_mask = Image.new("L", size, 0)
    width, height = size
    radius_x = width * (0.006 + 0.030 * eased)
    ImageDraw.Draw(glow_mask).ellipse(
        (
            width * 0.5 - radius_x,
            height * 0.285,
            width * 0.5 + radius_x,
            height * 0.835,
        ),
        fill=round(82 * eased),
    )
    glow_mask = glow_mask.filter(ImageFilter.GaussianBlur(width * (0.007 + 0.012 * eased)))
    glow_mask = ImageChops.multiply(glow_mask, door_mask)
    glow = Image.new("RGBA", size, (*color, 0))
    glow.putalpha(glow_mask)
    return glow


def reveal_mask(size: tuple[int, int], progress: float) -> Image.Image:
    width, height = size
    if progress <= 0:
        return Image.new("L", size, 0)
    if progress >= 0.999:
        return Image.new("L", size, 255)

    center = width / 2
    portal_progress = smoother_step(progress / 0.72)
    half_width = max(2, width * 0.205 * portal_progress)
    shoulder = half_width * (0.58 + portal_progress * 0.18)
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    draw.polygon(
        [
            (center - shoulder, height * 0.282),
            (center + shoulder, height * 0.282),
            (center + half_width, height * 0.825),
            (center - half_width, height * 0.825),
        ],
        fill=255,
    )
    draw.polygon(
        [
            (center - half_width * 0.36, height * 0.64),
            (center + half_width * 0.36, height * 0.64),
            (center + width * 0.19 * portal_progress, height),
            (center - width * 0.19 * portal_progress, height),
        ],
        fill=255,
    )

    world_progress = smoother_step((progress - 0.68) / 0.32)
    if world_progress > 0:
        radius_x = width * 0.78 * world_progress
        radius_y = height * 1.08 * world_progress
        draw.ellipse(
            (center - radius_x, height * 0.53 - radius_y, center + radius_x, height * 0.53 + radius_y),
            fill=255,
        )
    return mask.filter(ImageFilter.GaussianBlur(4.0 + 18.0 * world_progress))


def dolly_frame(image: Image.Image, progress: float) -> Image.Image:
    width, height = image.size
    eased_progress = smoother_step(progress)
    zoom = 1.0 + 1.05 * eased_progress
    scaled = image.resize((round(width * zoom), round(height * zoom)), Image.Resampling.LANCZOS)
    anchor_x = width * 0.5
    anchor_y = height * 0.57
    left = round(anchor_x * zoom - anchor_x)
    top = round(anchor_y * zoom - anchor_y + height * 0.012 * eased_progress)
    return scaled.crop((left, top, left + width, top + height))


def render_gateway_sequence(
    theme: str,
    sources: dict[str, Path],
    render_frames: bool = True,
) -> None:
    closed_source = normalize_plate(Image.open(sources["gateway_closed"]), OUTPUT_SIZE)
    open_source = normalize_plate(Image.open(sources["gateway_open"]), OUTPUT_SIZE)
    if sources["gateway_authored"]:
        closed = decorate_gateway(closed_source, sources["gateway_growth"], theme)
        opened = align_open_gateway(open_source, closed)
    else:
        closed = decorate_gateway(
            grade_gateway_master(closed_source, theme),
            sources["gateway_growth"],
            theme,
        )
        opened = align_open_gateway(grade_gateway_master(open_source, theme), closed)
    size = closed.size

    left_mask = polygon_mask(
        size,
        [
            (0.385, 0.337),
            (0.499, 0.302),
            (0.499, 0.812),
            (0.468, 0.812),
            (0.445, 0.826),
            (0.292, 0.826),
            (0.268, 0.807),
            (0.311, 0.743),
            (0.350, 0.730),
            (0.364, 0.640),
        ],
    )
    right_mask = polygon_mask(
        size,
        [
            (0.501, 0.302),
            (0.615, 0.337),
            (0.636, 0.640),
            (0.650, 0.730),
            (0.689, 0.743),
            (0.732, 0.807),
            (0.708, 0.826),
            (0.555, 0.826),
            (0.532, 0.812),
            (0.501, 0.812),
        ],
    )
    door_mask = ImageChops.lighter(left_mask, right_mask)
    seam_mask = polygon_mask(
        size,
        [(0.496, 0.297), (0.504, 0.297), (0.507, 0.812), (0.493, 0.812)],
    )
    portal_mask = ImageChops.lighter(door_mask, seam_mask)
    left_pocket = polygon_mask(
        size,
        [(0.08, 0.24), (0.499, 0.24), (0.499, 0.88), (0.08, 0.88)],
    )
    right_pocket = polygon_mask(
        size,
        [(0.501, 0.24), (0.92, 0.24), (0.92, 0.88), (0.501, 0.88)],
    )
    output_dir = CINEMATIC / theme / "gateway" / GATEWAY_FRAME_DIR
    output_dir.mkdir(parents=True, exist_ok=True)
    closed.save(output_dir.parent / "cosmic-master-v5.webp", "WEBP", quality=BACKGROUND_QUALITY, method=4)

    # The name is rendered between the sky and this exact gate cutout. Using
    # the production door mask makes its entrance disappear behind the actual
    # masonry silhouette rather than an approximate rectangular crop.
    name_occluder = closed.convert("RGBA")
    name_occluder.putalpha(
        ImageChops.multiply(name_occluder.getchannel("A"), door_mask),
    )
    name_occluder.save(
        output_dir.parent / GATEWAY_NAME_OCCLUDER,
        "WEBP",
        quality=ARTIFACT_QUALITY,
        method=6,
    )
    if not render_frames:
        return

    for index in range(FRAME_COUNT):
        t = index / (FRAME_COUNT - 1)
        door_progress = smoother_step((t - 0.025) / 0.88)
        aperture_progress = smoother_step((t - 0.015) / 0.94)
        base = Image.composite(opened, closed, reveal_mask(size, aperture_progress)).convert("RGBA")
        base.alpha_composite(portal_glow(size, portal_mask, PORTAL_LIGHTS[theme], door_progress))

        travel = round(size[0] * 0.145 * door_progress)
        vertical = round(size[1] * 0.008 * math.sin(door_progress * math.pi))
        if travel < size[0] * 0.14:
            base.alpha_composite(translated_layer(closed, left_mask, left_pocket, -travel, vertical))
            base.alpha_composite(translated_layer(closed, right_mask, right_pocket, travel, vertical))

        dolly_progress = clamp((t - 0.06) / 0.94)
        frame = dolly_frame(base.convert("RGB"), dolly_progress)
        frame.save(
            output_dir / f"frame-{index:02d}.webp",
            "WEBP",
            quality=BACKGROUND_QUALITY,
            method=6,
        )


def write_gateway_vegetation(theme: str, sources: dict[str, Path]) -> None:
    source = sources.get("gateway_vegetation")
    if not source:
        return
    vegetation = normalize_alpha_plate(Image.open(source), OUTPUT_SIZE)
    output = CINEMATIC / theme / "gateway" / GATEWAY_VEGETATION_OUTPUT
    output.parent.mkdir(parents=True, exist_ok=True)
    vegetation.save(
        output,
        "WEBP",
        quality=ARTIFACT_QUALITY,
        method=6,
        exact=True,
    )


def write_scene_plates(theme: str, sources: dict[str, Path]) -> None:
    output_dir = CINEMATIC / theme
    output_dir.mkdir(parents=True, exist_ok=True)
    for name in ("systems", "chronology", "field", "surface"):
        image = normalize_plate(Image.open(sources[name]), OUTPUT_SIZE)
        if theme == "winter" and name == "surface":
            image = ImageEnhance.Brightness(image).enhance(1.62)
            image = ImageEnhance.Contrast(image).enhance(0.82)
        image.save(
            output_dir / f"{name}.webp",
            "WEBP",
            quality=BACKGROUND_QUALITY,
            method=6,
        )

    particle_extension = ".png" if theme == "default" else ".webp"
    shutil.copy2(
        SOURCE / theme / f"particles{particle_extension}",
        output_dir / f"particles{particle_extension}",
    )


def write_artifacts(theme: str) -> None:
    source_dir = SOURCE / theme / "artifacts"
    output_dir = CINEMATIC / theme / "artifacts"
    output_dir.mkdir(parents=True, exist_ok=True)
    for name in ("pipeline", "plugin", "telemetry"):
        png_source = source_dir / f"{name}.png"
        source = png_source if png_source.exists() else source_dir / f"{name}.webp"
        artifact = normalize_artifact(Image.open(source), ARTIFACT_CANVASES[name])
        artifact.save(
            output_dir / f"{name}.webp",
            "WEBP",
            quality=ARTIFACT_QUALITY,
            method=6,
            exact=True,
        )


def main() -> None:
    parser = argparse.ArgumentParser(description="Build cinematic watercolor assets.")
    parser.add_argument(
        "--gateway-only",
        action="store_true",
        help="Rebuild only the normalized cosmic gateway sequences.",
    )
    parser.add_argument(
        "--gateway-occluder-only",
        action="store_true",
        help="Rebuild only the exact gate silhouettes used to occlude the intro name.",
    )
    parser.add_argument(
        "--theme",
        choices=tuple(THEMES),
        help="Build one theme instead of the complete set.",
    )
    args = parser.parse_args()
    if args.gateway_only and args.gateway_occluder_only:
        parser.error("--gateway-only and --gateway-occluder-only cannot be combined")
    for theme, sources in THEMES.items():
        if args.theme and theme != args.theme:
            continue
        render_gateway_sequence(
            theme,
            sources,
            render_frames=not args.gateway_occluder_only,
        )
        if not args.gateway_occluder_only:
            write_gateway_vegetation(theme, sources)
        if not args.gateway_only and not args.gateway_occluder_only:
            write_scene_plates(theme, sources)
            write_artifacts(theme)
        print(
            f"Built {theme}: "
            + (
                f"{OUTPUT_SIZE[0]}x{OUTPUT_SIZE[1]} gate name occluder only"
                if args.gateway_occluder_only
                else (
                    f"{FRAME_COUNT} {OUTPUT_SIZE[0]}x{OUTPUT_SIZE[1]} gateway frames, gateway assets only"
                    if args.gateway_only
                    else (
                        f"{FRAME_COUNT} {OUTPUT_SIZE[0]}x{OUTPUT_SIZE[1]} gateway frames, "
                        "4 scene surfaces, 3 high-resolution artifacts, and particle atlas"
                    )
                )
            )
        )


if __name__ == "__main__":
    main()
