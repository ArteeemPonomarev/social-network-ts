import axios from 'axios';
import {UserType} from "../redux/usersReducer";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '9b6aada9-34d3-4135-a32f-7e9aacf37623'
    }
});


//types
export type GetUsersResponseType = {
    error: null | string
    totalCount: number
    items: Array<UserType>
}
export type ResponseType<D = {}> = {
    resultCode: ResultCodes
    messages: Array<string>,
    data: D
}

export enum ResultCodes {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10,
}
