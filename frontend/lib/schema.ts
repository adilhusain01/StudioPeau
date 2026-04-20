import { z } from "zod";

/**
 * Lead form schema — used by:
 *  - Frontend: BookingModal.tsx, LeadFormSection.tsx (React Hook Form + Zod resolver)
 *  - API route: app/api/lead/route.ts
 */
export const leadFormSchema = z.object({
  name: z
    .string({ required_error: "Please enter your name." })
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name must be under 80 characters.")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters."),

  phone: z
    .string({ required_error: "Please enter your mobile number." })
    .trim()
    .regex(
      /^(\+91[\-\s]?)?[6-9]\d{9}$/,
      "Please enter a valid 10-digit Indian mobile number.",
    ),

  package: z
    .enum(["Petal", "Bloom", "Lumiere", "Not sure yet"])
    .optional()
    .default("Not sure yet"),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

/**
 * API response shape
 */
export const apiSuccessSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  leadId: z.string().optional(),
});

export type ApiSuccess = z.infer<typeof apiSuccessSchema>;
