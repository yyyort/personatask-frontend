import { GetUserType } from '@/model/users.model';
import { SignInApi, SignOutApi } from '@/service/authService';
import { useRouter } from 'next/navigation';
import { create } from 'zustand';

type AuthState = {
    token: string | null;
    user: {
        id: string;
        email: string;
    } | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};


export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    user: null,
    login: async (email, password) => {
        try {
            // make api call
            const res = await SignInApi({ email, password });

            if (!res.ok) {
                throw new Error('Unable to login');
            }

            const data: GetUserType = await res.json();

            set({
                token: "token",
                user: {
                    id: data.id,
                    email: data.email,
                },
            });
        } catch (error: any) {
            console.error(error);
            throw error;
        }

    },
    logout: async () => {
        // make api call
        try {
            const res = await SignOutApi();

            if (!res.ok) {
                throw new Error('Unable to logout');
            }
        } catch (error: any) {
            console.error(error);
            throw error;
        }

        set({
            token: null,
            user: null,
        });
    }
}));
