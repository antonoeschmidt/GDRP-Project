import React, { useEffect } from "react";
import { Table } from "semantic-ui-react";
import RowComponent from "../RowComponent/rowComponent";

const TableComponent = ({ props }) => {
  const id = localStorage.getItem("id");
  useEffect(() => {
    fetch(`http://localhost:3001/data/userid/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        props.setUserData(data);
        return data;
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Data ID</Table.HeaderCell>
          <Table.HeaderCell>Content</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.userData &&
          props.userData.map((d) => (
            <RowComponent props={d} key={d._id}></RowComponent>
          ))}
      </Table.Body>
    </Table>
  );
};
export default TableComponent;
