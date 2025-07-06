
    import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
    interface IAxiosError {
        statusCode: number;
        message: string;
        name: string;
    }
    export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

     async function getToken(): Promise<string> {
        try {
            const token = await AsyncStorage.getItem('KEY_AUTH');
            if (token === null){return '';}
            return token;
        } catch (error) {
            return '';
        }
    }
    class ApiService {
        private api: AxiosInstance;
        constructor({ protectedCall }: { protectedCall: boolean }) {
            this.api = axios.create({
                baseURL: 'https://website.etechinter.net/api/',
                headers: {
                    Accept: 'application/json',
                    'Content-Type':'application/json',
                },
                maxContentLength: 10_000_000,
                maxBodyLength: 10_000_000,
                timeout: 30_000,
            });
            this.api.interceptors.request.use(
                async (config) => {
                    if (protectedCall) {
                        const token = await getToken();
                        if (token) {
                            config.headers.Authorization = `token ${token}`;
                        }
                    }
                    return config;
                },
                (error) => Promise.reject(error)
            );


            this.api.interceptors.response.use(
                (response) => response,
                (error: AxiosError): Promise<IAxiosError> => {
                    const errResponse = error.response;
                    return Promise.reject({
                        statusCode: errResponse ? errResponse.status : 500,
                        message: errResponse?.data || 'An unexpected error occurred.',
                        name: error.name,
                    });
                }
            );
        }
        async request<T>(method: HttpMethod, endpoint: string, body?: any, config?: AxiosRequestConfig): Promise<T> {
            try {
                const response: AxiosResponse<T> = await this.api({
                    url: endpoint,
                    method,
                    ...(body ? { data: body } : {}),
                    ...config,
                });
                console.log('Final request config:', config);
                return response.data;
            } catch (error: any) {
                console.error('API Call Error:', error.message);
                throw error;
            }
        }
    }

    const Api = new ApiService({ protectedCall: false });

    const ProtectedApi = new ApiService({ protectedCall: true });

    export { ProtectedApi, Api };

