import { create } from "zustand";
import { Service, Stylist, Booking, User } from "../types";
import { mockUser } from "../data/mockData";

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  booking: Booking;
  setBooking: (booking: Partial<Booking>) => void;
  resetBooking: () => void;
  currentBookingStep: number;
  setCurrentBookingStep: (step: number) => void;
  savedArticleIds: string[];
  toggleSaveArticle: (id: string) => void;
  favoriteServiceIds: string[];
  toggleFavoriteService: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: mockUser,
  setUser: (user) => set({ user }),
  isLoggedIn: true,
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  booking: {
    id: Date.now().toString(),
    services: [],
  },
  setBooking: (partialBooking) =>
    set((state) => ({ booking: { ...state.booking, ...partialBooking } })),
  resetBooking: () =>
    set({
      booking: {
        id: Date.now().toString(),
        services: [],
      },
      currentBookingStep: 1,
    }),
  currentBookingStep: 1,
  setCurrentBookingStep: (step) => set({ currentBookingStep: step }),
  savedArticleIds: ["ar-01", "ar-04"],
  toggleSaveArticle: (id) =>
    set((state) => ({
      savedArticleIds: state.savedArticleIds.includes(id)
        ? state.savedArticleIds.filter((x) => x !== id)
        : [...state.savedArticleIds, id],
    })),
  favoriteServiceIds: ["cut-female", "color"],
  toggleFavoriteService: (id) =>
    set((state) => ({
      favoriteServiceIds: state.favoriteServiceIds.includes(id)
        ? state.favoriteServiceIds.filter((x) => x !== id)
        : [...state.favoriteServiceIds, id],
    })),
}));
