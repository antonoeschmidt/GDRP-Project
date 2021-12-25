import React from "react";
import HomePageMenu from "../../components/Home/homePageMenu";
import { Container, GridColumn, Segment, Card } from "semantic-ui-react";
import "./dashboard.css"

const DashboardPage = () => {
    return (
        <div>
            <Segment
                inverted
                textAlign="center"
                style={{ minHeight: 700, padding: "1em 0em" }}
                vertical
            >
                <HomePageMenu activeMenu={"dashboard"} /> <br />
                <Container
                    className="three column doubling stackable grid"
                    style={{ marginTop: "3em" }}
                >
                    <GridColumn>
                        <Card
                            id="requests"
                            href="#"
                            header="Requests"
                            description="35"
                            onClick={() => console.log("hej")}
                        />
                    </GridColumn>
                    <GridColumn>
                    <Card
                            id="permission"
                            href="#"
                            header="Given permissions"
                            description="10"
                            onClick={() => console.log("hej")}
                        />
                    </GridColumn>
                    <GridColumn>
                    <Card
                            id="denied"
                            href="#"
                            header="Denied"
                            description="17"
                            onClick={() => console.log("hej")}
                        />
                    </GridColumn>
                </Container>
            </Segment>
            Some other content here
        </div>
    );
};

export default DashboardPage;
