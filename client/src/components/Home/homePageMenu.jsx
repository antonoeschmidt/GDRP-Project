import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Container, Button } from "semantic-ui-react";
import AuthContext from "../../contexts/authContext";

const HomePageMenu = ({activeMenu}) => {
    const { loggedIn, setLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoggedIn(false)
        localStorage.clear();
        navigate("/")
    }

    return (
        <Menu
            fixed={"top"}
            inverted={true}
            pointing={true}
            secondary={true}
            size="large"
            style={{background: "#1b1c1d"}}
        >
            <Container >
                <Menu.Item as="a" onClick={() => navigate("/")} active={activeMenu === "home"}>
                    Home
                </Menu.Item>
                {loggedIn && (
                    <Menu.Item as="a" onClick={() => navigate("/dashboard")} active={activeMenu === "dashboard"}>
                        Dashboard
                    </Menu.Item>
                )}
                {loggedIn && <Menu.Item as="a">Data</Menu.Item>}
                {loggedIn && <Menu.Item as="a">Permissions</Menu.Item>}
                <Menu.Item as="a">Credits</Menu.Item>
                <Menu.Item position="right">
                    {loggedIn ? (
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
