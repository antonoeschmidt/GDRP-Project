import React from "react";
import { Button, Segment, Icon } from "semantic-ui-react";
import HomePageMenu from "../../components/Home/homePageMenu";
import TablePermissionComponent from "../../components/PermissionComponents/tablePermissionsComponent";

const PermissionsPage = () => {
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
            <Button positive>New Request <Icon style={{marginLeft: "0.5em"}} name="plus" /></Button>
            <TablePermissionComponent/>
        </Segment>
    );
};

export default PermissionsPage;
