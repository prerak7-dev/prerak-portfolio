# Prerak Pandey — Portfolio

Interactive single-page Vite/React portfolio for backend, full-stack, online-services, and game-technology applications.

## Current build

This version includes:

- fixed full-page ambient world layer
- front-layer snowboard/soccer motion tied to scroll progress
- local-time ambience and optional live local weather
- smaller always-visible explorer panel
- polished Guerrilla-focused copy
- profile photo in the nav/contact areas
- document title set to `Prerak Pandey | Portfolio`
- Vite production build included in `dist`

## Recommended environment

Use Node.js 20 LTS.

```powershell
node -v
npm -v
```

Recommended:

- Node: 20.x LTS
- npm: 10.x

## Run locally

```powershell
npm install --no-audit --no-fund
npm run dev
```

Open the Vite URL printed in the terminal, usually:

```text
http://127.0.0.1:5173
```

## Production build

```powershell
npm run build
```

The generated static site is written to:

```text
dist
```

## No-install preview

The `dist` folder is included. You can preview the built site without installing dependencies:

```powershell
cd dist
python -m http.server 5174
```

Then open:

```text
http://127.0.0.1:5174
```

## Vercel deployment settings

Use these values if Vercel asks:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

## Change the browser tab title

Edit `index.html`:

```html
<title>Prerak Pandey | Portfolio</title>
```

Then rebuild and redeploy:

```powershell
npm run build
git add .
git commit -m "Update site title"
git push
```
