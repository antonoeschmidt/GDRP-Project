import { createContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuthContext = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        setLoading(true);
        let auth = !!localStorage.getItem("token");
        if (auth) {
            return await fetch("http://localhost:3001/", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            }).then((data) => {
                return data.ok;
            });
        } else {
            return false;
        }
    };

    const checkUsername = async (username) => {
        return fetch("http://localhost:3001/user/username/" + username, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                if (data._id) {
                    return true
                } else {
                    return false
                }
            });
    };

    const login = async (username, password) => {
        return fetch("http://localhost:3001/login", {
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
                    localStorage.setItem("citizenContract", data.citizenContract);
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
    };
};

export default AuthContext;
