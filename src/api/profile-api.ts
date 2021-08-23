import {ProfileType} from "../redux/profile-reducer";
import {ProfileFormDataType} from "../components/Profile/ProfileInfo/ProfileDataForm";
import {instance, ResponseType} from "./api";

export const profileAPI = {
    getUserProfile(userId: number) {
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