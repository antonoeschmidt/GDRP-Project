import React, { useEffect } from "react";
import EthContext, { useEthContext } from "./contexts/ethContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/privateRouter";
import ClickerPage from "./pages/ClickerPage/clickerPage";
import HomePage from "./pages/HomePage/homePage";
import LoginPage from "./pages/LoginPage/loginPage";
import DashboardPage from "./pages/Dashboard/dashboard";
import AuthContext, { useAuthContext } from "./contexts/authContext";
import DataPage from "./pages/DataPage/dataPage";
import PermissionsPage from "./pages/PermissionsPage/permissionsPage";

const App = () => {
    const ethContextValue = useEthContext();
    const authCotextValue = useAuthContext();

    useEffect(() => {
        console.log("called");
        ethContextValue.initWeb3();
        authCotextValue.checkAuth().then((res) => {
            authCotextValue.setLoggedIn(res);
            authCotextValue.setId(localStorage.getItem("id"));
            authCotextValue.setLoading(false);
            ethContextValue.setCitizenContract(
                localStorage.getItem("citizenContract")
            );
            ethContextValue.setAccount(localStorage.getItem("account"));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <BrowserRouter>
            <EthContext.Provider value={ethContextValue}>
                <AuthContext.Provider value={authCotextValue}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/clicker"
                            element={
                                <PrivateRoute>
                                    <ClickerPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <DashboardPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/data"
                            element={
                                <PrivateRoute>
                                    <DataPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/permissions"
                            element={
                                <PrivateRoute>
                                    <PermissionsPage />
                                </PrivateRoute>
                            }
                        ></Route>
                    </Routes>
                </AuthContext.Provider>
            </EthContext.Provider>
        </BrowserRouter>
    );
};

export default App;
