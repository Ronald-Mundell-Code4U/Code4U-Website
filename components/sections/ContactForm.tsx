"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import {
  contactSchema,
  projectTypes,
  type ContactFormValues,
} from "@/lib/schema";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-input border border-gray-300 bg-bg-light-card px-4 py-3 text-sm text-text-heading placeholder:text-gray-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-accent/20 dark:bg-bg-dark-card dark:text-text-dark-h dark:placeholder:text-text-dark-b/50";

const labelClass =
  "block text-sm font-semibold text-text-heading dark:text-text-dark-h mb-2";

const errorClass = "mt-1.5 text-xs text-red-600 dark:text-red-400";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "Web Project",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      reset();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setErrorMessage(message);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-card border border-accent/30 bg-accent/5 p-8 text-center"
      >
        <CheckCircle2
          className="mx-auto h-12 w-12 text-accent"
          aria-hidden="true"
        />
        <h3 className="mt-4 text-xl font-bold text-text-heading dark:text-text-dark-h">
          Message sent.
        </h3>
        <p className="mt-2 text-sm text-text-body dark:text-text-dark-b">
          Thanks for reaching out — we&apos;ll reply within 24 hours.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
      aria-label="Contact form"
    >
      {/* Honeypot — hidden from real users; bots tend to fill it */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website (leave blank)</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(
              inputClass,
              errors.name &&
                "border-red-500 focus:border-red-500 focus:ring-red-500/30",
            )}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className={errorClass}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(
              inputClass,
              errors.email &&
                "border-red-500 focus:border-red-500 focus:ring-red-500/30",
            )}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className={errorClass}>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className={labelClass}>
          Project type
        </label>
        <select
          id="projectType"
          aria-invalid={!!errors.projectType}
          className={cn(
            inputClass,
            "appearance-none pr-10 bg-no-repeat",
            errors.projectType &&
              "border-red-500 focus:border-red-500 focus:ring-red-500/30",
          )}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'><path fill='%234CAF50' d='M6 8L1 3h10z'/></svg>\")",
            backgroundPosition: "right 1rem center",
          }}
          {...register("projectType")}
        >
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p className={errorClass}>{errors.projectType.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder="Tell us about your project, timeline, and what you're hoping to accomplish."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(
            inputClass,
            "resize-y min-h-[140px]",
            errors.message &&
              "border-red-500 focus:border-red-500 focus:ring-red-500/30",
          )}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className={errorClass}>
            {errors.message.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-input border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-700 dark:text-red-300"
        >
          <AlertCircle
            className="h-4 w-4 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p>{errorMessage}</p>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="w-full sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
