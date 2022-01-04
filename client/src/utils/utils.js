export const checkAuth = async () => {
    let auth = !!localStorage.getItem("token");
    if (auth) {
        return await fetch(`${process.env.REACT_APP_BACKEND_URL}/`, {
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
    return false;
};

export const useAuth = () => {
    return !!localStorage.getItem("token"); // only checks if a token is sat. No real auth yet
}

export const dataTypes = {
    bloodSamples: "Blood Samples",
    housingInfo: "Housing Info",
    bankInfo: "Bank Info",
    employmentStatus: "Employment Status",
    taxInfo: "Tax Info"
}