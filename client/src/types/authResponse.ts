import { IUser } from "./user";

export interface AuthRespone {
    accessToken: string,
    refreshTokenToken: string,
    user: IUser
}