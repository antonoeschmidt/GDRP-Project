import React, { useContext, useState, useEffect } from "react";
import EthContext from "../../contexts/ethContext";
import { Table } from "semantic-ui-react";
import AuthContext from "../../contexts/authContext";
import { composeIDquery, createViewData, setDataFromIDs, setUsers } from "../../utils/utils";

const DeniedRequests = () => {
  const { account } = useContext(EthContext);
  const [deniedRequests, setDeniedRequests] = useState();
  const [reqData, setReqData] = useState();
  const [reqUsers, setReqUsers] = useState();
  const [showData, setShowData] = useState();
  const { id } = useContext(AuthContext);

  useEffect(() => {
    let userAccount = account;
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
      .then((data) => setDeniedRequests(data));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!deniedRequests) return;
    // let ids = "";
    // for (let i = 0; i < deniedRequests.length; i++) {
    //   if (ids.includes(deniedRequests[i].dataId)) {
    //   } else {
    //     ids += deniedRequests[i].dataId + "&";
    //   }
    // }
    // if (ids.substr(-1) === "&") {
    //     ids = ids.substr(0, ids.length-1);
    // }
    let ids = composeIDquery(deniedRequests)
    setDataFromIDs(ids, setReqData);
    setUsers(deniedRequests, setReqUsers);
  }, [deniedRequests, id]);

  useEffect(() => {
    if (!reqData || !reqUsers) return;
    setShowData(createViewData(deniedRequests, reqData, reqUsers));
  }, [reqUsers, reqData, deniedRequests]);

  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Request ID</Table.HeaderCell>
          <Table.HeaderCell>Requester</Table.HeaderCell>
          <Table.HeaderCell>Data type</Table.HeaderCell>
          <Table.HeaderCell>Retention</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {showData &&
          showData.map((d) => (
            <Table.Row key={d._id}>
              <Table.Cell>{d._id}</Table.Cell>
              <Table.Cell>{d.username}</Table.Cell>
              <Table.Cell>{d.dataType}</Table.Cell>
              <Table.Cell>{d.retention}</Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default DeniedRequests;
