# Homan Scene

`Homan Scene` is the portfolio's custom geometric stencil family, reconstructed
from the supplied Homan alphabet reference and extended into a complete local
display package.

## Files

- `HomanScene-Complete.woff2` - optimized browser font
- `HomanScene-Complete.ttf` - desktop and design-tool font
- `homan-scene.css` - standalone `@font-face` declaration
- `HomanScene-Specimen.html` - complete browser specimen

## Character coverage

- Uppercase and lowercase Latin
- Tabular numerals
- Basic Latin punctuation and symbols
- Latin-1 accented forms
- Common web symbols, including euro, copyright, registered, trademark,
  bullets, ellipsis, and typographic dashes

## Regeneration

The deterministic source is `scripts/generate_homan_scene_font.py`. It uses
FontTools and Brotli to produce both distribution formats.

This package is a private portfolio asset and should not be redistributed as a
standalone type product.
