// const { privateKeys } = require("./keys");
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
    return !!localStorage.getItem("token"); // only checks if a token is sat. No real auth yet
};

export const dataTypes = {
    bloodSamples: "Blood Samples",
    housingInfo: "Housing Info",
    bankInfo: "Bank Info",
    employmentStatus: "Employment Status",
    taxInfo: "Tax Info",
};

export const setUsers = async (requests, setReqUsers) => {
    let accAddressIds = "";
    for (let i = 0; i < requests.length; i++) {
        if (accAddressIds.includes(requests[i].requesterAddress));
        else {
            accAddressIds += requests[i].requesterAddress + "&";
        }
    }
    if (accAddressIds.substr(-1) === "&") {
        accAddressIds = accAddressIds.substr(0, accAddressIds.length - 1);
    }

    accAddressIds &&
        fetch(
            `${process.env.REACT_APP_BACKEND_URL}/user/accaddress/${accAddressIds}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            }
        )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (!data) return;
                setReqUsers(data);
            });
};

export const setPermissionUsers = async (requests, setReqUsers) => {
    let conAddressIds = "";
    for (let i = 0; i < requests.length; i++) {
        if (conAddressIds.includes(requests[i].requesterAddress));
        else {
            conAddressIds += requests[i].requesterAddress + "&";
        }
    }
    if (conAddressIds.substr(-1) === "&") {
        conAddressIds = conAddressIds.substr(0, conAddressIds.length - 1);
    }

    conAddressIds &&
    fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/contractaddress/${conAddressIds}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
        }
    )
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (!data) return;
            setReqUsers(data);
        });

    
};

export const setData = async (id, setData) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/data/userid/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (!data) return;
            setData(data);
        });
};

// fetch data(type) for denied requests
export const setDataFromIDs = async (ids, setData) => {
    ids &&
        fetch(`${process.env.REACT_APP_BACKEND_URL}/data/datatype/id/${ids}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (!data) return;
                setData(data);
            });
};

export const createViewData = (requests, data, users) => {
    if (!data[0]) return;
    let dataArr = [];
    for (let i = 0; i < requests.length; i++) {
        let dataObj = undefined;
        let username = users.find(
            ({ accountAddress }) =>
                accountAddress === requests[i].requesterAddress
        )?.username;
        let dataOwner = users.find(
            ({citizenContract}) => 
                citizenContract === requests[i].contractAddress
        )?.username
        let d = data.find(({ _id }) => _id === requests[i].dataId);
        let dataType = d?.dataType;
        let content = d?.content;

        dataObj = {
            // shown
            _id: requests[i]._id,
            username: username,
            dataType: dataType,
            content: content,
            retention: requests[i].retention,
            // needed for accept/deny req
            requesterAddress: requests[i].requesterAddress,
            dataId: requests[i].dataId,
            // needed for showdata on received permissions
            contractAddress: requests[i].contractAddress,
            dataOwner: dataOwner
        };
        dataArr.push(dataObj);
    }
    return dataArr;
};

export const decrypt = (encryptedData) => {
    const privateKey = localStorage.getItem("privateKey")
    const encryptedDataBuffer = Buffer.from(encryptedData, "base64");

    if (!privateKey) {
        alert("Missing Private Key for this account. Please add it to your keys.js")
        return
    }

    try {
        const decryptedData = crypto.privateDecrypt(
            privateKey,
            encryptedDataBuffer
        );
        return decryptedData.toString();
    } catch (err) {
        console.error(err);
        return "Data could not be decrypted. Please check that your private key is correct.";
    }
};

export const dateFormatter = (retention) => {
console.log(retention)
    let date = new Date(retention);
    return `${date.getDate()}/${date.getMonth() + 1}-${date.getFullYear()} ${
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    }:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;
};

export const composeIDquery = (arr) => {
    let ids = "";
    for (let i = 0; i < arr.length; i++) {
        if (ids.includes(arr[i].dataId)) {
        } else {
            ids += arr[i].dataId + "&";
        }
    }
    if (ids.substr(-1) === "&") {
        ids = ids.substr(0, ids.length - 1);
    }
    return ids;
};
