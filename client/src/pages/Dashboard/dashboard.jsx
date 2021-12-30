import React, { useContext, useState } from "react";
import HomePageMenu from "../../components/Home/homePageMenu";
import { Segment, Button } from "semantic-ui-react";
import StatusCards from "../../components/Dashboard/statusCards";
import "./dashboard.css";
import EthContext from "../../contexts/ethContext";

const DashboardPage = () => {
    const {
        accounts,
        getPermission,
        givePermission,
        revokePermission,
        addData,
    } = useContext(EthContext);
    const [externalAccount, setExternalAccount] = useState();

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
                <StatusCards />
                <select onChange={(e) => setExternalAccount(e.target.value)}>
                    {accounts &&
                        accounts.map((account, key) => (
                            <option key={key}>{account}</option>
                        ))}
                    <option>hej</option>
                </select>
                <Button onClick={() => addData("hej", "hej-content")}>
                    Add data
                </Button>
                <Button onClick={() => getPermission(externalAccount, "hej")}>
                    Get Permission
                </Button>
                <Button onClick={() => givePermission(externalAccount, "hej")}>
                    Give permission
                </Button>
                <Button
                    onClick={() => revokePermission(externalAccount, "hej")}
                >
                    Revoke Permission
                </Button>
            </Segment>
            Some other content here
        </div>
    );
};

export default DashboardPage;
