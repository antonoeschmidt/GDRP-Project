import React, { useEffect, useState, useContext } from "react";
import EthContext from "../../contexts/ethContext";
import { Table, Button, Loader } from "semantic-ui-react";

const IncomingRequests = () => {
    const { citizenContract, givePermission } = useContext(EthContext);
    const [requests, setRequests] = useState();
    const [loading, setLoading] = useState(false);
    const [requestId, setRequestId] = useState();

    useEffect(() => {
        let contract = citizenContract;
        if (!contract) contract = localStorage.getItem("citizenContract");
        if (!contract) return;

        fetch(
            `${process.env.REACT_APP_BACKEND_URL}/request/contract/${contract}`,
            {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            }
        )
            .then((res) => res.json())
            .then((data) => setRequests(data));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAccept = async (request) => {
        setLoading(true);
        setRequestId(request._id);
        let retention = new Date(request.retention);
        retention = Math.floor(retention.getTime() / 1000);
        let res = await givePermission(
            request.requesterAddress,
            request.dataId,
            retention
        );
        if (res.status) {
            updatePermission(true, request._id);
            alert("Request accepted");
            setRequests(requests.filter((d) => d._id !== request._id));
        } else {
            alert("Some error happened");
        }
        setLoading(false);
    };

    const handleDeny = async (request) => {
        updatePermission(false, request._id);
        alert("Request denied");
        setRequests(requests.filter((d) => d._id !== request._id));
    };

    const updatePermission = async (permissionGiven, id) => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/permission/${id}`,
            {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    status: permissionGiven ? "accepted" : "denied",
                }),
            }
        );
        const data = await res.json();
        console.log(data);
    };

    return (
        <Table striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Data ID</Table.HeaderCell>
                    <Table.HeaderCell>Requester</Table.HeaderCell>
                    <Table.HeaderCell>Retention</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {requests &&
                    requests.map((d) => (
                        <Table.Row key={d._id}>
                            <Table.Cell>{d.dataId}</Table.Cell>
                            <Table.Cell>{d.requesterAddress}</Table.Cell>
                            <Table.Cell>{d.retention}</Table.Cell>
                            <Table.Cell>
                                {loading ? (
                                    <Loader
                                        active={d._id === requestId}
                                        inline
                                        style={{ marginRight: "1em" }}
                                    />
                                ) : (
                                    <Button onClick={() => handleAccept(d)}>
                                        Accept
                                    </Button>
                                )}
                                <Button negative onClick={() => handleDeny(d)}>
                                    Deny
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
            </Table.Body>
        </Table>
    );
};

export default IncomingRequests;
