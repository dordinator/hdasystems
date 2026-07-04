"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { chatbot } from "@/lib/site";
import Reveal from "./Reveal";

type Msg = { role: "bot" | "user"; text: string };

export default function ChatbotDemo() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: chatbot.greeting },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [usedSuggestions, setUsedSuggestions] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const answerFor = (q: string) => {
    const hit = chatbot.suggestions.find(
      (s) => s.q.toLowerCase() === q.toLowerCase()
    );
    if (hit) return hit.a;
    const text = q.toLowerCase();
    if (text.includes("cost") || text.includes("price") || text.includes("£"))
      return chatbot.suggestions[0].a;
    if (text.includes("fast") || text.includes("long") || text.includes("time"))
      return chatbot.suggestions[1].a;
    if (text.includes("own")) return chatbot.suggestions[2].a;
    return "Great question — the short answer is yes, we can help. Book a free call and we'll go through it properly.";
  };

  const send = (q: string) => {
    if (!q.trim()) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: "bot", text: answerFor(q) }]);
    }, 900);
    timers.current.push(t);
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
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <span className="eyebrow">{chatbot.eyebrow}</span>
              <h2 className="display mt-4 text-[clamp(2.2rem,5.5vw,4rem)] leading-[1] text-ink">
                Meet your{" "}
                <span className="text-gradient">24/7 assistant.</span>
              </h2>
              <p className="mt-5 max-w-md text-lg text-ink-muted">{chatbot.sub}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {["Answers instantly", "Captures leads", "Never sleeps"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass flex h-[520px] flex-col overflow-hidden">
              {/* header */}
              <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-4">
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-teal to-accent-cyan text-[#04110d]">
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-base-800 bg-emerald-400" />
                  ✦
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink">
                    HDA Solutions Assistant
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-emerald-400">
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
                          ? "rounded-br-md bg-accent-teal text-[#04110d]"
                          : "rounded-bl-md border border-white/[0.08] bg-white/[0.04] text-ink"
                      }`}
                    >
                      {m.text}
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
                      <div className="flex gap-1 rounded-2xl rounded-bl-md border border-white/[0.08] bg-white/[0.04] px-4 py-3">
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
                      className="rounded-full border border-accent-teal/30 bg-accent-teal/[0.06] px-3 py-1.5 text-xs text-accent-teal transition-colors hover:bg-accent-teal/[0.12]"
                    >
                      {s.q}
                    </button>
                  ))}
                </div>
              )}

              {/* input */}
              <form
                onSubmit={onSubmit}
                className="flex items-center gap-2 border-t border-white/[0.07] p-3"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything…"
                  className="flex-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-accent-teal/50"
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-accent-teal text-[#04110d] transition-transform hover:scale-105"
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
