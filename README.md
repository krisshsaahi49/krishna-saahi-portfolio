# Krishna Saahi Yavana Portfolio

Astro portfolio website with an animated Three.js hero scene, resume-informed local chatbot, and prepopulated questions.

Live site: https://krishna-saahi-portfolio.vercel.app

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL shown by Astro, usually `http://localhost:4321`.

## Build

```bash
npm run build
```

## Deploy To Vercel

1. Push this folder to GitHub.
2. Import the repository in Vercel.
3. Use the Astro settings:
   - Build command: `npm run build`
   - Output: `dist`
4. Deploy.

No API key is required for the chatbot. It answers from the structured resume details in `src/data/profile.ts`.
