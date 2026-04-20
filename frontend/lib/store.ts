import { create } from "zustand";
import { devtools } from "zustand/middleware";

// ─── UI Store ─────────────────────────────────────────────────────────────────
interface UIState {
  // Modal
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;

  // Form submission
  isSubmitting: boolean;
  setSubmitting: (val: boolean) => void;

  submitSuccess: boolean;
  setSubmitSuccess: (val: boolean) => void;

  // Nav
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      // Modal
      isModalOpen: false,
      openModal: () => set({ isModalOpen: true }, false, "openModal"),
      closeModal: () => set({ isModalOpen: false }, false, "closeModal"),

      // Form
      isSubmitting: false,
      setSubmitting: (val) =>
        set({ isSubmitting: val }, false, "setSubmitting"),

      submitSuccess: false,
      setSubmitSuccess: (val) =>
        set({ submitSuccess: val }, false, "setSubmitSuccess"),

      // Nav
      activeSection: "hero",
      setActiveSection: (section) =>
        set({ activeSection: section }, false, "setActiveSection"),
    }),
    { name: "StudioPeauUI" }
  )
);
