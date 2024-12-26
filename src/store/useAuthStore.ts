import { TUser } from '@/types';
import { create } from 'zustand';

type TAuthActions = {
    setUser: (user: TUser | null) => void;
};

type TAuthState = {
    user: TUser | null;
    actions: TAuthActions;
};

const useAuthStore = create<TAuthState>((set) => ({
    user: null,
    actions: {
        setUser: (user: TUser | null) => {
            set({ user });
        },
    },
}));

export const useAuthActions = () => useAuthStore((state) => state.actions);
export const setAuthUser = (user: TUser) => useAuthStore.setState({ user });

export default useAuthStore;
