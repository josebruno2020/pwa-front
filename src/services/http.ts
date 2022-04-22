import axios, {AxiosResponse} from 'axios';

const url = process.env.VUE_APP_API_URL;

const http = axios.create({
    baseURL: url,
    headers: {
        'Accept': 'application/json'
    }
});


export const httpGet = async (url: string, params?): Promise<AxiosResponse> => {
    return http.get(url, {
        params
    });
}

export const httpPost = async (url: string, model: any): Promise<AxiosResponse> => {
    return http.post(url, model);
}
