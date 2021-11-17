import React, { useEffect } from "react";
import EthContext, { useEthContext } from "./contexts/ethContext";
import Clicker from "./components/Clicker/clicker";

const App = () => {
  const contextValue = useEthContext();

  useEffect(() => {
    console.log("called");
    contextValue.initWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <EthContext.Provider value={contextValue}>
        <Clicker />
      </EthContext.Provider>
    </div>
  );
};

export default App;
