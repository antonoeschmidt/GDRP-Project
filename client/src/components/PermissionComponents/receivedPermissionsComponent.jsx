import React, { useEffect, useContext, useState } from "react";
import EthContext from "../../contexts/ethContext";
import { Button, Table, Modal, Popup } from "semantic-ui-react";
import { dateFormatter, decrypt } from "../../utils/utils";

const ReceivedPermissionsComponent = () => {
    const { account } = useContext(EthContext);
    const [receivedPermissions, setReceivedPermissions] = useState();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");

    useEffect(() => {
        let userAccount = account;
        if (!account) userAccount = localStorage.getItem("citizenContract");
        if (!account) return;

        fetch(
            `${process.env.REACT_APP_BACKEND_URL}/permission/received/${userAccount}`,
            {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            }
        )
            .then((res) => res.json())
            .then((data) => setReceivedPermissions(data));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const viewData = async (permission) => {
        let requester = permission.requesterAddress;
        let dataId = permission.dataId;
        let owner = permission.contractAddress;

        let res = await fetch(
            `${process.env.REACT_APP_PERMISSION_URL}/data?requester=${requester}&dataid=${dataId}&owner=${owner}`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );
        let data = await res.json();
        const decrypted = decrypt(data.data, account);

        setContent(decrypted);
        setOpen(true);
    };

    return (
        <div>
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Permission ID</Table.HeaderCell>
                        <Table.HeaderCell>Retention</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {receivedPermissions &&
                        receivedPermissions.map((d) => (
                            <Table.Row key={d._id}>
                                <Table.Cell>{d._id}</Table.Cell>
                                <Table.Cell>{dateFormatter(d.retention)}</Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => viewData(d)}>
                                        View data
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
            <Modal
                centered={false}
                basic
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
            >
                <Modal.Header>Data</Modal.Header>
                <Modal.Description>
                    <p>{content}</p>
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
                                    navigator.clipboard.writeText(content);
                                }}
                            >
                                Copy to Clipboard
                            </Button>
                        }
                        style={{padding: "1px"}}
                    />
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default ReceivedPermissionsComponent;
