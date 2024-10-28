import { create } from "zustand";

interface CartStore {
  isOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
  toggelSheet: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  isOpen: false,
  openSheet: () => set({ isOpen: true }),
  closeSheet: () => set({ isOpen: false }),
  toggelSheet: () => set((state) => ({ isOpen: !state.isOpen })),
}));
