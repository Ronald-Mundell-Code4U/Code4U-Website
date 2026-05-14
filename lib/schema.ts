import { z } from "zod";

export const projectTypes = [
  "Web Project",
  "Mobile App",
  "AI Integration",
  "Consulting",
  "Other",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(200, "Email is too long"),
  projectType: z.enum(projectTypes, {
    errorMap: () => ({ message: "Please choose a project type" }),
  }),
  message: z
    .string()
    .trim()
    .min(20, "Message must be at least 20 characters")
    .max(5000, "Message is too long"),
  // Honeypot — must remain empty. Real users never see this field.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
