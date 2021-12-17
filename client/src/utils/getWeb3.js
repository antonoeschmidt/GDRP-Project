import Web3 from "web3";

const getWeb3 = async () => {
    if (window.web3) {
        // MetaMask - set to false to force localhost
        // Use Mist/MetaMask's provider.
        // const web3 = new Web3(window.web3.currentProvider);
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        console.log("Injected web3 detected.");

        return { web3: web3, accounts: accounts };
    }
    // Fallback to localhost; use dev console port by default...
    else {
        const provider = new Web3.providers.HttpProvider(
            "http://127.0.0.1:7545"
        );
        const web3 = new Web3(provider);
        let accounts = await web3.eth.getAccounts();

        console.log("No web3 instance injected, using Local web3.");
        return { web3: web3, accounts: accounts };
    }
};
export default getWeb3;
