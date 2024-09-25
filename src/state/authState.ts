import { RefreshTokenApi } from '@/service/authService';
import { create } from 'zustand';

type AuthState = {
    token: string | null;
    user: {
        id: string;
        email: string;
    } | null;
    refreshToken: () => void;
};


export const useAuthStore = create<AuthState>((set) => ({
    token: "",
    user: {
        id: "",
        email: "",
    },
    refreshToken: async () => {
        try {
            const res = await RefreshTokenApi() 

            set((state) => ({ ...state, token: res.token }));

            console.log(res);
            set((state) => ({
                ...state,
                user: res.user,
                token: res.token
            }));
        } catch (error: unknown) {
            console.error(error);
            throw error;
        }
    },
}));
