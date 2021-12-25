import React from "react";
import {
    Button,
    Container,
    Header,
    Icon,
} from "semantic-ui-react";

const HomePageHeading = ({ mobile }) => {
    return (
        <Container text>
            <Header
                as="h1"
                content="G4 - Grand Data Reclamation Project"
                inverted
                style={{
                    fontSize: mobile ? "2em" : "4em",
                    fontWeight: "normal",
                    marginBottom: 0,
                    marginTop: mobile ? "1.5em" : "3em",
                }}
            />
            <Header
                as="h2"
                content="A blockchain based approach to data security."
                inverted
                style={{
                    fontSize: mobile ? "1.5em" : "1.7em",
                    fontWeight: "normal",
                    marginTop: mobile ? "0.5em" : "1.5em",
                }}
            />
            <Button primary size="huge">
                Get Started
                <Icon name="right arrow" />
            </Button>
        </Container>
    );
};

export default HomePageHeading;
