import SimpleCounter from "../../contracts/SimpleCounter.json"

export const clickerInstance = (address, web3) => {
    if (!address || !web3) {
        return;
    }

    let contract = new web3.eth.Contract(SimpleCounter.abi, address)

    return contract;
}