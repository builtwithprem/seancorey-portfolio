"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight } from "lucide-react";

type Fields = { name: string; email: string; message: string; honeypot: string };
type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: Fields): FieldErrors {
  const e: FieldErrors = {};
  if (form.name.trim().length < 2)
    e.name = "Please enter your name.";
  if (!emailRe.test(form.email.trim()))
    e.email = "Please enter a valid email address.";
  if (form.message.trim().length < 20)
    e.message = "Please tell me a bit more (at least 20 characters).";
  return e;
}

const inputBase =
  "w-full bg-transparent border-b outline-none font-sans text-[1.15rem] text-[#253631] pb-3 transition-colors duration-200";
const inputNormal = `${inputBase} border-[#253631]/20 focus:border-[#253631]/60`;
const inputError  = `${inputBase} border-red-400/70`;

export function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [form, setForm]         = useState<Fields>({ name: "", email: "", message: "", honeypot: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [sending, setSending]   = useState(false);
  const [sent, setSent]         = useState(false);
  const loadTime = useRef<number>(0);

  // Lock scroll; record load time when modal opens; reset on close
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen) loadTime.current = Date.now();
    if (!isOpen) {
      const t = setTimeout(() => {
        setForm({ name: "", email: "", message: "", honeypot: "" });
        setFieldErrors({});
        setSubmitError("");
        setSent(false);
      }, 400);
      return () => clearTimeout(t);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const set = (field: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(f => ({ ...f, [field]: e.target.value }));
      // Clear that field's error as the user types
      if (field !== "honeypot")
        setFieldErrors(prev => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }

    setSending(true);
    setSubmitError("");
    try {
      const res = await fetch("/.netlify/functions/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:      form.name.trim(),
          email:     form.email.trim(),
          message:   form.message.trim(),
          honeypot:  form.honeypot,
          loadTime:  loadTime.current,
        }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setSubmitError("Something went wrong. Please email sean@seancorey.net directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="contact-modal"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] bg-[#D5E3DE] flex items-center justify-center px-6 py-20"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#253631]/8 hover:bg-[#253631]/15 flex items-center justify-center text-[#253631] transition-colors duration-200"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="w-full max-w-xl">
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.h2
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-[#253631] leading-tight mb-12"
                  >
                    Let&apos;s talk.
                  </motion.h2>

                  <form onSubmit={handleSubmit} noValidate className="space-y-10">

                    {/*
                      Honeypot — positioned off-screen so humans never see it.
                      Bots that auto-fill all inputs will fill this; the server
                      silently discards any submission where it has a value.
                      Do NOT use display:none — many bots detect and skip that.
                    */}
                    <div
                      style={{ position: "absolute", left: "-9999px", opacity: 0 }}
                      aria-hidden="true"
                    >
                      <input
                        type="text"
                        name="bot-field"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.honeypot}
                        onChange={set("honeypot")}
                      />
                    </div>

                    {/* Name */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <label
                        htmlFor="cf-name"
                        className="block text-[10px] uppercase tracking-[0.2em] text-[#253631]/50 font-sans mb-3"
                      >
                        Your Name
                      </label>
                      <input
                        id="cf-name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={set("name")}
                        className={fieldErrors.name ? inputError : inputNormal}
                      />
                      {fieldErrors.name && (
                        <p className="mt-2 text-xs font-sans text-red-500/75">{fieldErrors.name}</p>
                      )}
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <label
                        htmlFor="cf-email"
                        className="block text-[10px] uppercase tracking-[0.2em] text-[#253631]/50 font-sans mb-3"
                      >
                        Email Address
                      </label>
                      <input
                        id="cf-email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={set("email")}
                        className={fieldErrors.email ? inputError : inputNormal}
                      />
                      {fieldErrors.email && (
                        <p className="mt-2 text-xs font-sans text-red-500/75">{fieldErrors.email}</p>
                      )}
                    </motion.div>

                    {/* Message */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <label
                        htmlFor="cf-message"
                        className="block text-[10px] uppercase tracking-[0.2em] text-[#253631]/50 font-sans mb-3"
                      >
                        Tell me about your project
                      </label>
                      <textarea
                        id="cf-message"
                        rows={4}
                        value={form.message}
                        onChange={set("message")}
                        className={`resize-none ${fieldErrors.message ? inputError : inputNormal}`}
                      />
                      {fieldErrors.message && (
                        <p className="mt-2 text-xs font-sans text-red-500/75">{fieldErrors.message}</p>
                      )}
                    </motion.div>

                    {/* Submit */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col gap-4"
                    >
                      <div>
                        <button
                          type="submit"
                          disabled={sending}
                          className="inline-flex items-center gap-2 bg-[#253631] hover:bg-[#253631]/85 disabled:opacity-50 text-white rounded-full px-8 h-12 text-sm font-sans transition-colors duration-300"
                        >
                          {sending ? "Sending…" : "Send message"}
                          {!sending && <ArrowRight size={15} />}
                        </button>
                      </div>
                      {submitError && (
                        <p className="text-sm font-sans text-[#253631]/60">{submitError}</p>
                      )}
                    </motion.div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-[#253631] leading-tight mb-6">
                    Message sent.
                  </h2>
                  <p className="font-sans text-[1.15rem] text-[#253631]/70 leading-relaxed mb-10">
                    Thanks for reaching out. I&apos;ll be in touch soon.
                  </p>
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 bg-[#253631] hover:bg-[#253631]/85 text-white rounded-full px-8 h-12 text-sm font-sans transition-colors duration-300"
                  >
                    Back to site
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
