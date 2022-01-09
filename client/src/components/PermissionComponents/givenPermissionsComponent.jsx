import React, { useEffect, useContext, useState } from "react";
import EthContext from "../../contexts/ethContext";
import { Button, Table } from "semantic-ui-react";
import {
  composeIDquery,
  createViewData,
  dateFormatter,
  setDataFromIDs,
  setUsers,
} from "../../utils/utils";

const GivenPermissionsComponent = () => {
  const { account, citizenContract, revokePermission } = useContext(EthContext);
  const [givenPermissions, setGivenPermissions] = useState();
  const [reqData, setReqData] = useState();
  const [reqUsers, setReqUsers] = useState();
  const [showData, setShowData] = useState();

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
          citizenContractInstance = localStorage.getItem("citizenContract");
        let accountInstance = account;
        if (!accountInstance) accountInstance = localStorage.getItem("account");

        let givenPermissions = data.filter(
          (d) =>
            d.contractAddress === citizenContractInstance &&
            d.status === "accepted"
        );

        setGivenPermissions(givenPermissions);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!givenPermissions) return;
    let ids = composeIDquery(givenPermissions);
    setDataFromIDs(ids, setReqData);
    setUsers(givenPermissions, setReqUsers);
  }, [givenPermissions]);

  useEffect(() => {
    if (!reqData || !reqUsers) return;
    setShowData(createViewData(givenPermissions, reqData, reqUsers));
  }, [reqUsers, reqData, givenPermissions]);

  const revoke = async (permission) => {
    console.log(permission);
    const { _id, requesterAddress, dataId } = permission;
    console.log(_id, requesterAddress, dataId);
    let res = await revokePermission(requesterAddress, dataId);
    console.log(res);

    if (res.status) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/permission/${_id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          let givenPermissionsArr = givenPermissions.filter(
            (d) => d._id !== _id
          );

          setGivenPermissions(givenPermissionsArr);

          if (data.message) {
            alert("Permission revoked");
          }
          return data;
        });
    }
  };

  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Request ID</Table.HeaderCell>
          <Table.HeaderCell>Requester</Table.HeaderCell>
          <Table.HeaderCell>Data type</Table.HeaderCell>
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
              <Table.Cell>{dateFormatter(d.retention)}</Table.Cell>
              <Table.Cell>
                <Button negative onClick={() => revoke(d)}>
                  Revoke
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default GivenPermissionsComponent;
