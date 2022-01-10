import React, { useState, useContext, useEffect, useCallback } from "react";
import { Form, Input, Button, Modal, Popup } from "semantic-ui-react";
import AuthContext from "../../contexts/authContext";
import EthContext from "../../contexts/ethContext";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
    const navigate = useNavigate();
    const { checkUsername, login } = useContext(AuthContext);
    const { deployCitizenContract, setAccount, setCitizenContract } =
        useContext(EthContext);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [accountAddress, setAccountAddress] = useState();
    const [open, setOpen] = useState(false);
    const [privateKey, setPrivateKey] = useState(false);

    const handleSignup = async () => {
        if (!username || !password || !accountAddress) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const userExists = await checkUsername(username);
            if (userExists) {
                alert("Username not avaliable");
                return;
            }

            const citizenContractAddress = await deployCitizenContract(
                accountAddress
            );
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/user`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: `${username}`,
                    password: `${password}`,
                    accountAddress: `${accountAddress}`,
                    citizenContract: `${citizenContractAddress}`,
                }),
            })
                .then((data) => {
                    return data.json();
                })
                .then((data) => {
                    setOpen(true);
                    setPrivateKey(data.privateKey);
                    localStorage.setItem("privateKey", data.privateKey);
                });
        } catch (error) {
            console.error(error);
            alert(
                "Error creating new user. Please check that backend is running"
            );
        }
    };

    const handleLogin = useCallback(async () => {
        let res = await login(username, password);
        if (res.token) {
            setAccount(res.accountAddress); // there could be a check for if address exists on blockchain
            setCitizenContract(res.citizenContract);
            navigate("/dashboard");
        } else {
            alert("Username or password is invalid");
        }
    }, [login, navigate, password, setAccount, setCitizenContract, username]);

    useEffect(() => {
        if (open || !privateKey) return;
        handleLogin();
    }, [handleLogin, open, privateKey]);

    return (
        <div>
            <h1>Sign Up</h1>
            <Form>
                <Form.Field>
                    <label>Username</label>
                    <Input
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <Input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Account address</label>
                    <Input
                        placeholder="account"
                        onChange={(e) => setAccountAddress(e.target.value)}
                    />
                </Form.Field>
                <Button type="submit" primary onClick={() => handleSignup()}>
                    Sign Up
                </Button>
            </Form>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
            >
                <Modal.Header>
                    This is your Private Key - please store this somewhere safe
                </Modal.Header>
                <Modal.Description>
                    <p style={{ whiteSpace: "pre-line" }}>{privateKey}</p>
                </Modal.Description>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>OK</Button>
                    <Popup
                        content="Copied!"
                        on="click"
                        pinned
                        trigger={
                            <Button
                                primary
                                onClick={() => {
                                    navigator.clipboard.writeText(privateKey);
                                }}
                            >
                                Copy to Clipboard
                            </Button>
                        }
                        style={{ padding: "1px" }}
                    />
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default SignupForm;
