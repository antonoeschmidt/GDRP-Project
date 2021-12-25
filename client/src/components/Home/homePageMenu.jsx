import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Container, Button } from "semantic-ui-react";
import { useAuth } from "../../utils/utils";

const HomePageMenu = ({activeMenu}) => {
    const navigate = useNavigate();
    let auth = useAuth();
    console.log(activeMenu);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/")
    }

    return (
        <Menu
            fixed={"top"}
            inverted={true}
            pointing={true}
            secondary={true}
            size="large"
        >
            <Container>
                <Menu.Item as="a" onClick={() => navigate("/")} active={activeMenu === "home"}>
                    Home
                </Menu.Item>
                {auth && (
                    <Menu.Item as="a" onClick={() => navigate("/dashboard")} active={activeMenu === "dashboard"}>
                        Dashboard
                    </Menu.Item>
                )}
                {auth && <Menu.Item as="a">Data</Menu.Item>}
                {auth && <Menu.Item as="a">Permissions</Menu.Item>}
                <Menu.Item as="a">Credits</Menu.Item>
                <Menu.Item position="right">
                    {auth ? (
                        <Button
                            as="a"
                            inverted={true}
                            onClick={() => handleLogout()} // TODO: logic not implemented
                        >
                            Logout
                        </Button>
                    ) : (
                        <div>
                            <Button
                                as="a"
                                inverted={true}
                                onClick={() => navigate("/login")}
                            >
                                Log in
                            </Button>
                            <Button
                                as="a"
                                inverted={true}
                                primary={false}
                                style={{ marginLeft: "0.5em" }}
                            >
                                Sign Up
                            </Button>
                        </div>
                    )}
                </Menu.Item>
            </Container>
        </Menu>
    );
};

export default HomePageMenu;
