export const checkAuth = async () => {
    let auth = !!localStorage.getItem("token");
    if (auth) {
        return fetch("http://localhost:3001/", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
        }).then((data) => {
            return data.ok;
        });
    }
};

export const useAuth = () => {
    return !!localStorage.getItem("token"); // only checks if a token is sat. No real auth yey
}
