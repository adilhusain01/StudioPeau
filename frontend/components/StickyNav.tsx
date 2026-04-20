"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/lib/store";

export function StickyNav() {
  const [isVisible, setIsVisible] = useState(false);
  const openModal = useUIStore((s) => s.openModal);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";
  const whatsappMessage = encodeURIComponent(
    "Hi Studio Peau! I'd like to know more about lip blushing services in Delhi."
  );
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.6);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center"
          style={{
            background: "var(--ink)",
            borderTop: "1px solid rgba(201,169,110,0.25)",
            backdropFilter: "blur(12px)",
          }}
          role="navigation"
          aria-label="Quick actions"
        >
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6 md:px-16 py-4">
            {/* Brand */}
            <p
              className="font-cormorant text-lg text-[var(--stone)] hidden md:block"
            >
              Studio Peau
            </p>

            {/* Right actions */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* WhatsApp */}
              <motion.a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-5 py-3 font-dm-sans text-sm font-medium tracking-[0.1em] uppercase flex-1 md:flex-none justify-center transition-colors duration-300"
                style={{
                  background: "rgba(37,211,102,0.12)",
                  color: "#25D366",
                  border: "1px solid rgba(37,211,102,0.3)",
                }}
              >
                <WhatsAppIcon />
                <span className="hidden sm:inline">WhatsApp</span>
                <span className="sm:hidden">Chat</span>
              </motion.a>

              {/* Book Now */}
              <motion.button
                onClick={openModal}
                data-cursor="cta"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 font-dm-sans text-sm font-medium tracking-[0.1em] uppercase flex-1 md:flex-none justify-center transition-colors duration-300"
                style={{ background: "var(--gold)", color: "var(--ink)" }}
              >
                Book Now
              </motion.button>

              {/* Phone */}
              <motion.a
                href="tel:+919999999999"
                data-cursor="hover"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden lg:flex items-center gap-2 px-5 py-3 font-dm-sans text-sm tracking-wider uppercase transition-colors duration-300"
                style={{
                  border: "1px solid rgba(201,169,110,0.3)",
                  color: "var(--ash-light)",
                }}
              >
                <PhoneIcon />
                Call Us
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function WhatsAppIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.18 2 2 0 012.08.01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}
