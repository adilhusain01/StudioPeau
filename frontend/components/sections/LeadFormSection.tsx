"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useInView } from "framer-motion";
import { leadFormSchema, type LeadFormData } from "@/lib/schema";
import { useUIStore } from "@/lib/store";

// ─── Component ────────────────────────────────────────────────────────────────
export function LeadFormSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const {
    isSubmitting: storeSubmitting,
    setSubmitting,
    setSubmitSuccess,
    submitSuccess,
  } = useUIStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  const onSubmit = async (data: LeadFormData) => {
    try {
      setSubmitting(true);
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSubmitSuccess(true);
      reset();
    } catch (_err) {
      // Surface error to user
      alert("Something went wrong. Please WhatsApp us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-pad px-6 md:px-16 relative overflow-hidden"
      style={{ background: "var(--ink-soft)" }}
      aria-label="Book a Consultation"
    >
      {/* ── Background typography watermark ── */}
      <div
        className="absolute -right-12 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-cormorant font-light opacity-[0.04]"
          style={{
            fontSize: "clamp(8rem, 20vw, 22rem)",
            color: "var(--gold)",
            lineHeight: 1,
          }}
        >
          Peau
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ── Left: copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-tag mb-4">Begin Your Consultation</p>
            <h2 className="display-lg text-[var(--stone)] mb-6">
              Your lips are
              <br />
              <em className="italic" style={{ color: "var(--rose)" }}>
                waiting.
              </em>
            </h2>

            <span className="gold-line mb-6" />

            <p className="font-dm-sans text-[var(--ash-light)] text-sm leading-relaxed mb-10 max-w-md">
              Leave your details and our team will reach out within 2 hours
              (Mon–Sat, 10am–7pm). Or WhatsApp us directly for an instant
              response.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-4">
              {[
                {
                  label: "Studio",
                  value: "B-12, Vasant Vihar, New Delhi — 110057",
                },
                { label: "Phone", value: "+91 99999 99999" },
                { label: "Email", value: "hello@studiopeau.in" },
                { label: "Hours", value: "Mon–Fri 10am–7pm · Sat 10am–5pm" },
              ].map((item) => (
                <div key={item.label} className="flex gap-6 items-baseline">
                  <span className="label-tag w-14 shrink-0">{item.label}</span>
                  <span className="font-dm-sans text-sm text-[var(--ash-light)]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-start gap-4 p-10"
                style={{ border: "1px solid rgba(201,169,110,0.3)" }}
              >
                <span className="gold-line" />
                <h3 className="font-cormorant text-3xl text-[var(--stone)]">
                  Thank you.
                </h3>
                <p className="font-dm-sans text-sm text-[var(--ash-light)] leading-relaxed">
                  We have received your enquiry and will contact you within 2
                  hours. Meanwhile, follow us on Instagram for inspiration.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="label-tag mt-2 underline underline-offset-4"
                  style={{ color: "var(--gold)" }}
                >
                  Submit another enquiry
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
                noValidate
                aria-label="Consultation request form"
              >
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="label-tag"
                    style={{ color: "var(--ash-light)" }}
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    {...register("name")}
                    className="w-full px-0 py-3 font-dm-sans text-sm text-[var(--stone)] placeholder:text-[var(--ash)] bg-transparent border-b outline-none transition-colors duration-300"
                    style={{ borderColor: "rgba(201,169,110,0.25)" }}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      role="alert"
                      className="font-dm-sans text-xs"
                      style={{ color: "var(--rose-deep)" }}
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="label-tag"
                    style={{ color: "var(--ash-light)" }}
                  >
                    Mobile Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 00000 00000"
                    autoComplete="tel"
                    {...register("phone")}
                    className="w-full px-0 py-3 font-dm-sans text-sm text-[var(--stone)] placeholder:text-[var(--ash)] bg-transparent border-b outline-none transition-colors duration-300"
                    style={{ borderColor: "rgba(201,169,110,0.25)" }}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p
                      id="phone-error"
                      role="alert"
                      className="font-dm-sans text-xs"
                      style={{ color: "var(--rose-deep)" }}
                    >
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Service selector */}
                <div className="flex flex-col gap-2">
                  <label
                    className="label-tag"
                    style={{ color: "var(--ash-light)" }}
                  >
                    Interested Package
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Petal", "Bloom", "Lumiere", "Not sure yet"].map(
                      (pkg) => (
                        <label
                          key={pkg}
                          className="flex items-center gap-2 cursor-none"
                        >
                          <input
                            type="radio"
                            value={pkg}
                            {...register("package")}
                            className="sr-only"
                          />
                          <span
                            className="font-dm-sans text-xs px-4 py-2 transition-all duration-200 select-none"
                            style={{
                              border: "1px solid rgba(201,169,110,0.25)",
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
                  disabled={storeSubmitting}
                  data-cursor="cta"
                  whileHover={{
                    backgroundColor: "var(--gold-light)",
                    transition: { duration: 0.25 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 w-full py-4 font-dm-sans text-sm font-medium tracking-[0.15em] uppercase disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                  style={{ background: "var(--gold)", color: "var(--ink)" }}
                >
                  {storeSubmitting ? "Sending..." : "Request Consultation"}
                </motion.button>

                <p className="font-dm-sans text-xs text-center text-[var(--ash)]">
                  We never share your details. Unsubscribe at any time.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
