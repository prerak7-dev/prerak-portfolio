# Prerak Pandey — Portfolio

Interactive single-page Vite/React portfolio for backend, full-stack, online-services, and game-technology applications.

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