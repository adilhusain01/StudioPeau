"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useUIStore } from "@/lib/store";
import { leadFormSchema, type LeadFormData } from "@/lib/schema";

export function BookingModal() {
  const {
    isModalOpen,
    closeModal,
    isSubmitting,
    setSubmitting,
    submitSuccess,
    setSubmitSuccess,
  } = useUIStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeModal();
      reset();
      setSubmitSuccess(false);
    }
  };

  const onSubmit = async (data: LeadFormData) => {
    try {
      setSubmitting(true);
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed");
      setSubmitSuccess(true);
      reset();
    } catch {
      alert("Something went wrong. Please WhatsApp us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-lg border-0 p-0 overflow-hidden"
        style={{ background: "var(--ink)", color: "var(--stone)" }}
      >
        {/* Gold top bar */}
        <div className="h-px w-full" style={{ background: "var(--gold)" }} />

        <div className="p-8 md:p-10">
          <DialogHeader className="mb-8 text-left">
            <p className="label-tag mb-3">Studio Peau · Delhi</p>
            <DialogTitle
              className="font-cormorant font-light"
              style={{
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                color: "var(--stone)",
                lineHeight: 1.05,
              }}
            >
              {submitSuccess
                ? "We will be in touch."
                : "Begin your consultation."}
            </DialogTitle>
            <DialogDescription
              className="font-dm-sans text-sm mt-2 leading-relaxed"
              style={{ color: "var(--ash-light)" }}
            >
              {submitSuccess
                ? "Thank you for reaching out. Our team will contact you within 2 hours during studio hours."
                : "Share your details and our lead technician will reach you within 2 hours (Mon–Sat, 10am–7pm)."}
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {submitSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                <span className="gold-line" />
                <p className="font-dm-sans text-sm text-[var(--ash-light)]">
                  Meanwhile, explore our work on Instagram or WhatsApp us for
                  instant assistance.
                </p>
                <button
                  onClick={() => {
                    setSubmitSuccess(false);
                    reset();
                  }}
                  className="label-tag underline underline-offset-4"
                  style={{ color: "var(--gold)", textAlign: "left" }}
                >
                  Submit another enquiry
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
                noValidate
                aria-label="Consultation booking form"
              >
                {/* Name field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="modal-name"
                    className="label-tag"
                    style={{ color: "var(--ash-light)" }}
                  >
                    Full Name *
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    placeholder="Your full name"
                    autoComplete="name"
                    {...register("name")}
                    className="w-full px-0 py-3 font-dm-sans text-sm text-[var(--stone)] placeholder:text-[var(--ash)] bg-transparent border-b outline-none"
                    style={{ borderColor: "rgba(201,169,110,0.25)" }}
                    aria-invalid={!!errors.name}
                    aria-describedby={
                      errors.name ? "modal-name-error" : undefined
                    }
                  />
                  {errors.name && (
                    <p
                      id="modal-name-error"
                      role="alert"
                      className="font-dm-sans text-xs"
                      style={{ color: "var(--rose-deep)" }}
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="modal-phone"
                    className="label-tag"
                    style={{ color: "var(--ash-light)" }}
                  >
                    Mobile Number *
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    placeholder="+91 00000 00000"
                    autoComplete="tel"
                    {...register("phone")}
                    className="w-full px-0 py-3 font-dm-sans text-sm text-[var(--stone)] placeholder:text-[var(--ash)] bg-transparent border-b outline-none"
                    style={{ borderColor: "rgba(201,169,110,0.25)" }}
                    aria-invalid={!!errors.phone}
                    aria-describedby={
                      errors.phone ? "modal-phone-error" : undefined
                    }
                  />
                  {errors.phone && (
                    <p
                      id="modal-phone-error"
                      role="alert"
                      className="font-dm-sans text-xs"
                      style={{ color: "var(--rose-deep)" }}
                    >
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Package selector */}
                <div className="flex flex-col gap-3">
                  <label
                    className="label-tag"
                    style={{ color: "var(--ash-light)" }}
                  >
                    Package Interest
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Petal", "Bloom", "Lumiere", "Not sure yet"].map(
                      (pkg) => (
                        <label key={pkg} className="group cursor-none">
                          <input
                            type="radio"
                            value={pkg}
                            defaultChecked={pkg === "Not sure yet"}
                            {...register("package")}
                            className="sr-only peer"
                          />
                          <span
                            className="inline-block font-dm-sans text-xs px-3 py-2 border transition-all duration-200 peer-checked:border-[var(--gold)] peer-checked:text-[var(--gold)] peer-checked:bg-[rgba(201,169,110,0.08)]"
                            style={{
                              borderColor: "rgba(201,169,110,0.2)",
                              color: "var(--ash-light)",
                            }}
                          >
                            {pkg}
                          </span>
                        </label>
                      ),
                    )}
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  data-cursor="cta"
                  whileHover={{ backgroundColor: "var(--gold-light)" }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 w-full py-4 font-dm-sans text-sm font-medium tracking-[0.15em] uppercase disabled:opacity-50 transition-colors duration-300"
                  style={{ background: "var(--gold)", color: "var(--ink)" }}
                >
                  {isSubmitting ? "Sending..." : "Request Consultation"}
                </motion.button>

                <p className="font-dm-sans text-xs text-center text-[var(--ash)]">
                  Your data is never shared. View our privacy policy.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
