import axios from "axios";
import { headers } from "./Headers";

const API_URL = process.env.REACT_APP_API_URL;

let data: any = {};

async function fetchData<T>(extendURL: string) {
    await axios
        .get(`${API_URL}${extendURL}`, {
            headers: headers,
        })
        .then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                data = response.data as T;
            }
        })
        .catch((error) => {
            console.log(error);
            data = null;
        });
}

export async function Get<T>(extendURL: string) {
    await fetchData<T>(extendURL);
    if (data) {
        return data as T;
    }
    return null;
}

export async function Post<T>(extendURL: string, data: T) {
    try {
        await axios
            .post(`${API_URL}${extendURL}`, data, { headers: headers })
            .then((response) => {
                if (response.status === 201) {
                    console.log("Post successful");
                    return response.data as T;
                }
            });
    } catch (error) {
        console.log(error);
        return null as T;
    }
}

export async function Put<T>(extendURL: string, data: T) {
    try {
        await axios
            .put(`${API_URL}${extendURL}`, data, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    console.log("Put successful");
                    return response.data as T;
                }
            });
    } catch (error) {
        console.log(error);
        return null as T;
    }
}

export async function Delete(extendURL: string): Promise<Boolean | undefined> {
    try {
        await axios
            .delete(`${API_URL}${extendURL}`, { headers: headers })
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
