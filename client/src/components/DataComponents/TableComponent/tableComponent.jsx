import React, { useEffect } from "react";
import { Table, Button } from "semantic-ui-react";

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

  const sendDeleteData = (id) => {
    return fetch(`http://localhost:3001/data/dataid/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res, err) => {
      if (res.status === 200){
        props.setUserData(props.userData.filter((d) => d._id !== id));
      } else {
        console.log(`Delete failed : ${err}`)
      }
    });
  };

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
            <Table.Row key={d._id}>
            <Table.Cell>{d._id}</Table.Cell>
            <Table.Cell>{d.content}</Table.Cell>
            <Table.Cell>
              <Button
                onClick={() => {
                  sendDeleteData(d._id);
                }}
              >
                Delete
              </Button>
            </Table.Cell>
          </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};
export default TableComponent;
