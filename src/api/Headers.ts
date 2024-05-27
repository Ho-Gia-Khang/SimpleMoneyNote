export const headers = {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    x_refresh: localStorage.getItem("refreshToken"),
};
