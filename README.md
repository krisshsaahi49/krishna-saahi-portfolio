# Krishna Saahi Yavana Portfolio

Next.js portfolio website with a resume-informed local chatbot and prepopulated questions.

Live site: https://krishna-saahi-portfolio.vercel.app

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

## Deploy To Vercel

1. Push this folder to GitHub.
2. Import the repository in Vercel.
3. Use the default Next.js settings:
   - Build command: `npm run build`
   - Output: Next.js default
4. Deploy.

No API key is required for the chatbot. It answers from the structured resume details in `app/page.tsx`.
