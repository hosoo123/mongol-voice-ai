# 🤖 Mongol Voice AI — AI Handoff

## 🎯 Project Goal

Монгол хэлээр хэрэглэгчтэй дуу хоолойгоор харилцдаг AI assistant хийх.

Үндсэн flow:

**🎤 User Voice → 📝 Speech-to-Text → 🧠 AI → 🔊 Text-to-Speech → 🎤 AI Voice**

Зорилго нь дараа нь realtime, memory, personality, avatar зэрэг боломжуудтай болгох.

---

## 📌 Current Status

### Project

- Name: Mongol Voice AI
- Framework: Next.js
- Language: TypeScript
- Styling: Tailwind CSS
- Router: App Router

### Current stage

**Stage 1 — Project setup**

- [x] Next.js project үүсгэсэн
- [x] TypeScript
- [x] ESLint
- [x] Tailwind CSS
- [x] App Router
- [ ] Microphone input
- [ ] Speech-to-Text
- [ ] AI response
- [ ] Text-to-Speech
- [ ] Voice conversation
- [ ] Conversation history
- [ ] Memory
- [ ] Realtime mode
- [ ] Avatar

---

## 🏗️ Planned Architecture

```text
User
 │
 ▼
🎤 Microphone
 │
 ▼
Speech-to-Text
 │
 ▼
📝 User Text
 │
 ▼
🧠 AI Model
 │
 ▼
📝 AI Response
 │
 ▼
Text-to-Speech
 │
 ▼
🔊 AI Voice
```

---

## 📁 Important Project Structure

Expected structure:

```text
mongol-voice-ai/
│
├── src/
│   └── app/
│       ├── page.tsx
│       ├── layout.tsx
│       └── globals.css
│
├── public/
│
├── .env.local
├── package.json
├── tsconfig.json
├── next.config.ts
├── AI_HANDOFF.md
└── README.md
```

Do not assume files exist if they have not been created yet.

---

## 🔑 Environment Variables

Secrets must NEVER be committed to GitHub.

Use:

```text
.env.local
```

Example:

```env
AI_API_KEY=
```

When adding a new API, update this section.

Never put actual API keys inside this file.

---

## 🧠 AI Development Rules

When another AI continues this project:

1. Read `AI_HANDOFF.md` first.
2. Inspect the existing code before changing anything.
3. Do NOT rebuild existing functionality unnecessarily.
4. Do NOT delete working code without a reason.
5. Keep the project compatible with Next.js + TypeScript.
6. Explain major changes briefly.
7. After completing a meaningful change, update `AI_HANDOFF.md`.
8. Keep secrets out of Git.
9. Test the project after important changes.
10. If something is uncertain, inspect the code instead of guessing.

---

## 🔄 Handoff Workflow

Before asking another AI to continue:

```text
1. git pull
2. Read AI_HANDOFF.md
3. Inspect current project
4. Continue from CURRENT STATUS
5. Test changes
6. Update AI_HANDOFF.md
7. Commit changes
```

---

## 📝 Change Log

### Initial Setup

Date: 2026-09-24

Created the initial Next.js project for Mongol Voice AI.

Current goal:

Build the first working voice conversation prototype.

---

## 🔜 Next Task

### Task 1 — Microphone Input

Implement:

```text
User clicks microphone
        ↓
Browser requests microphone permission
        ↓
User speaks
        ↓
Audio is captured
        ↓
Audio/text is prepared for Speech-to-Text
```

Do not implement the entire AI system yet.

Complete and test microphone functionality first.

---

## 🤖 Prompt for Another AI

Use this prompt when continuing the project:

> Read `AI_HANDOFF.md` first.
>
> You are continuing an existing Next.js + TypeScript project called **Mongol Voice AI**.
>
> Do not rebuild the project from scratch.
>
> First inspect the current files and understand what has already been implemented.
>
> Follow the current status and next task described in `AI_HANDOFF.md`.
>
> Make only the changes needed for the current task.
>
> Test the implementation.
>
> After finishing, update `AI_HANDOFF.md` with:
>
> - what was changed
> - current status
> - any errors
> - next recommended task
>
> Do not expose or commit API keys or other secrets.

---

## 🚨 Known Issues

None yet.

---

## 💡 Future Features

### Voice

- [ ] Realtime voice conversation
- [ ] Interrupt AI while speaking
- [ ] Voice activity detection
- [ ] Low-latency responses
- [ ] Different AI voices

### AI

- [ ] Personality
- [ ] Conversation memory
- [ ] Long-term memory
- [ ] Tool calling
- [ ] Web search
- [ ] Personal knowledge base

### UI

- [ ] Animated microphone
- [ ] Voice waveform
- [ ] Conversation bubbles
- [ ] AI avatar
- [ ] Dark mode
- [ ] Mobile responsive design

### Advanced

- [ ] Realtime API
- [ ] Streaming responses
- [ ] User accounts
- [ ] Conversation history
- [ ] Usage limits
- [ ] Deploy to production

---

## 📌 Important

This file is the project's **shared memory for AI coding assistants**.

Any AI that continues this project should read this file before making changes.

Keep it updated as the project evolves.
