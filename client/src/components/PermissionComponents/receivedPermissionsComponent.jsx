import React, { useEffect, useContext, useState } from "react";
import EthContext from "../../contexts/ethContext";
import { Button, Table, Modal, Popup, Message, Form, TextArea } from "semantic-ui-react";
import { dateFormatter, decrypt } from "../../utils/utils";
import AuthContext from "../../contexts/authContext";

const ReceivedPermissionsComponent = () => {
    const { account } = useContext(EthContext);
    const { id } = useContext(AuthContext);
    const [receivedPermissions, setReceivedPermissions] = useState();
    const [open, setOpen] = useState(false);
    const [openPrivateKeyModal, setOpenPrivateKeyModal] = useState(false);
    const [content, setContent] = useState("");
    const [privateKey, setPrivateKey] = useState();
    const [textArea, setTextArea] = useState()

    useEffect(() => {
        let userAccount = account;
        setPrivateKey(localStorage.getItem("privateKey"));
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
        let userId = id;

        if (!userId) userId = localStorage.getItem("id");

        try {
            let res = await fetch(
                `${process.env.REACT_APP_PERMISSION_URL}/data?requester=${requester}&dataid=${dataId}&owner=${owner}&userid=${userId}`,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            let data = await res.json();
            const decrypted = decrypt(data.data);

            setContent(decrypted);
            setOpen(true);
        } catch (error) {
            console.error(error);
            alert(
                "Cannot conntect to data-exchange server. Please check that it is running"
            );
        }
    };

    const removePermission = (permission) => {
        fetch(
            `${process.env.REACT_APP_BACKEND_URL}/permission/${permission._id}`,
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Permission deleted") {
                    setReceivedPermissions(
                        receivedPermissions.filter(
                            (d) => d._id !== permission._id
                        )
                    );
                    alert("Permission removed");
                }
            });
    };

    return (
        <div>
            {!privateKey && (
                <Message
                    warning
                    style={{
                        width: "60%",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    <Message.Header>
                        You are missing a private key to view data
                    </Message.Header>
                    <p>Please add it, then try again.</p>
                    <Button onClick={() => setOpenPrivateKeyModal(true)}>Add key</Button>
                </Message>
            )}

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
                        receivedPermissions.map((d) =>
                            new Date(d.retention) > new Date() ? (
                                <Table.Row key={d._id}>
                                    <Table.Cell>{d._id}</Table.Cell>
                                    <Table.Cell>
                                        Valid until {dateFormatter(d.retention)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button onClick={() => viewData(d)}>
                                            View data
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ) : (
                                <Table.Row
                                    key={d._id}
                                    style={{ background: "#ffe2e2" }}
                                >
                                    <Table.Cell>{d._id}</Table.Cell>
                                    <Table.Cell>
                                        Expired on {dateFormatter(d.retention)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            negative
                                            onClick={() => removePermission(d)}
                                        >
                                            Remove
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        )}
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
                        style={{ padding: "1px" }}
                    />
                </Modal.Actions>
            </Modal>
            <Modal
                centered={false}
                onClose={() => setOpenPrivateKeyModal(false)}
                onOpen={() => setOpenPrivateKeyModal(true)}
                open={openPrivateKeyModal}
            >
                <Modal.Header>
                    Add Private Key
                </Modal.Header>
                <Modal.Description>
                    <Form>
                        <TextArea onChange={(e) => setTextArea(e.target.value)} placeholder="Paste your private key here.."/>
                    </Form>
                </Modal.Description>
                <Modal.Actions>
                    <Button primary onClick={() => {
                        localStorage.setItem("privateKey", textArea)
                        setPrivateKey(textArea)
                        setOpenPrivateKeyModal(false)
                        }}>OK</Button>
                        <Button onClick={() => setOpenPrivateKeyModal(false)}>Cancel</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default ReceivedPermissionsComponent;
