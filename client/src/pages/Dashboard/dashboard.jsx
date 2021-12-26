import React from "react";
import HomePageMenu from "../../components/Home/homePageMenu";
import { Segment } from "semantic-ui-react";
import StatusCards from "../../components/Dashboard/statusCards";
import "./dashboard.css"

const DashboardPage = () => {
    return (
        <div>
            <Segment
                inverted
                textAlign="center"
                style={{ minHeight: 700, padding: "1em 0em", /* background: "#F7F8FC" */ }}
                vertical
            >
                <HomePageMenu activeMenu={"dashboard"} /> <br />
                <StatusCards />
            </Segment>
            Some other content here
        </div>
    );
};

export default DashboardPage;
