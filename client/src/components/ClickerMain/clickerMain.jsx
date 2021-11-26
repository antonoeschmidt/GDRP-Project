import React, { useContext, useCallback } from "react";
import EthContext from "../../contexts/ethContext";
import "./clickerMain.css"

const ClickerMain = () => {
  const { ethState, count, setCount, counterContract} = useContext(EthContext);

  const getCount = useCallback(async () => {
    const count = await counterContract.methods.count().call();
    setCount(count);
  }, [counterContract, setCount]);

  const addCount = useCallback(async () => {
    await counterContract.methods.addCount().send({ from: ethState.account });
    await getCount();
  }, [counterContract, getCount, ethState]);

  return (
    <div>
      <h1>Happy Hacking!</h1>
      <h3>Count: {count}</h3>
      <button onClick={() => addCount()}>Count++</button>
      <hr />
    </div>
  );
};

export default ClickerMain;
