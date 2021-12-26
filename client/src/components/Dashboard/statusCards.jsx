import React from "react"
import {Container, GridColumn, Card} from "semantic-ui-react"
import "./statusCards.css"

const StatusCards = () => {

    return(
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
    )
}

export default StatusCards;