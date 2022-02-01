import { createContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuthContext = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState("");

    const checkAuth = async () => {
        setLoading(true);
        let auth = !!localStorage.getItem("token");
        if (auth) {
            try {
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
            } catch (error) {
                console.error(error);
                alert(
                    `Problem authorizing with backend. 
                     Please check that it is running and token is valid`
                );
            }
        } else {
            return false;
        }
    };

    const checkUsername = async (username) => {
        return fetch(
            `${process.env.REACT_APP_BACKEND_URL}/login/checkusername/` +
                username,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        )
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                if (data._id) {
                    return true;
                } else {
                    return false;
                }
            });
    };

    const login = async (username, password) => {
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: `${username}`,
                password: `${password}`,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.token) {
                    setLoggedIn(true);
                    localStorage.setItem("token", `Bearer ${data.token}`);
                    localStorage.setItem("account", data.accountAddress);
                    localStorage.setItem(
                        "citizenContract",
                        data.citizenContract
                    );
                    localStorage.setItem("id", data.id);
                    setId(data.id);
                }
                return data;
            });
    };

    return {
        loggedIn,
        setLoggedIn,
        loading,
        setLoading,
        login,
        checkAuth,
        checkUsername,
        id,
        setId,
    };
};

export default AuthContext;
