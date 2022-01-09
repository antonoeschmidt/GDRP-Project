const { privateKeys } = require("./keys");
const crypto = require("crypto");

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
    return !!localStorage.getItem("token"); // only checks if a token is sat. No real auth yet. Not used anywhere
};

export const dataTypes = {
    bloodSamples: "Blood Samples",
    housingInfo: "Housing Info",
    bankInfo: "Bank Info",
    employmentStatus: "Employment Status",
    taxInfo: "Tax Info",
};

export const decrypt = (encryptedData, account) => {
    const privateKey = privateKeys[account];
    const encryptedDataBuffer = Buffer.from(encryptedData, "base64");

    try {
        const decryptedData = crypto.privateDecrypt(privateKey, encryptedDataBuffer);
        return decryptedData.toString();
    } catch (err) {
        console.error(err);
        return "error";
    }
};
