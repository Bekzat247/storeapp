# StoreApp 📦

Mobile-first store management app — replacement for 1C for small businesses.

## Setup

```bash
npm install
npm start
```

Opens at http://localhost:3000

## Deploy to GitHub Pages (for QR code)

1. Edit `package.json` — replace `YOUR_GITHUB_USERNAME` with your real GitHub username
2. Create a GitHub repo called `storeapp`
3. Run:

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/storeapp.git
git push -u origin main
npm run deploy
```

4. Go to `https://YOUR_USERNAME.github.io/storeapp`
5. Generate QR code at https://www.qr-code-generator.com/ pointing to that URL

## Features

- 🏠 **Dashboard** — today's sales, orders, low stock alerts
- 📦 **Inventory** — add/edit/delete products, filter by category/status
- 📷 **Scanner** — simulate barcode scan, manual search, update stock
- 📊 **Analytics** — weekly revenue chart, top products
- 👤 **Profile** — edit name, toggle dark/light mode

## Tech

- React 18
- localStorage (no backend needed)
- Pure CSS (no UI library)
