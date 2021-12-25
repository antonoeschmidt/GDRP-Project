import React from "react";
import { Segment } from "semantic-ui-react";
import HomePageHeading from "../../components/Home/homePageHeading";
import HomePageMenu from "../../components/Home/homePageMenu";
const HomePage = () => {
    return (
        <div>
            <Segment
                inverted
                textAlign="center"
                style={{ minHeight: 700, padding: "1em 0em" }}
                vertical
            >
                <HomePageMenu activeMenu={"home"} />
                <HomePageHeading />
            </Segment>
        </div>
    );
};

export default HomePage;
