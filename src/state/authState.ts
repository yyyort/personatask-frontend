import { GetUserType } from "@/model/users.model";
import { RefreshTokenApi } from "@/service/authService";
import { create } from "zustand";

type AuthState = {
  auth: {
    token: string;
    user: {
      id: string;
      email: string;
    };
  };
  // eslint-disable-next-line no-unused-vars
  setAuth: (data: { token: string; user: GetUserType }) => void;
  refreshToken: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  auth: {
    token: "",
    user: {
      id: "",
      email: "",
    },
  },
  setAuth: (data) => {
    set((state) => {
      return {
        ...state,
        auth: {
          token: data.token,
          user: {
            id: data.user.id,
            email: data.user.email,
          },
        },
      };
    });
  },
  refreshToken: async () => {
    try {
      const res = await RefreshTokenApi();

      set((state) => {
        return {
          ...state,
          auth: {
            token: res.token,
            user: {
              id: res.user.id,
              email: res.user.email,
            },
          },
        };
      });
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  },
}));
