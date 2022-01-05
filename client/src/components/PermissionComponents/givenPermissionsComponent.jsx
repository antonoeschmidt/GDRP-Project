import React, { useEffect, useContext, useState } from "react";
import EthContext from "../../contexts/ethContext";
import { Table } from "semantic-ui-react";

const GivenPermissionsComponent = () => {
    const { account, citizenContract } = useContext(EthContext);
    const [givenPermissions, setGivenPermissions] = useState();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/permission`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                let citizenContractInstance = citizenContract;
                if (!citizenContractInstance)
                    citizenContractInstance =
                        localStorage.getItem("citizenContract");
                let accountInstance = account;
                if (!accountInstance)
                    accountInstance = localStorage.getItem("account");

                let givenPermissions = data.filter(
                    (d) =>
                        d.contractAddress === citizenContractInstance &&
                        d.status === "accepted"
                );

                setGivenPermissions(givenPermissions);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Table striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Data ID</Table.HeaderCell>
                    <Table.HeaderCell>Retention</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {givenPermissions &&
                    givenPermissions.map((d) => (
                        <Table.Row key={d._id}>
                            <Table.Cell>{d._id}</Table.Cell>
                            <Table.Cell>{d.retention}</Table.Cell>
                        </Table.Row>
                    ))}
            </Table.Body>
        </Table>
    );
};

export default GivenPermissionsComponent;
