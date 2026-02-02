import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  clearState: () => {
    set({ accessToken: null, user: null, loading: false });
  },

  setAccessToken: (accessToken) => {
    set({ accessToken });
  },

  signUp: async (username, password, email, firstName, lastName) => {
    try {
      set({ loading: true });
      // call api
      await authService.signUp(username, password, email, firstName, lastName);
      toast.success("Sign up successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign up");
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (username, password) => {
    try {
      set({ loading: true });
      const { accessToken } = await authService.signIn(username, password);
      get().setAccessToken(accessToken);
      await get().fetchMe();
      toast.success("Sign in successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign in");
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      get().clearState();
      await authService.signOut();
      toast.success("Sign out successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign out");
    }
  },

  fetchMe: async () => {
    try {
      set({ loading: true });
      const user = await authService.fetchMe();
      set({ user });
    } catch (error) {
      console.error(error);
      set({ user: null, accessToken: null });
      toast.error("Failed to fetch profile user");
    } finally {
      set({ loading: false });
    }
  },

  refresh: async () => {
    try {
      set({ loading: true });
      const { user, fetchMe } = get();
      const accessToken = await authService.refresh();
      get().setAccessToken(accessToken);

      if (!user) {
        await fetchMe();
      }
    } catch (error) {
      console.error(error);
      toast.error("Access token is expired...");
      get().clearState();
    } finally {
      set({ loading: false });
    }
  },
}));
