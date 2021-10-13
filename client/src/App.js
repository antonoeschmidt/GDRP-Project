import React, { useEffect, useState, useCallback } from "react";
import SimpleCounter from "./contracts/SimpleCounter.json";
import getWeb3 from "./utils/getWeb3";
import "./App.css";

const App = () => {
  const [ethState, setEthState] = useState({
    web3: null,
    contract: null,
    account: ""
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    initCounter();
  }, []);

  const initCounter = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleCounter.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleCounter.abi,
        deployedNetwork.address
      );

      let accounts = await web3.eth.getAccounts();   
      const account = accounts[0]

      let count = await instance.methods.count().call();
      
      setCount(count)
      setEthState({
        web3,
        contract: instance,
        account
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  const getCount = useCallback(async () => {
    const count = await ethState.contract.methods.count().call();
    setCount(count);
  }, [ethState]);

  const addCount = useCallback(async () => {
    await ethState.contract.methods
      .addCount()
      .send({ from: ethState.account });
    await getCount();
  }, [ethState, getCount]);

  return !ethState.web3 ? (
    <div>Loading Web3, accounts, and contract...</div>
  ) : (
    <div className="App">
      <h1>Happy Hacking!</h1>
      <h3>Count: {count}</h3>
      <button onClick={e => addCount(e)}>Count++</button>
    </div>
  );
};

export default App;
