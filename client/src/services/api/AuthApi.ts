import $api from '../../http';
import { AxiosResponse } from 'axios';
import { AuthRespone } from '../../types/authResponse';

export default class AuthApi {
    static async login (email:string, password:string): Promise <AxiosResponse<AuthRespone>>{
        return $api.post<AuthRespone>('/api/login', {email, password})
    }
    static async registration (name:string, surname:string, email:string, password:string, date:string): Promise<AxiosResponse<AuthRespone>>{
        return $api.post<AuthRespone>('/api/registration',{name, surname, email, password, date})
    }
    static async logout (): Promise<void> {
        return $api.post('/api/logout')
    }
}


