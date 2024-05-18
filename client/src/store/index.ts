import {create} from 'zustand'
import AuthApi from '../services/api/AuthApi';
import axios from 'axios';
import { API_URL } from '../http';
import { AuthRespone } from '../types/authResponse';
import { IAuthStore } from '../types/IAuthStore';


export const useAuthStore = create<IAuthStore>((set) => ({
    user: null,
    isAuth: false,
    isLoading: false,
    isLogin: true,
    isRegistration: false,
    
    toLogin: () => {
        set((state) => ({
            ...state,
            isLogin: true,
            isRegistration: false
        }))
    },
    toRegistration: () => {
        set((state) => ({
            ...state,
            isLogin: false,
            isRegistration: true
        }))
    },

    login: async (email: string, password: string) => {
        try {
            const response = await AuthApi.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            set((state) => ({
                ...state,
                isAuth: true,
                user: response.data.user,
                isLogin: false
            }));
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    },
    registration: async (name: string, surname: string, email: string, password: string, date: string) => {
        try {
            const response = await AuthApi.registration(name, surname, email, password, date);
            localStorage.setItem('token', response.data.accessToken);
            
            set((state) => ({
                ...state,
                isAuth: true,
                user: response.data.user,
                isRegistration: false,
                isLogin: false
            }));
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    },
    logout: async () => {
        try {
            await AuthApi.logout();
            localStorage.removeItem('token');
            set((state) => ({
                ...state,
                isAuth: false,
                user: null,
                isLogin:true,
                isRegistration:false
            }));
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    },
    checkAuth: async () => {
        set((state) => ({ ...state, isLoading: true }));
        try {
            const response = await axios.get<AuthRespone>(`${API_URL}/api/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            set((state) => ({
                ...state,
                isAuth: true,
                user: response.data.user,
                isLogin: false,
                isRegistration: false
            }));
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            set((state) => ({ ...state, isLoading: false }));
        }
    },
}));