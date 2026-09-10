from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "cinematic"
THEMES = ("default", "fall", "spring", "winter")
SCENES = ("cores", "systems", "chronology", "field", "surface")
FIELD_SIZE = (640, 360)
GATEWAY_FRAME_DIR = "cosmic-frames-v9"


def smoothstep(edge0: float, edge1: float, value: np.ndarray) -> np.ndarray:
    normalized = np.clip((value - edge0) / max(1e-6, edge1 - edge0), 0.0, 1.0)
    return normalized * normalized * (3.0 - 2.0 * normalized)


def blurred_array(image: Image.Image, radius: float) -> np.ndarray:
    return np.asarray(image.filter(ImageFilter.GaussianBlur(radius)), dtype=np.float32) / 255.0


def build_geometry_field(source: Path, target: Path, force: bool = False) -> bool:
    if target.exists() and not force:
        return False
    with Image.open(source) as raw:
        rgb = raw.convert("RGB").resize(FIELD_SIZE, Image.Resampling.LANCZOS)

    rgb_array = np.asarray(rgb, dtype=np.float32) / 255.0
    luminance = (
        rgb_array[:, :, 0] * 0.2126
        + rgb_array[:, :, 1] * 0.7152
        + rgb_array[:, :, 2] * 0.0722
    )
    luminance_image = Image.fromarray(np.uint8(np.clip(luminance, 0.0, 1.0) * 255))

    # These scales sit above the repeated paper grain in the scene plates. The
    # resulting field keeps the authored silhouettes, limbs, rings, cloud
    # shelves, mountain ridges, and horizons without tracing brush texture.
    macro = blurred_array(luminance_image, 10.5)
    medium = blurred_array(luminance_image, 4.8)
    gradient_x = np.gradient(medium, axis=1)
    gradient_y = np.gradient(medium, axis=0)
    macro_x = np.gradient(macro, axis=1)
    macro_y = np.gradient(macro, axis=0)
    gradient_magnitude = np.hypot(gradient_x, gradient_y)
    macro_magnitude = np.hypot(macro_x, macro_y)
    combined = gradient_magnitude * 0.76 + macro_magnitude * 1.34

    nonzero = combined[combined > 1e-6]
    reference = float(np.percentile(nonzero, 97.8)) if nonzero.size else 1.0
    normalized = np.clip(combined / max(reference, 1e-6), 0.0, 1.0)
    edge_energy = smoothstep(0.08, 0.76, normalized)

    # Favor illuminated structure without erasing darker silhouettes. This
    # keeps the field attached to the source composition instead of texture.
    light_floor = float(np.percentile(macro, 42.0))
    light_peak = float(np.percentile(macro, 96.0))
    illuminated = smoothstep(light_floor, max(light_floor + 0.02, light_peak), macro)
    edge_energy *= 0.66 + illuminated * 0.34

    edge_image = Image.fromarray(np.uint8(np.clip(edge_energy, 0.0, 1.0) * 255))
    diffusion = blurred_array(edge_image, 7.5)
    wide_diffusion = blurred_array(edge_image, 21.0)
    mask = np.clip(edge_energy * 0.96 + diffusion * 0.7 + wide_diffusion * 0.2, 0.0, 1.0)
    mask = np.power(mask, 0.9)

    length = np.maximum(1e-6, np.hypot(gradient_x, gradient_y))
    tangent_x = -gradient_y / length
    tangent_y = gradient_x / length
    weak = normalized < 0.035
    tangent_x[weak] = 1.0
    tangent_y[weak] = 0.0

    field = np.zeros((FIELD_SIZE[1], FIELD_SIZE[0], 4), dtype=np.uint8)
    field[:, :, 0] = np.uint8(np.clip(tangent_x * 0.5 + 0.5, 0.0, 1.0) * 255)
    field[:, :, 1] = np.uint8(np.clip(tangent_y * 0.5 + 0.5, 0.0, 1.0) * 255)
    field[:, :, 2] = np.uint8(np.clip(edge_energy, 0.0, 1.0) * 255)
    field[:, :, 3] = np.uint8(np.clip(mask, 0.0, 1.0) * 255)

    target.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(field).save(
        target,
        format="WEBP",
        lossless=False,
        quality=92,
        method=4,
        exact=True,
    )
    return True


def main() -> None:
    parser = argparse.ArgumentParser(description="Build cinematic image-derived geometry fields.")
    parser.add_argument("--force", action="store_true", help="Regenerate existing geometry fields.")
    parser.add_argument(
        "--gateway-only",
        action="store_true",
        help="Regenerate gateway geometry without touching the section scene fields.",
    )
    args = parser.parse_args()
    generated = 0
    for theme in THEMES:
        theme_root = PUBLIC / theme
        geometry_root = theme_root / "geometry"
        if not args.gateway_only:
            for scene in SCENES:
                generated += int(build_geometry_field(
                    theme_root / f"{scene}.webp",
                    geometry_root / f"{scene}-flow.webp",
                    force=args.force,
                ))

        for frame_index in range(24):
            frame_name = f"frame-{frame_index:02d}.webp"
            generated += int(build_geometry_field(
                theme_root / "gateway" / GATEWAY_FRAME_DIR / frame_name,
                geometry_root / "gateway" / GATEWAY_FRAME_DIR / frame_name,
                force=args.force,
            ))

    print(f"Generated {generated} new image-derived geometry fields at {FIELD_SIZE[0]}x{FIELD_SIZE[1]}.")


if __name__ == "__main__":
    main()
