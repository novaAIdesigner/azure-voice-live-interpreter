# Azure Voice Live - Speech Translation (Web Demo)

A minimal Vite + React + TypeScript demo that uses **Azure Voice Live** for real-time speech translation.

Features:
- Configurable `endpoint`, `apiKey`, `model` (defaults to `gpt-5`), and `target language`.
- “同声传译专家” system prompt (sentence-by-sentence, context-aware translation).
- Session window logs: ASR, translations, and event logs.
- Benchmarks per turn: latency + token usage (also keeps totals).
- One-click export to the **Azure Voice Live Calculator** via URL params.

## Run

```powershell
npm install
npm run dev
```

Open the printed local URL, set your Voice Live `endpoint` + `apiKey`, then click **Connect**.

## Notes

- Browser audio requires a user gesture; use **Connect** / **Start Mic** buttons.
- The config is stored in `localStorage` in your browser.
