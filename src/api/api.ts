import axios from 'axios';
import {ProfileFormDataType} from "../components/Profile/ProfileInfo/ProfileDataForm";
import {UserType} from "../redux/usersReducer";
import {ProfileType} from "../redux/profile-reducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '9b6aada9-34d3-4135-a32f-7e9aacf37623'
    }
});


export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`, {})
            .then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`)
            .then(response => response.data)
    }
}

export const profileAPI = {
    getUserProfile(userId: string) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => response.data)
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status})
            .then(response => response.data)
    },
    savePhoto(file: File) {
        const formData = new FormData();
        formData.append("image", file)
        return instance.put<ResponseType<ProfileType>>(`profile/photo`, formData)
            .then(response => response.data)
    },
    saveProfile(formData: ProfileFormDataType) {
        return instance.put<ResponseType>(`profile`, formData)
            .then(response => response.data)
    }
}

export const authApi = {
    authMe() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>(`auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: null | string = null) {
        return instance.post<ResponseType<{ userId: number }>>(`auth/login`, {password, email, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`)
            .then(response => response.data)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<{ url: string }>(`security/get-captcha-url`)
            .then(response => response.data)
    }
}

//types
type GetUsersResponseType = {
    error: null | string
    totalCount: number
    items: Array<UserType>
}
type ResponseType<D = {}> = {
    resultCode: ResultCodes
    messages: Array<string>,
    data: D
}

export enum ResultCodes {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10,
}
