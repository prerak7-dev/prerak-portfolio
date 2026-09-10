"""Derive flow data from the final paintings, not from legacy scene silhouettes."""
from pathlib import Path
from build_scene_geometry_fields import build_geometry_field

root = Path(__file__).resolve().parents[1] / 'public' / 'cinematic' / 'painted-v1'
count = 0
for painting in root.glob('*/*/*.webp'):
    if painting.stem in ('avatar', 'satellite'):
        continue
    build_geometry_field(painting, painting.parent / 'geometry' / painting.name, force=True)
    count += 1
print(f'Rebuilt {count} painting-specific contour fields.')
