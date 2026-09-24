"use client";

import { useEffect, useRef, useState } from "react";

type SpeechRecognitionEventLike = Event & {
  resultIndex?: number;
  results: SpeechRecognitionResultList;
};

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: Event & { error?: string }) => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export default function Home() {
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");
  const [interimText, setInterimText] = useState("");
  useEffect(() => {
    return () => recognitionRef.current?.abort();
  }, []);

  const toggleMicrophone = () => {
    setError("");

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError(
        "Таны browser speech recognition-ийг дэмжихгүй байна. Chrome эсвэл Edge ашиглаарай.",
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "mn-MN";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";

      for (let i = event.resultIndex ?? 0; i < event.results.length; i += 1) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalText += transcript + " ";
        } else {
          interimText += transcript;
        }
      }

      setInterimText(interimText);
      if (finalText) {
        setText((previous) => (previous + " " + finalText).trim());
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);

      if (event.error === "not-allowed") {
        setError(
          "Микрофоны зөвшөөрөл хаалттай байна. Browser-ийн microphone permission-ийг Allow болгоорой.",
        );
      } else if (event.error === "no-speech") {
        setError("Дуу хоолой сонсогдсонгүй. Дахин ярьж үзээрэй.");
      } else {
        setError("Дуу хоолой таних үед алдаа гарлаа. Дахин оролдоно уу.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch {
      setIsListening(false);
      setError("Микрофон эхлүүлж чадсангүй. Дахин оролдоно уу.");
      recognitionRef.current = null;
    }
  };

  const clearText = () => {
    setText("");
    setError("");
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
            Mongol Voice AI
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Монгол хэлээр ярь
          </h1>
          <p className="mt-4 text-zinc-400">
            Микрофоноо дараад монголоор яр. Яриаг чинь текст болгоно.
          </p>
        </div>

        <button
          type="button"
          onClick={toggleMicrophone}
          aria-label={isListening ? "Микрофон зогсоох" : "Микрофон эхлүүлэх"}
          className={`mb-8 flex h-24 w-24 items-center justify-center rounded-full text-4xl shadow-2xl transition-all ${
            isListening
              ? "animate-pulse bg-red-500 shadow-red-500/30"
              : "bg-white text-black hover:scale-105"
          }`}
        >
          {isListening ? "■" : "🎙️"}
        </button>

        <div className="w-full rounded-3xl border border-white/10 bg-white/4 p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-400">
              {isListening ? "Сонсож байна..." : "Таны яриа"}
            </span>

            {text && (
              <button
                type="button"
                onClick={clearText}
                className="text-sm text-zinc-500 transition hover:text-white"
              >
                Цэвэрлэх
              </button>
            )}
          </div>

          <p className="min-h-32 whitespace-pre-wrap text-lg leading-8 text-zinc-100">
            {text + " " + interimText || "Микрофоноо дараад ярьж эхлээрэй..."}
          </p>
        </div>

        {error && (
          <p className="mt-5 max-w-xl text-center text-sm text-red-400">
            {error}
          </p>
        )}

        <p className="mt-6 text-center text-xs text-zinc-600">
          Эхний хувилбар нь browser-ийн Speech Recognition ашиглаж байна.
        </p>
      </div>
    </main>
  );
}
