import React from "react";
import { Table, Button } from "semantic-ui-react";

const RowComponent = ({ props }) => {
  const sendDeleteData = (id) => {
    return fetch(`http://localhost:3001/data/dataid/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <Table.Row>
      <Table.Cell>{props._id}</Table.Cell>
      <Table.Cell>{props.content}</Table.Cell>
      <Table.Cell>
        <Button
          onClick={() => {
            sendDeleteData(props._id);
          }}
        >
          Delete
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default RowComponent;
