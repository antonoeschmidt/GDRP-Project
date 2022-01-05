/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer } from "react";
import { Table, Button } from "semantic-ui-react";
const _ = require("lodash");

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_SORT":
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      }
      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: "ascending",
      };
    case "SET":
      return {
        column: action.column,
        data: action.data,
        direction: null,
      };
    default:
      throw new Error();
  }
}

const TableComponent = ({ props }) => {
  const id = localStorage.getItem("id");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/data/userid/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
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

  const [state, dispatch] = useReducer(reducer, {
    column: null,
    data: props.userData,
    direction: null,
  });
  const { column, direction } = state;

  useEffect(() => {
    if (!props.userData) return;
    dispatch({ ...state, type: "SET", data: props.userData });
  }, [props.userData]);

  useEffect(() => {
    props.setUserData(state.data);
  }, [state]);

  const deleteData = (id) => {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/data/id/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }).then((res, err) => {
      if (res.status === 200) {
        props.setUserData(props.userData.filter((d) => d._id !== id));
      } else {
        console.log(`Delete failed : ${err}`);
      }
    });
  };

  return (
    <Table striped sortable fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            style={{ width: 250 }}
            sorted={column === "_id" ? direction : null}
            onClick={() => dispatch({ type: "CHANGE_SORT", column: "_id" })}
          >
            Data ID
          </Table.HeaderCell>
          <Table.HeaderCell
            style={{ width: 200 }}
            sorted={column === "dataType" ? direction : null}
            onClick={() =>
              dispatch({ type: "CHANGE_SORT", column: "dataType" })
            }
          >
            Data type
          </Table.HeaderCell>
          <Table.HeaderCell
            colSpan="2"
            sorted={column === "content" ? direction : null}
            onClick={() => dispatch({ type: "CHANGE_SORT", column: "content" })}
          >
            Content
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.userData &&
          props.userData.map((d) => (
            <Table.Row key={d._id}>
              <Table.Cell>{d._id}</Table.Cell>
              <Table.Cell>{d.dataType}</Table.Cell>
              <Table.Cell style={{ width: 800 }}>{d.content}</Table.Cell>
              <Table.Cell label="edit" style={{ textAlign: "right" }}>
                <Button
                  onClick={() => {
                    props.setEditModal(true);
                    props.setEdit({
                      _id: d._id,
                      content: d.content,
                      dataType: d.dataType,
                    });
                  }}
                >
                  Edit
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  negative
                  onClick={() => {
                    deleteData(d._id);
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
