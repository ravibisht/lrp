# 🎯 Lakshman Rekha Party (LRP) - Official Parody Campaign Website

Welcome to the digital headquarters of the **Lakshman Rekha Party (LRP)**, an interactive, satirical youth movement and parody Indian political party campaign. Our mission is clear: complete resistance to laziness, setting strict limits on procrastination, and banishing damp hostel habits.

This full-stack application utilizes a high-contrast Neo-Brutalist graphical design, modern React, Vite, Node.js 22, Express, and Gemini API capabilities.

---

## 🚀 Key Feature Sets

1. **Lakshman Rekha Parody Manifestos**: Real-time ticker feeds detailing campaign breakthroughs, platform planks, and digital boundaries for young adults.
2. **Rekha Roach Shield Defense Game**: An interactive canvas-based boundary protection game! Draw defensive white chalk lines to repel and banish crawling bugs of the *Cockroach Janta Party (CJP)*.
3. **Rekha Youth Alignment Registry**: An interactive voter badge and campaign sticker generator with printable card layout cards, biometric verification stamps, and customizable youth levels.
4. **AI CJP Behavior Auditor**: Submit behavioral logs, tweets, or hostel roommate habits to get them audited and roasted through the Gemini 3.5 AI Core, issuing mandatory discipline directives.

---

## 🛠️ Tech Stack & Directory Mapping

- **Frontend**: React 19, Vite 6, Tailwind CSS v4, Lucide-React, Motion dynamic animations.
- **Backend Service**: Express 4, Node 22, `@google/genai` modern client SDK.
- **Compiling Pipeline**: `esbuild` bundles backend types into a production-safe CommonJS script (`dist/server.cjs`) to avoid ES module runtime overheads.

### File Tree Highlights
- `/Dockerfile` - Multi-stage container compilation instructions for Google Cloud Run.
- `/.github/workflows/deploy.yml` - Reinstalled CI/CD pipeline for automatic code vetting and continuous delivery.
- `/server.ts` - Node.js Express server housing the Gemini AI API endpoints with local ledger fallbacks.
- `/src/App.tsx` - Campaign HQ portal containing user state and Neo-Brutalist layouts.
- `/src/components/` - Sub-modules for the Roach Defense Canvas, Member Profile Badges, and Behavior Auditor.

---

## 💻 Local Development

### 1. Prerequisites
Ensure you have **Node.js 22+** installed on your workstation.

### 2. Configure Environment Secrets
Make a copy of `.env.example` as `.env` and fill in your details:
```bash
cp .env.example .env
```
Ensure `GEMINI_API_KEY` is set to enable customized AI audits and slogans.

### 3. Running with the Dev Engine
Launch the client and server watchdogs in tandem:
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the Campaign.

### 4. Compiling Production Bundles
Build both static frontend files and the server entrypoint recursively:
```bash
npm run build
npm start
```

---

## 🐳 Containerization & CI/CD Pipelines

### Docker Container Running Details
Build and spin up the production sandbox locally using:
```bash
docker build -t lrp-sarkar .
docker run -p 3000:3000 lrp-sarkar
```

### GitHub Actions (Restore Target)
The custom `.github/workflows/deploy.yml` file handles standard verification on push and pull requests on the `main` or `master` branch. It:
1. Provisions standard Ubuntu runtimes.
2. Caches NPM packages.
3. Performs type check validation (`npm run lint`).
4. Compiles production deliverables (`npm run build`).
5. Demonstrates custom deployment tasks straight into Google Cloud Run on target releases.
