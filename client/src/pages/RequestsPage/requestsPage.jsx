import React, { useState, useEffect } from "react";
import HomePageMenu from "../../components/Home/homePageMenu";
import { Menu, MenuItem, Segment } from "semantic-ui-react";
import "./requestsPage.css";
import IncomingRequests from "../../components/RequestsComponents/incomingRequests"
import DeniedRequeusts from "../../components/RequestsComponents/deniedRequests"
import NewRequest from "../../components/RequestsComponents/newRequest"
import { useLocation } from "react-router";

const RequestsPage = ({props}) => {
    const [activeMenu, setActiveMenu] = useState()
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setActiveMenu(location.state)
        } else {
            setActiveMenu("incoming")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            <HomePageMenu activeMenu={"requests"} />
            <div className="column" id="requestsColumn">
                <Menu
                    inverted
                    className="ui three item stackable tabs menu"
                    style={{ margin: "5%" }}
                >
                    <MenuItem active={activeMenu === "incoming"} onClick={() => setActiveMenu("incoming")}>
                        Incoming Requests
                    </MenuItem>
                    <MenuItem active={activeMenu === "denied"} onClick={() => setActiveMenu("denied")}>
                        Denied Requests
                    </MenuItem>
                    <MenuItem active={activeMenu === "new"} onClick={() => setActiveMenu("new")}>
                        New Request
                    </MenuItem>
                </Menu>
                {activeMenu === "incoming" && <IncomingRequests />}
                {activeMenu === "denied" && <DeniedRequeusts />}
                {activeMenu === "new" && <NewRequest />}
            </div>
        </Segment>
    );
};

export default RequestsPage;
