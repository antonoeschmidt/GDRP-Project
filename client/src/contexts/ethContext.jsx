import { createContext, useState } from "react";
import getWeb3 from "../utils/getWeb3";
import SimpleCounter from "../contracts/SimpleCounter.json";
import { clickerInstance } from "../utils/clickerInstance";
import { citizenInstance } from "../utils/citizenInstance";

const EthContext = createContext(null);

export const useEthContext = () => {
    const [ethState, setEthState] = useState({
        web3: null,
        citizen: null,
        account: "",
    });
    const [count, setCount] = useState(0);
    const [address, setAddress] = useState("");
    const [counterContract, setCounterContract] = useState();

    const initWeb3 = async () => {
        if (ethState.web3) return;
        try {
            // Get network provider and web3 instance.
            const { web3, accounts } = await getWeb3();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleCounter.networks[networkId];

            let simpleCounter = clickerInstance(deployedNetwork.address, web3);
            let citizenContract = citizenInstance(
                deployedNetwork.address,
                web3
            );

            const account = accounts[0];
            let count = await simpleCounter.methods.count().call();

            setCount(count);
            setEthState({
                web3,
                citizen: citizenContract,
                account,
            });
            setCounterContract(simpleCounter);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.error(error);
        }
    };

    return {
        ethState,
        setEthState,
        count,
        setCount,
        address,
        setAddress,
        counterContract,
        setCounterContract,
        initWeb3,
    };
};

export default EthContext;
