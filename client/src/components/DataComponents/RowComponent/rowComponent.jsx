import React from "react";
import { Table } from "semantic-ui-react";

const RowComponent = ({data}) => {
  return (
    <Table.Row>
      <Table.Cell>{data._id}</Table.Cell>
      <Table.Cell>{data.content}</Table.Cell>
    </Table.Row>
  );
};

export default RowComponent;
