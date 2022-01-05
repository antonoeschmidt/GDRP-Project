const Citizen = artifacts.require("./Citizen.sol");

contract("Citizen", (accounts) => {
    const requester = "0xd7385A34e777eB44eC0FCf198ee521FC5801574c";
    const dataId = "testData";
    const account = accounts[0];
    
    it("Should check a non-existing permission.", async () => {
        const citizenInstance = await Citizen.deployed();
        
        // Add data to have something to validate
        await citizenInstance.addData(dataId, "hashedContent", {
            from: account,
        });

        const permission = await citizenInstance.getPermission(
            requester,
            dataId
        );

        assert.equal(permission, false, "The permission should be false");
    });

    it("Should give an expired permission", async () => {
        const citizenInstance = await Citizen.deployed();

        // Set retention to yesterday -> permission expired
        let date = new Date();
        date.setDate(date.getDate() - 1);
        let retention = Math.floor(date.getTime() / 1000);

        await citizenInstance.givePermission(requester, dataId, retention, {from: account})

        const permission = await citizenInstance.getPermission(
            requester,
            dataId
        );

        assert.equal(permission, false, "The permission should be false");
    });

    it("Should give a valid permission", async () => {
        const citizenInstance = await Citizen.deployed();
        let date = new Date();
        date.setDate(date.getDate() + 1);
        let retention = Math.floor(date.getTime() / 1000);

        await citizenInstance.givePermission(requester, dataId, retention, {from: account})

        const permission = await citizenInstance.getPermission(
            requester,
            dataId
        );

        assert.equal(permission, true, "The permission should be true");
    });

    it("Should revoke a permission", async () => {
        const citizenInstance = await Citizen.deployed();

        const oldPermission = await citizenInstance.getPermission(
            requester,
            dataId
        );
        assert.equal(oldPermission, true, "The permission should be true before revoking");
    
        await citizenInstance.revokePermission(requester, dataId, {from: account})
        const permission = await citizenInstance.getPermission(
            requester,
            dataId
        );

        assert.equal(permission, false, "The permission should be false");
    });
    
});
