import React, { useState, useContext } from "react";
import { Form, Input, Button } from "semantic-ui-react";
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
                    return data;
                });
            handleLogin();
        } catch (error) {
            console.error(error);
            alert(
                "Error creating new user. Please check that backend is running"
            );
        }
    };

    const handleLogin = async () => {
        let res = await login(username, password);
        if (res.token) {
            setAccount(res.accountAddress); // there could be a check for if address exists on blockchain
            setCitizenContract(res.citizenContract);
            navigate("/dashboard");
        } else {
            alert("Username or password is invalid");
        }
    };

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
        </div>
    );
};

export default SignupForm;
