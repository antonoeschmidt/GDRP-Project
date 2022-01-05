import React, { useContext, useState, useEffect } from "react"
import EthContext from "../../contexts/ethContext";
import { Table } from "semantic-ui-react";

const DeniedRequests = () => {
    const { account } = useContext(EthContext);
    const [deniedPermissions, setDeniedPermissions] = useState()

    useEffect(() => {
        let userAccount = account
        if (!account) userAccount = localStorage.getItem("citizenContract");
        if (!account) return;

        fetch(
            `${process.env.REACT_APP_BACKEND_URL}/permission/denied/${userAccount}`,
            {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            }
        )
            .then((res) => res.json())
            .then((data) => setDeniedPermissions(data));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        
            <Table striped>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Data ID</Table.HeaderCell>
                    <Table.HeaderCell>Retention</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                    {deniedPermissions && deniedPermissions.map((d) => (
                    <Table.Row key={d._id}>
                        <Table.Cell>{d._id}</Table.Cell>
                        <Table.Cell>{d.retention}</Table.Cell>
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        
    )

}

export default DeniedRequests