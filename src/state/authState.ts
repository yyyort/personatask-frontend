import { CreateUserType, GetUserType } from '@/model/users.model';
import { SignInApi, SignOutApi, SignUpApi } from '@/service/authService';
import { create } from 'zustand';

type AuthState = {
    token: string | null;
    user: {
        id: string;
        email: string;
    } | null;
    setToken: (token: string) => void;
    setUser: (user: GetUserType) => void;
};


export const useAuthStore = create<AuthState>((set) => ({
    token: "",
    user: {
        id: "",
        email: "",
    },
    setToken: (token) => set((state) => ({ ...state, token: token })),
    setUser: (user) => set((state) => ({ ...state, user: user })),
}));
