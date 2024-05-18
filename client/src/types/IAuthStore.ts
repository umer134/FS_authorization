import { IUser } from "./user";

export interface IAuthStore {
    user: IUser | null;
    isAuth: boolean;
    isLoading: boolean;
    isLogin: boolean;
    isRegistration: boolean;

    toLogin: () => void;
    toRegistration: () => void;
    login: (email: string, password: string) => Promise<void>;
    registration: (name: string, surname: string, email: string, password: string, date: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}
