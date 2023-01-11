import axios, {AxiosResponse} from 'axios';
import store from "@/store";
import router from "@/router";

axios.defaults.withCredentials = true;

const url = process.env.VUE_APP_API_URL;

const http = axios.create({
    baseURL: url,
    headers: {
        'Accept': 'application/json'
    }
});

http.interceptors.request.use((config) => {
    const token = store.state.token;

    if (token) {
        config.headers!.Authorization = `Bearer ${token}`
    }

    return config
}, (err) => {
    return Promise.reject(err)
})

http.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response.status === 401) {
        router.push({name: 'login'});
    }

    return Promise.reject(error)
})


export const httpGet = async (url: string, params?): Promise<AxiosResponse> => {
    return http.get(url, {
        params
    });
}

export const httpPost = async (url: string, model: any): Promise<AxiosResponse> => {
    return http.post(url, model);
}

export const httpPut = async (url: string, model: any): Promise<AxiosResponse> => {
    return http.put(url, model);
}


export const httpDelete = async (url: string, model?: any): Promise<AxiosResponse> => {
    return http.delete(url, {
        data: model
    })
}
