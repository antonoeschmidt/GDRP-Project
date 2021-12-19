import React, { useEffect } from "react";
import EthContext, { useEthContext } from "./contexts/ethContext";
import ClickerPage from "./pages/ClickerPage/clickerPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/privateRouter";
import HomePage from "./pages/HomePage/homePage";
import LoginPage from "./pages/LoginPage/loginPage";

const App = () => {
    const contextValue = useEthContext();

    useEffect(() => {
        console.log("called");
        contextValue.initWeb3();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <BrowserRouter>
            <EthContext.Provider value={contextValue}>
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
                </Routes>
            </EthContext.Provider>
        </BrowserRouter>
    );
};

export default App;
