import { createContext, useState } from "react";
import getWeb3 from "../utils/getWeb3";
import SimpleCounter from "../contracts/SimpleCounter.json";
import CitizenData from "../contracts/CitizenData.json";

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
    if (ethState.web3) return
    try {
      // Get network provider and web3 instance.
      const web3 = getWeb3();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleCounter.networks[networkId];

      const counterContract = new web3.eth.Contract(
        SimpleCounter.abi,
        deployedNetwork.address
      );
      const citizenContract = new web3.eth.Contract(
        CitizenData.abi,
        deployedNetwork.address
      );

      let accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      let count = await counterContract.methods.count().call();

      setCount(count);
      setEthState({
        web3,
        citizen: citizenContract,
        account,
      });
      setCounterContract(counterContract);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  }

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
