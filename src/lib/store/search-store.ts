import { create } from "zustand";

interface SearchModalStore {
  isOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  toggleSearchModal: () => void;
}

export const useSearchModalStore = create<SearchModalStore>((set) => ({
  isOpen: false,
  openSearchModal: () => set({ isOpen: true }),
  closeSearchModal: () => set({ isOpen: false }),
  toggleSearchModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));
