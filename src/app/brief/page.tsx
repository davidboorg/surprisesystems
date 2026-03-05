"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Question {
  id: string;
  prompt: string;
  placeholder: string;
  type: "text" | "textarea";
}

const questions: Question[] = [
  {
    id: "name",
    prompt: "Vad heter du?",
    placeholder: "Ditt namn...",
    type: "text",
  },
  {
    id: "company",
    prompt: "Vilket företag kommer du från?",
    placeholder: "Företagsnamn...",
    type: "text",
  },
  {
    id: "painpoint",
    prompt: "Vad håller dig vaken om natten?",
    placeholder: "Beskriv din största utmaning...",
    type: "textarea",
  },
  {
    id: "tried",
    prompt: "Vad har ni redan testat som inte funkade?",
    placeholder: "Tidigare försök...",
    type: "textarea",
  },
  {
    id: "magic",
    prompt: "Om du hade en magic wand, vad skulle du fixa först?",
    placeholder: "Din önskelösning...",
    type: "textarea",
  },
  {
    id: "stakes",
    prompt: "Vad händer om ni inte gör något?",
    placeholder: "Konsekvenserna av att vänta...",
    type: "textarea",
  },
  {
    id: "email",
    prompt: "Vart ska vi skicka våra tankar?",
    placeholder: "din@email.com",
    type: "text",
  },
];

export default function BriefPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [typedPrompt, setTypedPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const currentQuestion = questions[currentStep];
  const isLastQuestion = currentStep === questions.length - 1;

  // Typing animation for prompt
  useEffect(() => {
    if (!currentQuestion) return;

    setTypedPrompt("");
    setIsTyping(true);

    const prompt = `> ${currentQuestion.prompt}`;
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index < prompt.length) {
        setTypedPrompt(prompt.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
        // Focus input after typing is done
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [currentStep, currentQuestion]);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (currentQuestion.type === "text" || (currentQuestion.type === "textarea" && e.metaKey)) {
        e.preventDefault();
        if (answers[currentQuestion.id]?.trim()) {
          handleNext();
        }
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    // Here you would send the data to your backend
    console.log("Brief submitted:", answers);
  };

  const handleInputChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-grey-6 text-white flex flex-col">
        {/* Header */}
        <header className="p-6 md:p-8">
          <Link href="/" className="text-grey-3 hover:text-white transition-colors text-sm font-mono">
            ← surprise.systems
          </Link>
        </header>

        {/* Success message */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-2xl w-full">
            <div className="font-mono text-grey-3 mb-4">$ brief --submit</div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight">
              <span className="text-yellow">Done.</span> Vi hör av oss.
            </h1>
            <p className="text-grey-3 text-lg leading-relaxed mb-8">
              Tack {answers.name?.split(" ")[0] || ""}. Vi har fått din brief och återkommer inom kort med våra tankar.
            </p>
            <div className="border-t border-grey-5 pt-8 mt-8">
              <p className="text-grey-4 text-sm font-mono">
                // Har du frågor innan dess?<br />
                // <a href="mailto:david@surprisesystems.io" className="text-yellow hover:underline">david@surprisesystems.io</a>
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grey-6 text-white flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-8 flex justify-between items-center">
        <Link href="/" className="text-grey-3 hover:text-white transition-colors text-sm font-mono">
          ← surprise.systems
        </Link>
        <div className="text-grey-4 text-sm font-mono">
          [{currentStep + 1}/{questions.length}]
        </div>
      </header>

      {/* Progress bar */}
      <div className="px-6 md:px-8">
        <div className="h-[2px] bg-grey-5 w-full">
          <div
            className="h-full bg-yellow transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 flex items-center px-6 md:px-8 py-12">
        <div className="max-w-2xl w-full">
          {/* Previous answers (collapsed) */}
          {currentStep > 0 && (
            <div className="mb-8 space-y-2">
              {questions.slice(0, currentStep).map((q, i) => (
                <div key={q.id} className="text-grey-4 text-sm font-mono opacity-60">
                  <span className="text-grey-5">{`>`}</span> {q.prompt.toLowerCase()}
                  <span className="text-grey-3 ml-2">→ {answers[q.id]?.slice(0, 40)}{(answers[q.id]?.length || 0) > 40 ? "..." : ""}</span>
                </div>
              ))}
            </div>
          )}

          {/* Current question */}
          <div className="mb-8">
            <div className="text-xl md:text-2xl font-mono mb-6 min-h-[2em]">
              {typedPrompt}
              {isTyping && (
                <span className={`inline-block w-3 h-6 bg-yellow ml-1 align-middle ${showCursor ? "opacity-100" : "opacity-0"}`} />
              )}
            </div>

            {!isTyping && (
              <div className="animate-fade-in">
                {currentQuestion.type === "text" ? (
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type={currentQuestion.id === "email" ? "email" : "text"}
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={currentQuestion.placeholder}
                    className="w-full bg-transparent border-b-2 border-grey-5 focus:border-yellow
                             text-white text-xl md:text-2xl py-3 outline-none transition-colors
                             placeholder:text-grey-5 font-light"
                    autoFocus
                  />
                ) : (
                  <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={currentQuestion.placeholder}
                    rows={4}
                    className="w-full bg-grey-5/30 border border-grey-5 focus:border-yellow
                             text-white text-lg md:text-xl p-4 outline-none transition-colors
                             placeholder:text-grey-5 font-light resize-none rounded"
                    autoFocus
                  />
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          {!isTyping && (
            <div className="flex items-center justify-between animate-fade-in">
              <div className="text-grey-4 text-sm font-mono">
                {currentQuestion.type === "text" ? (
                  "tryck enter för att fortsätta ↵"
                ) : (
                  "⌘ + enter för att fortsätta"
                )}
              </div>
              <button
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]?.trim()}
                className="px-6 py-3 bg-yellow text-black font-medium text-sm
                         hover:bg-white transition-colors disabled:opacity-30
                         disabled:cursor-not-allowed disabled:hover:bg-yellow"
              >
                {isLastQuestion ? "Skicka brief →" : "Nästa →"}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer hint */}
      <footer className="p-6 md:p-8">
        <p className="text-grey-5 text-xs font-mono">
          // Allt du delar här är konfidentiellt
        </p>
      </footer>
    </div>
  );
}
