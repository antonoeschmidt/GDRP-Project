import Citizen from "../../contracts/Citizen.json"

export const citizenInstance = (address, web3) => {
    if (!address || !web3) {
        return;
    }
    let contract = new web3.eth.Contract(Citizen.abi, address)

    return contract;
}