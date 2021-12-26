import React from "react";
import { Segment } from "semantic-ui-react";
import HomePageContent from "../../components/Home/homePageContent";
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
                <HomePageContent />
            </Segment>
        </div>
    );
};

export default HomePage;
