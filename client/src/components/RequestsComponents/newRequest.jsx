import React, { useState, useEffect, useContext } from "react";
import "./newRequest.css";
import { useNavigate } from "react-router";
import EthContext from "../../contexts/ethContext";
import AuthContext from "../../contexts/authContext";
import { Form, Button, Dropdown, Menu } from "semantic-ui-react";
import { dataTypes } from "../../utils/utils";

const NewRequest = () => {
    const { account } = useContext(EthContext);
    const { id } = useContext(AuthContext);
    const navigate = useNavigate();
    const [ownerUserId, setOwnerUserId] = useState();
    const [dataType, setDataType] = useState();
    const [retention, setRetention] = useState();
    const [users, setUsers] = useState([]);
    const [dataTypesOptions, setdataTypesOptions] = useState([
        { key: 0, text: "" },
    ]);

    const handleRequest = async () => {
        if (!ownerUserId || !dataType || !retention) {
            alert("Please fill all fields to request data")
            return;
        }
        let { citizenContract } = users.find((d) => d._id === ownerUserId);
        let retentionDate = getRetention();
        let dataIds = await getDataIds();

        dataIds.map(async (d) => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/permission`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    requesterAddress: account,
                    contractAddress: citizenContract,
                    retention: retentionDate,
                    dataId: d._id,
                }),
            });
            const data = await res.json();
            return data
        });

        alert("Request for data sent!")
        navigate("/dashboard");
    };

    const getRetention = () => {
        let date = new Date();
        switch (retention) {
            case "1d":
                date.setDate(date.getDate() + 1);
                break;

            case "1w":
                date.setDate(date.getDate() + 7);
                break;

            case "1m":
                date.setMonth(date.getMonth() + 1);
                break;

            default:
                break;
        }
        return date;
    };

    const getDataIds = async () => {
        return fetch(
            `${process.env.REACT_APP_BACKEND_URL}/data/userid/${ownerUserId}`,
            {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                return data.filter((d) => d.dataType === dataType);
            }); //TODO: should only return dataIds, and not all the data => less secure
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/user`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => setUsers(data.filter((d) => d._id !== id)));

        let arr = [];
        for (let key in dataTypes) {
            arr.push({ key: key, value: key, text: dataTypes[key] });
        }
        setdataTypesOptions(arr);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div id="newRequestColumn" className="column">
            <Form inverted>
                <Form.Field>
                    <label>Username</label>
                    <Dropdown
                        placeholder="Username"
                        fluid
                        search
                        selection
                        options={users.map((d) => ({
                            key: d._id,
                            value: d._id,
                            text: d.username,
                        }))}
                        onChange={(event, data) => setOwnerUserId(data.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Data Type</label>
                    <Dropdown
                        placeholder="Data Type"
                        fluid
                        search
                        selection
                        options={dataTypesOptions}
                        onChange={(event, data) => setDataType(data.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Retention</label>
                    <Menu
                        id="retention"
                        className="ui three item stackable tabs menu"
                    >
                        <Menu.Item
                            active={retention === "1d"}
                            onClick={() => setRetention("1d")}
                        >
                            1 Day
                        </Menu.Item>
                        <Menu.Item
                            active={retention === "1w"}
                            onClick={() => setRetention("1w")}
                        >
                            1 Week
                        </Menu.Item>
                        <Menu.Item
                            active={retention === "1m"}
                            onClick={() => setRetention("1m")}
                        >
                            1 Month
                        </Menu.Item>
                    </Menu>
                </Form.Field>
                <Button type="submit" primary onClick={() => handleRequest()}>
                    Request Data
                </Button>
            </Form>
        </div>
    );
};

export default NewRequest;
