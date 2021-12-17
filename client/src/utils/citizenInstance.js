import CitizenData from "../contracts/CitizenData.json"

export const citizenInstance = (address, web3) => {
    if (!address || !web3) {
        return;
    }
    let contract = new web3.eth.Contract(CitizenData.abi, address)

    return contract;
}