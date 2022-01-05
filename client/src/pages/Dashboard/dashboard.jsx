import React, { useState, useEffect, useContext } from "react";
import HomePageMenu from "../../components/Home/homePageMenu";
import { Segment } from "semantic-ui-react";
import StatusCards from "../../components/Dashboard/statusCards";
import "./dashboard.css";
import EthContext from "../../contexts/ethContext";

const DashboardPage = () => {
    const {
        // accounts,
        // getPermission,
        // givePermission,
        // revokePermission,
        // addData,
        account,
        citizenContract,
    } = useContext(EthContext);
    // const [externalAccount, setExternalAccount] = useState();

    const [requests, setRequests] = useState("");
    const [givenPermissions, setGivenPermissions] = useState("");
    const [deniedPermissions, setDeniedPermissions] = useState("");
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/permission`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                let citizenContractInstance = citizenContract;
                if (!citizenContractInstance)
                    citizenContractInstance =
                        localStorage.getItem("citizenContract");
                let accountInstance = account;
                if (!accountInstance)
                    accountInstance = localStorage.getItem("account");

                let requests = data.filter(
                    (d) =>
                        d.contractAddress === citizenContractInstance &&
                        d.status === "pending"
                );
                let givenPermissions = data.filter(
                    (d) =>
                        d.contractAddress === citizenContractInstance &&
                        d.status === "accepted"
                );
                let deniedPermissions = data.filter(
                    (d) =>
                        d.requesterAddress === accountInstance &&
                        d.status === "denied"
                );
                setRequests(requests.length);
                setGivenPermissions(givenPermissions.length);
                setDeniedPermissions(deniedPermissions.length);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Segment
                inverted
                textAlign="center"
                style={{
                    minHeight: 700,
                    padding: "1em 0em" /* background: "#F7F8FC" */,
                }}
                vertical
            >
                <HomePageMenu activeMenu={"dashboard"} /> <br />
                <StatusCards
                    props={{
                        requests: requests,
                        permission: givenPermissions,
                        denied: deniedPermissions,
                    }}
                />
                {/* <select onChange={(e) => setExternalAccount(e.target.value)}>
                    {accounts &&
                        accounts.map((account, key) => (
                            <option key={key}>{account}</option>
                        ))}
                    <option>hej</option>
                </select> */}
                {/* <Button onClick={() => addData("hej", "hej-content")}>
                    Add data
                </Button>
                <Button onClick={() => getPermission(externalAccount, "hej")}>
                    Get Permission
                </Button>
                <Button onClick={() => givePermission(externalAccount, "hej", 1641407105)}>
                    Give permission
                </Button>
                <Button
                    onClick={() => revokePermission(externalAccount, "hej")}
                >
                    Revoke Permission
                </Button> */}
            </Segment>
        </div>
    );
};

export default DashboardPage;
