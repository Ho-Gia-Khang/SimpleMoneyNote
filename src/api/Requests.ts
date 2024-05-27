import axios from "axios";
import { headers } from "./Headers";
// import dotenv from "dotenv";

// dotenv.config();
const API_URL = process.env.REACT_APP_API_URL;

export async function Get<T>(extendURL: string): Promise<T | undefined> {
    let data: T | undefined = undefined;
    try {
        await axios
            .get(`${API_URL}${extendURL}`, {
                headers: headers,
            })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    data = response.data as T;
                }
            });
    } catch (error) {
        console.log(error);
    }
    return data;
}

export async function login({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<number | undefined> {
    let status = undefined;
    try {
        await axios
            .post(`${API_URL}user/login`, { email: email, password: password })
            .then((response) => {
                if (response.status === 200) {
                    status = response.status;
                    localStorage.setItem(
                        "refreshToken",
                        response.data.refreshToken
                    );
                    localStorage.setItem(
                        "accessToken",
                        response.data.accessToken
                    );
                }
            });
    } catch (error) {
        console.log(error);
    }
    return status;
}

export async function logout(): Promise<number | undefined> {
    let status = undefined;
    try {
        await axios
            .delete(`${API_URL}user/logout`, {
                headers: { ...headers },
            })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    status = response.status;
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("accessToken");
                }
            });
    } catch (error) {
        console.log(error);
    }
    return status;
}

export async function Post<T>(
    extendURL: string,
    data: T
): Promise<T | undefined> {
    let newData: T | undefined = undefined;
    try {
        await axios
            .post(`${API_URL}${extendURL}`, data, { headers: { ...headers } })
            .then((response) => {
                if (response.status === 201) {
                    console.log("Post successful");
                    newData = response.data as T;
                }
            });
    } catch (error) {
        console.log(error);
    }
    return newData;
}

export async function Put<T>(extendURL: string, data: T) {
    let newData: T | undefined = undefined;
    try {
        await axios
            .put(`${API_URL}${extendURL}`, data, { headers: { ...headers } })
            .then((response) => {
                if (response.status === 200) {
                    console.log("Put successful");
                    newData = response.data as T;
                }
            });
    } catch (error) {
        console.log(error);
    }
    return newData;
}

export async function Delete(extendURL: string): Promise<Boolean | undefined> {
    try {
        await axios
            .delete(`${API_URL}${extendURL}`, { headers: { ...headers } })
            .then((response) => {
                if (response.status === 200) {
                    console.log("Delete successful");
                    return true;
                }
            });
    } catch (error) {
        console.log(error);
        return false;
    }

    return undefined;
}
