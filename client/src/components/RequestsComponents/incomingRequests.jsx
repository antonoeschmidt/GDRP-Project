import React, { useEffect, useState, useContext } from "react";
import EthContext from "../../contexts/ethContext";
import { Table, Button, Loader } from "semantic-ui-react";
import AuthContext from "../../contexts/authContext";
import { setUsers, createViewData, setData, dateFormatter } from "../../utils/utils";

const IncomingRequests = () => {
  const { citizenContract, givePermission } = useContext(EthContext);
  const { id } = useContext(AuthContext);
  const [requests, setRequests] = useState();
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState();
  const [reqData, setReqData] = useState();
  const [reqUsers, setReqUsers] = useState();
  const [showData, setShowData] = useState();
  const today = new Date()

  useEffect(() => {
    let contract = citizenContract;
    if (!contract) contract = localStorage.getItem("citizenContract");
    if (!contract) return;

    fetch(`${process.env.REACT_APP_BACKEND_URL}/request/contract/${contract}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setRequests(data));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!requests) return;
    setData(id, setReqData);
    setUsers(requests, setReqUsers);
  }, [requests, id]);

  useEffect(() => {
    if (!reqData) return;
    setShowData(createViewData(requests, reqData, reqUsers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reqUsers]);

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
          <Table.HeaderCell>Request ID</Table.HeaderCell>
          <Table.HeaderCell>Requester</Table.HeaderCell>
          <Table.HeaderCell>Data type</Table.HeaderCell>
          <Table.HeaderCell>Data content</Table.HeaderCell>
          <Table.HeaderCell>Retention</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {showData &&
          showData.map((d) => (
            <Table.Row key={d._id}>
              <Table.Cell>{d._id}</Table.Cell>
              <Table.Cell>{d.username}</Table.Cell>
              <Table.Cell>{d.dataType}</Table.Cell>
              <Table.Cell>{d.content}</Table.Cell>
              <Table.Cell>{dateFormatter(d.retention)}</Table.Cell>
              <Table.Cell>
                {loading ? (
                  <Loader
                    active={d._id === requestId}
                    inline
                    style={{ marginRight: "1em" }}
                  />
                ) : (
                  <Button disabled={today > new Date(d.retention)} onClick={() => handleAccept(d)}>Accept</Button>
                )}
                <Button negative onClick={() => handleDeny(d)}>
                  Deny
                </Button>
                {/* <div>{new Date(d.retention) + " + " + today}</div> */}
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default IncomingRequests;
