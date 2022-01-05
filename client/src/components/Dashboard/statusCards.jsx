import React from "react";
import { useNavigate } from "react-router";
import { Container, GridColumn, Card } from "semantic-ui-react";
import "./statusCards.css";

const StatusCards = ({ props }) => {
    const navigate = useNavigate()

    return (
        <Container
            className="three column doubling stackable grid"
            style={{ marginTop: "3em" }}
        >
            <GridColumn>
                <Card
                    id="requests"
                    href="#"
                    header="Requests"
                    description={props.requests}
                    onClick={() => navigate("/requests")}
                />
            </GridColumn>
            <GridColumn>
                <Card
                    id="permission"
                    href="#"
                    header="Given permissions"
                    description={props.permission}
                    onClick={() => navigate("/permissions")}
                />
            </GridColumn>
            <GridColumn>
                <Card
                    id="denied"
                    href="#"
                    header="Denied"
                    description={props.denied}
                    onClick={() => navigate("/requests", {state: "denied"})}
                />
            </GridColumn>
        </Container>
    );
};

export default StatusCards;
