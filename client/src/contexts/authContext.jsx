import { createContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuthContext = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true)
    const [id, setId] = useState("");

    const checkAuth = async () => {
        setLoading(true)
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
                return res.json()
            })
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("token", `Bearer ${data.token}`);
                    localStorage.setItem("id", data.id);
                    setLoggedIn(true);
                    setId(data.id)
                    return true;
                } else {
                    return false;
                }
            });
    };

    return {
        loggedIn,
        setLoggedIn,
        loading,
        setLoading,
        login,
        checkAuth,
        id,
        setId
    };
};

export default AuthContext;
