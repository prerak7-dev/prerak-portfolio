from pathlib import Path

from build_scene_geometry_fields import build_geometry_field


root = Path(__file__).resolve().parents[1] / 'public' / 'cinematic' / 'painted-v1'
count = 0
for source in sorted(root.glob('*/*/portrait/*.webp')):
    count += int(build_geometry_field(
        source, source.parent / 'geometry' / source.name,
        force=True, field_size=(320, 640),
    ))
print(f'Built {count} portrait contour fields at 320x640.')
