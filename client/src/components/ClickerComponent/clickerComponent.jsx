import React, { useContext, useCallback } from "react";
import { Button } from "semantic-ui-react";
import EthContext from "../../contexts/ethContext";
import "./clickerComponent.css";

const ClickerComponent = () => {
    const { ethState, count, setCount, counterContract } =
        useContext(EthContext);

    const getCount = useCallback(async () => {
        const count = await counterContract.methods.count().call();
        setCount(count);
    }, [counterContract, setCount]);

    const addCount = useCallback(async () => {
        if (!ethState.account) {
            alert("No account found");
            return;
        }
        await counterContract.methods
            .addCount()
            .send({ from: ethState.account });
        await getCount();
    }, [counterContract, getCount, ethState]);

    return (
        <div>
            <h1>Happy Hacking!</h1>
            <h3>Count: {count}</h3>
            <Button onClick={() => addCount()}>Count++</Button>
            <hr />
        </div>
    );
};

export default ClickerComponent;
