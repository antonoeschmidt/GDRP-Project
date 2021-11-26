import React, { useEffect } from "react";
import EthContext, { useEthContext } from "./contexts/ethContext";
import ClickerPage from "./pages/Clicker/clicker";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/home";
const App = () => {
  const contextValue = useEthContext();

  useEffect(() => {
    console.log("called");
    contextValue.initWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <EthContext.Provider value={contextValue}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clicker" element={<ClickerPage />}></Route>
        </Routes>
      </EthContext.Provider>
    </Router>
  );
};

export default App;
