import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import { Toaster } from "../components/Toaster/Toaser";
const timeOut = 25000;

// axiosInstance for API With Loader
const axiosInstance = axios.create();

// Axios Request
axiosInstance.interceptors.request.use(
    async (config) => {
        const netInfo = await NetInfo.fetch();
        if (!netInfo.isConnected) {
            showNetworkError();
            throw new Error("No network connection");
        }
        return config;
    },
    (error) => {
        console.log("REQUEST ERROR", error);
        return Promise.reject(error);
    }
);

// Axios Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        if (response.status === 401) {
            console.log(response.status);
        } else {
            return response.data;
        }
    },
    async (error) => {
        let config = error?.config;
        if (!config || !config.retry) {
            return Promise.reject(error);
        }
        config.__retryCount = config.__retryCount || 0;
        if (config?.__retryCount >= config?.retry) {
            return Promise.reject(error);
        }
        config.__retryCount += 1;
        let backoff = new Promise<void>(function (resolve) {
            setTimeout(function () {
                resolve();
            }, config.retryDelay || 1);
        });
        // retry the request
        return backoff.then(function () {
            return axiosInstance(config);
        });
    }
);

//Get Request API call
export const doGet = (url: string, params: any, headers: any) => {
    return axiosInstance
        .get(url, {
            headers: {
                "Content-Type": "application/json",
                ...(headers || {}),
            },
            params: params,
            timeout: timeOut
        })
        .catch((error) => {
            console.log("doGet--error message", error?.response?.data);
        });
};

//Post Request API call
export const doPost = async (
    url: string,
    body: any,
    headers: any,
    showLoader: boolean = true,
    customTimeout = false
) => {
    return new Promise((resolve, reject) => {
        const apiHeader: any = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...(headers || {}),
            },
        }

        if (!customTimeout) {
            apiHeader["timeout"] = timeOut
        }

        axiosInstance
            .post(url, body, apiHeader)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                console.log("PoSTError =>", error);
                reject(error);
            });
    });
};

//Patch Request API call
export const doPatch = async (url: string, body: any, headers: any) => {
    return axiosInstance
        .patch(url, body, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...(headers || {}),
            },
            timeout: timeOut
        })
        .then((response) => {
            console.log("doPatch response =>", response);
            return response;
        })
        .catch((error) => {
            console.log("error do patch ==> ", error?.response?.data);
            Toaster("Something went wrong, Try again later!");
            return error;
        });
};

//Put Request API call
export const doPut = (url: string, body: any, headers: any) => {
    return axiosInstance
        .put(url, body, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...(headers || {}),
            },
            timeout: timeOut
        })
        .catch(() => {
            Toaster("Something went wrong, Try again later!");
        });
};

//Delete Request API call
export const doDelete = (url: string, body: any, headers: any) => {
    return axiosInstance
        .delete(url, {
            data: body,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...(headers || {}),
            },
            timeout: timeOut
        })
        .catch(() => {
            Toaster("Something went wrong, Try again later!");
        });
};

/**
 * The function `showNetworkError` displays a message indicating no internet connection.
 */
const showNetworkError = () => {
    Toaster("No internet connection, please try again later!");
};