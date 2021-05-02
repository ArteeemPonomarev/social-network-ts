import axios from 'axios';


const instance = axios.create({
    withCredentials: true,
    baseURL:  'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '9b6aada9-34d3-4135-a32f-7e9aacf37623'
    }
});

export const usersAPI = {
    getUsers (currentPage: number = 1, pageSize: number = 10)  {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    }
}

