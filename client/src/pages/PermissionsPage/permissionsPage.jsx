import React, { useState } from "react";
import "./permissionsPage.css"
import { useNavigate } from "react-router";
import { Button, Segment, Icon, Menu, MenuItem } from "semantic-ui-react";
import HomePageMenu from "../../components/Home/homePageMenu";
import ReceivedPermissionsComponent from "../../components/PermissionComponents/receivedPermissionsComponent";
import GivenPermissionsComponent from "../../components/PermissionComponents/givenPermissionsComponent";

const PermissionsPage = () => {
    const [activeMenu, setActiveMenu] = useState("given")
    const navigate = useNavigate();

    return (
        <Segment
            inverted
            textAlign="center"
            style={{
                minHeight: 700,
                padding: "1em 0em" /* background: "#F7F8FC" */,
            }}
            vertical
        >
            <HomePageMenu activeMenu={"permissions"} /> <br />
            <Button
                positive
                onClick={() => navigate("/requests", { state: "new" })}
            >
                New Request <Icon style={{ marginLeft: "0.5em" }} name="plus" />
            </Button>
            <div className="column" id="permissionsColumn">

            <Menu
                    inverted
                    className="ui two item stackable tabs menu"
                >
                    <MenuItem active={activeMenu === "given"} onClick={() => setActiveMenu("given")}>
                        Given Permissions
                    </MenuItem>
                    <MenuItem active={activeMenu === "received"} onClick={() => setActiveMenu("received")}>
                        Received Permissions
                    </MenuItem>
                </Menu>
                {activeMenu === "given" && <GivenPermissionsComponent />} 
                {activeMenu === "received" && <ReceivedPermissionsComponent />} 
            </div>
        </Segment>
    );
};

export default PermissionsPage;
