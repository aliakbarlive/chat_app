import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { authApi } from '../services/api';
import { errorToast } from '../utils/Toastify';

const instance = axios.create({
    baseURL: process.env.VITE_SERVER_URL,
    withCredentials: true
});

type UseAxiosReturnType = {
    error: Error | null;
    isLoading: boolean;
    sendRequest: (config: AxiosRequestConfig, cb?: (data: any) => void) => void;
};

export const useAxios = (): UseAxiosReturnType => {
    const { token, setToken } = useAuthContext();

    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const refreshToken = useCallback(
        async (config: AxiosRequestConfig, cb?: (data: any) => void) => {
            try {
                const response: AxiosResponse = await instance.request({
                    method: 'POST',
                    url: authApi.refresh
                });
                if (response?.data?.accessToken) {
                    setToken({ accessToken: response.data.accessToken });
                    try {
                        const newConfig: AxiosRequestConfig = {
                            ...config,
                            headers: {
                                Authorization: `Bearer ${response.data.accessToken}`
                            }
                        };
                        const result: AxiosResponse = await instance.request(newConfig);
                        if (result?.data && cb) {
                            cb(result.data);
                        }
                    } catch (e:any) {
                        errorToast(e.message);
                    }
                }
            } catch (e:any) {
                errorToast(e.message);
            }
        },
        [setToken]
    );

    const sendRequest = useCallback(
        async (config: AxiosRequestConfig, cb?: (data: any) => void) => {
            setError(null);
            setIsLoading(true);

            try {
                if (token?.accessToken) {
                    config.headers = {
                        Authorization: `Bearer ${token.accessToken}`
                    };
                }
                const result: AxiosResponse = await instance.request(config);
                if (result?.data && cb) {
                    cb(result.data);
                }
            } catch (e: any | Error) {
                e?.response?.status === 403 ? refreshToken(config, cb) : setError(e?.response?.data || e);
            } finally {
                setIsLoading(false);
            }
        },
        [token, refreshToken]
    );

    return { error, isLoading, sendRequest };
};