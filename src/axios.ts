import axios,{ type AxiosInstance} from 'axios'


export const USER_TAG = 'tripAccessToken'
export const baseUrl = 'https://api.test.shuttlers.africa'

export type reqMethod = 'post' | 'get' | 'delete' | 'put';
type body = { [x: string]: any }
export type callParams = {
    endpoint: string,
    method: reqMethod,
    body?: body,
    authorized?: boolean,
    returnPromise?: boolean
}


const tripCall = async (callParams: callParams, url: string = baseUrl) => {
    const { endpoint, method, body = undefined, authorized = true, returnPromise = false } = callParams
    const axiosInstance = axios.create();
    addInterceptor(axiosInstance);
    if (authorized) {
        initServer(axiosInstance)
    }
    return returnPromise ? axiosInstance[method](`${url}/${endpoint}`, body) : await axiosInstance[method](`${url}/${endpoint}`, body);
}

export const storeUser = (user: any) => {
    sessionStorage.setItem(USER_TAG, JSON.stringify(user))
}

export const initServer = (server: AxiosInstance) => {
    const userToken = sessionStorage.getItem(USER_TAG);

    if (userToken != null) {
        const token = JSON.parse(userToken);
        server.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
}

const addInterceptor = (axios: any) => {
    axios.interceptors.response.use((response: any) => response, (err: any) => {
        if (err.response.status == 401) {
            sessionStorage.removeItem(USER_TAG)
        }

        if (err.response.status == 404) {
            throw new Error(err)
        }
    });
}



export default  tripCall