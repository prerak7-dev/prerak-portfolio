from __future__ import annotations

import math
import shutil
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
CINEMATIC = ROOT / "public" / "cinematic"
SOURCE = ROOT / "scripts" / "cinematic-source"
FRAME_COUNT = 24
OUTPUT_SIZE = (2560, 1440)
ARTIFACT_MAX_EDGE = 2560
BACKGROUND_QUALITY = 90
ARTIFACT_QUALITY = 95


THEMES = {
    "default": {
        "closed": SOURCE / "default" / "gateway" / "closed.webp",
        "open": SOURCE / "default" / "gateway" / "open.png",
        "systems": SOURCE / "default" / "systems.webp",
        "chronology": SOURCE / "default" / "chronology.webp",
        "field": SOURCE / "default" / "field.webp",
        "surface": SOURCE / "default" / "surface.png",
    },
    "spring": {
        "closed": SOURCE / "spring" / "gateway" / "closed.png",
        "open": SOURCE / "spring" / "gateway" / "open.png",
        "systems": SOURCE / "spring" / "systems.png",
        "chronology": SOURCE / "spring" / "chronology.png",
        "field": SOURCE / "spring" / "field.png",
        "surface": SOURCE / "spring" / "surface.png",
    },
    "fall": {
        "closed": SOURCE / "fall" / "gateway" / "closed.png",
        "open": SOURCE / "fall" / "gateway" / "open.png",
        "systems": SOURCE / "fall" / "systems.png",
        "chronology": SOURCE / "fall" / "chronology.png",
        "field": SOURCE / "fall" / "field.png",
        "surface": SOURCE / "fall" / "surface.png",
    },
    "winter": {
        "closed": SOURCE / "winter" / "gateway" / "closed.png",
        "open": SOURCE / "winter" / "gateway" / "open.png",
        "systems": SOURCE / "winter" / "systems.png",
        "chronology": SOURCE / "winter" / "chronology.png",
        "field": SOURCE / "winter" / "field.png",
        "surface": SOURCE / "winter" / "surface.png",
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


def normalize_artifact(image: Image.Image) -> Image.Image:
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
    return image


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


def reveal_mask(size: tuple[int, int], progress: float) -> Image.Image:
    width, height = size
    if progress <= 0:
        return Image.new("L", size, 0)
    if progress >= 0.999:
        return Image.new("L", size, 255)

    center = width / 2
    portal_progress = smoother_step(progress / 0.72)
    half_width = max(2, width * 0.235 * portal_progress)
    shoulder = half_width * (0.72 + portal_progress * 0.28)
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    draw.polygon(
        [
            (center - shoulder, height * 0.055),
            (center + shoulder, height * 0.055),
            (center + half_width, height * 0.79),
            (center - half_width, height * 0.79),
        ],
        fill=255,
    )
    draw.polygon(
        [
            (center - half_width * 0.42, height * 0.58),
            (center + half_width * 0.42, height * 0.58),
            (center + width * 0.33 * portal_progress, height),
            (center - width * 0.33 * portal_progress, height),
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
    zoom = 1.0 + 0.48 * eased_progress
    scaled = image.resize((round(width * zoom), round(height * zoom)), Image.Resampling.LANCZOS)
    anchor_x = width * 0.5
    anchor_y = height * 0.57
    left = round(anchor_x * zoom - anchor_x)
    top = round(anchor_y * zoom - anchor_y + height * 0.012 * eased_progress)
    return scaled.crop((left, top, left + width, top + height))


def render_gateway_sequence(theme: str, sources: dict[str, Path]) -> None:
    closed = normalize_plate(Image.open(sources["closed"]), OUTPUT_SIZE)
    opened = normalize_plate(Image.open(sources["open"]), OUTPUT_SIZE)
    size = closed.size

    left_mask = polygon_mask(
        size,
        [(0.398, 0.09), (0.492, 0.075), (0.492, 0.785), (0.388, 0.785), (0.405, 0.60)],
    )
    right_mask = polygon_mask(
        size,
        [(0.508, 0.075), (0.602, 0.09), (0.595, 0.60), (0.612, 0.785), (0.508, 0.785)],
    )
    left_pocket = polygon_mask(
        size,
        [(0.255, 0.045), (0.498, 0.045), (0.498, 0.81), (0.245, 0.81), (0.275, 0.60)],
    )
    right_pocket = polygon_mask(
        size,
        [(0.502, 0.045), (0.745, 0.045), (0.725, 0.60), (0.755, 0.81), (0.502, 0.81)],
    )
    output_dir = CINEMATIC / theme / "gateway" / "frames"
    output_dir.mkdir(parents=True, exist_ok=True)

    for index in range(FRAME_COUNT):
        t = index / (FRAME_COUNT - 1)
        door_progress = smoother_step((t - 0.025) / 0.88)
        aperture_progress = smoother_step((t - 0.015) / 0.94)
        base = Image.composite(opened, closed, reveal_mask(size, aperture_progress)).convert("RGBA")

        travel = round(size[0] * 0.12 * door_progress)
        vertical = round(size[1] * 0.008 * math.sin(door_progress * math.pi))
        if travel < size[0] * 0.115:
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
        artifact = normalize_artifact(Image.open(source))
        artifact.save(
            output_dir / f"{name}.webp",
            "WEBP",
            quality=ARTIFACT_QUALITY,
            method=6,
            exact=True,
        )


def main() -> None:
    for theme, sources in THEMES.items():
        render_gateway_sequence(theme, sources)
        write_scene_plates(theme, sources)
        write_artifacts(theme)
        print(
            f"Built {theme}: {FRAME_COUNT} {OUTPUT_SIZE[0]}x{OUTPUT_SIZE[1]} gateway frames, "
            "4 scene surfaces, 3 high-resolution artifacts, and particle atlas"
        )


if __name__ == "__main__":
    main()
