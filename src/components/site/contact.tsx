"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { Icon } from "@/components/icons/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { SplitHeading } from "./split-heading";

const kinds = ["Audio or learning app", "Worship and reminders", "Community or creator platform", "Something else"];

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const field =
  "h-12 rounded-xl border-white/40 bg-night px-4 text-base text-on-night placeholder:text-on-night-soft/80 focus-visible:border-brass-bright focus-visible:ring-0 aria-invalid:border-error-night aria-invalid:ring-0 md:text-base";

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  if (!name) errors.name = "Enter your name.";
  if (!email) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = "Enter a full email address, like amina@example.com.";
  if (message.length < 20) errors.message = "Write at least 20 characters about the idea.";
  return errors;
}

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [kind, setKind] = useState(kinds[0]);
  const [status, setStatus] = useState<"idle" | "opened">("idle");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next = validate(data);
    flushSync(() => setErrors(next));
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const subject = `New project: ${kind}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Building: ${kind}`,
      "",
      String(data.get("message")),
    ].join("\n");
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // Opens Gmail's compose window in a new tab; if the browser blocks the tab, open it here instead.
    const tab = window.open(gmail, "_blank");
    if (tab) tab.opener = null;
    else window.location.href = gmail;
    setStatus("opened");
  }

  // Clear a field's message as soon as the person starts correcting it.
  function clearError(e: FormEvent<HTMLFormElement>) {
    const name = (e.target as HTMLInputElement).name as keyof Errors;
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    setTimeout(() => setCopyState("idle"), 2400);
  }

  return (
    <section
      id="contact"
      data-nav-tone="dark"
      aria-labelledby="contact-title"
      className="on-night bg-night text-on-night"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-8 md:py-32 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SplitHeading
            id="contact-title"
            text="Tell us about the app you want to build."
            className="font-display text-4xl leading-[1.08] md:text-5xl"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-base leading-7 text-on-night-soft md:text-lg md:leading-8">
              One email is enough to start. No paperwork and no sales call. Tell us who the app is for and what it
              should never do.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-lg font-semibold text-on-night underline decoration-white/25 decoration-2 underline-offset-8 transition-colors duration-200 hover:decoration-brass-bright"
              >
                <Icon name="letter" className="size-5 text-brass-bright [&_path]:stroke-2" />
                {site.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 px-3 text-sm font-semibold text-on-night-soft transition-[color,border-color,scale] duration-150 ease-out hover:border-white/30 hover:text-on-night active:scale-[0.97]"
              >
                <span className="relative grid size-4 place-items-center">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={copyState === "copied" ? "done" : "copy"}
                      className="grid place-items-center"
                      initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                      transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                    >
                      <Icon
                        name={copyState === "copied" ? "check-circle" : "copy"}
                        className="size-4 [&_path]:stroke-2"
                      />
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span aria-live="polite">
                  {copyState === "copied"
                    ? "Copied"
                    : copyState === "failed"
                      ? "Select the address to copy it"
                      : "Copy email"}
                </span>
              </button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-on-night-soft">
              <Icon name="map-point" className="size-4" />
              {site.city}, {site.country} · GMT+5
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <form
            noValidate
            onSubmit={onSubmit}
            onInput={clearError}
            className="rounded-3xl bg-night-2 p-6 ring-1 ring-white/10 md:p-10"
          >
            <p className="mb-6 text-sm text-on-night-soft">All fields are required.</p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-on-night">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={field}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-error-night">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-on-night">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={field}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-error-night">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <fieldset className="mt-8">
              <legend className="text-sm font-semibold text-on-night">What are you building?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {kinds.map((k) => (
                  <label
                    key={k}
                    className={cn(
                      "relative inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-semibold transition-[background-color,border-color,color] duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brass-bright",
                      kind === k
                        ? "border-brass-bright bg-brass-bright text-night"
                        : "border-white/30 text-on-night-soft hover:border-white/50 hover:text-on-night",
                    )}
                  >
                    <input
                      type="radio"
                      name="kind"
                      value={k}
                      checked={kind === k}
                      onChange={() => setKind(k)}
                      className="sr-only"
                    />
                    {k}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 space-y-2">
              <Label htmlFor="message" className="text-sm font-semibold text-on-night">
                The idea
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={5}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-hint message-error" : "message-hint"}
                className={cn(field, "h-auto min-h-36 py-3")}
              />
              <p id="message-hint" className="text-sm text-on-night-soft">
                Who it is for, what it should do and what it should never do. At least 20 characters.
              </p>
              {errors.message && (
                <p id="message-error" className="text-sm text-error-night">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brass-bright py-3.5 pr-5 pl-6 text-base font-semibold whitespace-nowrap text-night transition-[background-color,scale] duration-150 ease-out hover:bg-brass-glow active:scale-[0.97]"
              >
                Compose the email
                <Icon
                  name="arrow-right"
                  className="size-5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 [&_path]:stroke-2"
                />
              </button>
              <p className="text-sm text-on-night-soft">Opens Gmail in a new tab with everything filled in.</p>
            </div>

            <div role="status">
              <AnimatePresence>
                {status === "opened" && (
                  <motion.p
                    initial={{ opacity: 0, transform: "translateY(6px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="mt-6 flex items-start gap-2 rounded-2xl bg-white/5 p-4 text-sm leading-6 text-on-night"
                  >
                    <Icon name="check-circle" className="mt-0.5 size-4 shrink-0 text-qalbify-bright" />
                    Gmail is open in a new tab with your message ready to send. If it did not open, write to{" "}
                    {site.email}.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
