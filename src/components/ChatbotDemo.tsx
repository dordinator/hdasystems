"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND, CAL_URL, chatbot } from "@/lib/site";
import Reveal from "./Reveal";

type Msg = { role: "bot" | "user"; text: string };

const FALLBACK_REPLY =
  "Sorry — I'm having a little trouble right now. The quickest way to get answers is a free 30-minute call: " +
  CAL_URL;

// Parse light Markdown emphasis (**bold**, *italic*) into React nodes. This is a
// safety net — the model is told to reply in plain text, but if it slips we
// render real emphasis instead of showing literal asterisks.
function renderEmphasis(text: string, keyPrefix: string) {
  const nodes: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*|__([^_]+)__/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-b${i}`}>{match[1]}</strong>);
    } else if (match[3] !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-b${i}`}>{match[3]}</strong>);
    } else {
      nodes.push(<em key={`${keyPrefix}-i${i}`}>{match[2]}</em>);
    }
    last = re.lastIndex;
    i++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

// Render message text: turn URLs into tidy clickable links, and render any
// stray Markdown emphasis as real bold/italic rather than raw asterisks.
function renderText(text: string) {
  return text.split(/(https?:\/\/[^\s]+)/g).map((part, i) => {
    if (part.startsWith("http")) {
      const label =
        part === CAL_URL || part.includes("leadconnectorhq")
          ? "Book your free call →"
          : part;
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-2 hover:opacity-80"
        >
          {label}
        </a>
      );
    }
    return <span key={i}>{renderEmphasis(part, `p${i}`)}</span>;
  });
}

export default function ChatbotDemo() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: chatbot.greeting },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [usedSuggestions, setUsedSuggestions] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bootstrapped = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (!bootstrapped.current) {
      bootstrapped.current = true;
      el.scrollTop = el.scrollHeight;
      return;
    }

    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = async (q: string) => {
    const text = q.trim();
    if (!text || typing) return;

    const history: Msg[] = [...messages, { role: "user", text }];
    setMessages(history);
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({
            role: m.role === "user" ? "user" : "assistant",
            text: m.text,
          })),
        }),
      });
      const data = await res.json();
      const reply =
        typeof data?.reply === "string" && data.reply.trim()
          ? data.reply
          : FALLBACK_REPLY;
      setMessages((m) => [...m, { role: "bot", text: reply }]);
    } catch {
      setMessages((m) => [...m, { role: "bot", text: FALLBACK_REPLY }]);
    } finally {
      setTyping(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
    setInput("");
  };

  const remaining = chatbot.suggestions.filter(
    (s) => !usedSuggestions.includes(s.q)
  );

  return (
    <section id="demo" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <span className="eyebrow">{chatbot.eyebrow}</span>
              <h2 className="display mt-4 text-[clamp(2.2rem,5.5vw,4rem)] leading-[1] text-ink">
                {chatbot.heading}
              </h2>
              <p className="mt-5 max-w-md text-lg text-ink-muted">{chatbot.sub}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {["Answers instantly", "Captures leads", "Never sleeps"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line bg-ink/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
              <div className="mt-8">
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost !px-6 !py-3 !text-sm"
                >
                  Book a call
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass flex h-[min(520px,calc(100svh-12rem))] min-h-[420px] flex-col overflow-hidden sm:h-[520px] sm:min-h-0">
              {/* header */}
              <div className="flex items-center gap-3 border-b border-line px-5 py-4">
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-terra to-accent-clay text-[#fbf5ec]">
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-base-800 bg-accent-sage" />
                  ✦
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink">
                    {BRAND} Assistant
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-sage">
                    Online
                  </div>
                </div>
              </div>

              {/* messages */}
              <div
                ref={scrollRef}
                className="flex-1 space-y-3 overflow-y-auto px-5 py-5"
              >
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "rounded-br-md bg-accent-terra text-[#fbf5ec]"
                          : "rounded-bl-md border border-line bg-ink/[0.03] text-ink"
                      }`}
                    >
                      {renderText(m.text)}
                    </div>
                  </motion.div>
                ))}

                <AnimatePresence>
                  {typing && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex gap-1 rounded-2xl rounded-bl-md border border-line bg-ink/[0.03] px-4 py-3">
                        {[0, 1, 2].map((d) => (
                          <span
                            key={d}
                            className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted"
                            style={{ animationDelay: `${d * 0.15}s` }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* suggestions */}
              {remaining.length > 0 && (
                <div className="flex flex-wrap gap-2 px-5 pb-3">
                  {remaining.slice(0, 2).map((s) => (
                    <button
                      key={s.q}
                      onClick={() => {
                        setUsedSuggestions((u) => [...u, s.q]);
                        send(s.q);
                      }}
                      className="rounded-full border border-accent-terra/30 bg-accent-terra/[0.07] px-3 py-1.5 text-xs text-accent-terra transition-colors hover:bg-accent-terra/[0.13]"
                    >
                      {s.q}
                    </button>
                  ))}
                </div>
              )}

              {/* input */}
              <form
                onSubmit={onSubmit}
                className="flex items-center gap-2 border-t border-line p-3"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything…"
                  className="flex-1 rounded-full border border-line bg-ink/[0.02] px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-accent-terra/50"
                />
                <button
                  type="submit"
                  disabled={typing || !input.trim()}
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-accent-terra text-[#fbf5ec] transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                  aria-label="Send"
                >
                  ↑
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
