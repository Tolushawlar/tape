import { create } from "zustand";

interface CartStore {
  isOpen: boolean;
  openCartSheet: () => void;
  closeCartSheet: () => void;
  toggleCartSheet: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  isOpen: false,
  openCartSheet: () => set({ isOpen: true }),
  closeCartSheet: () => set({ isOpen: false }),
  toggleCartSheet: () => set((state) => ({ isOpen: !state.isOpen })),
}));
