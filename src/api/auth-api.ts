import {instance, ResponseType} from "./api";

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