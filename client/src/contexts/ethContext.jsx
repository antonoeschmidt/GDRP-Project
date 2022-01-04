import { createContext, useState } from "react";
import getWeb3 from "../utils/getWeb3";
import { citizenInstance } from "../utils/contractInstances/citizenInstance";
import Citizen from "../contracts/Citizen.json";
const crypto = require("crypto");

const EthContext = createContext("");

export const useEthContext = () => {
    const [ethState, setEthState] = useState({ web3: null });
    const [account, setAccount] = useState();
    const [accounts, setAccounts] = useState();
    const [citizenContract, setCitizenContract] = useState();
    
    const initWeb3 = async () => {
        if (ethState.web3) return;
        try {
            // Get network provider and web3 instance.
            const { web3, accounts } = await getWeb3();
            setAccounts(accounts);
            setEthState({ web3 });
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.error(error);
        }
    };

    const deployCitizenContract = async (accountAddress) => {
        if (!accountAddress) return;
        let newContract;
        try {
            newContract = new ethState.web3.eth.Contract(
                Citizen.abi,
                accountAddress
            );
        } catch (err) {
            console.error(err);
            alert("Invalid Account Address");
            return;
        }

        newContract = newContract.deploy({ data: Citizen.bytecode });
        const newContractInstance = await newContract
            .send({
                from: accountAddress,
                gas: 1500000,
                gasPrice: "30000000000",
            })
            .on("confirmation", function (confirmationNumber, receipt) {
            });
        
        return newContractInstance.options.address;
    };

    const getPermission = async (requester, dataId) => {
        let contract = citizenInstance(citizenContract, ethState.web3);
        console.log(contract);
        let permission = await contract.methods
            .getPermission(requester, dataId)
            .call();
        console.log(`permission: ${permission}`);
    };

    const givePermission = async (requester, dataId, retention) => {
        console.log(requester);
        console.log(dataId);
        console.log(retention);
        let contract = citizenInstance(citizenContract, ethState.web3);
        let res = await contract.methods
                .givePermission(requester, dataId, retention)
                .send({ from: account,
                    gas: 1500000,
                    gasPrice: "30000000000" });

        console.log("givePermission");
        return res;
    };

    const revokePermission = async (requester, dataId) => {
        let contract = citizenInstance(citizenContract, ethState.web3);
        let res = await contract.methods
            .revokePermission(requester, dataId)
            .send({ from: account,
                gas: 1500000,
                gasPrice: "30000000000" });
        console.log("revokePermission");
        console.log(res);
    };

    const addData = async (dataId, content) => {
        const contract = citizenInstance(citizenContract, ethState.web3);
        const hash = crypto.createHash("sha256").update(content).digest("hex");
        const res = await contract.methods
            .addData(dataId, hash)
            .send({ from: account,
                gas: 1500000,
                gasPrice: "30000000000" });
        console.log(res);
    };

    return {
        ethState,
        setEthState,
        account,
        setAccount,
        accounts,
        setAccounts,
        citizenContract,
        setCitizenContract,
        initWeb3,
        deployCitizenContract,
        getPermission,
        givePermission,
        revokePermission,
        addData,
    };
};

export default EthContext;
