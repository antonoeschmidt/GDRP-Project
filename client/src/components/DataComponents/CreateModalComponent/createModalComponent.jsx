import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Modal, Form, Dropdown } from "semantic-ui-react";
import { dataTypes } from "../../../utils/utils";

const CreateModalComponent = ({ props }) => {
  const [content, setContent] = useState("");
  const id = localStorage.getItem("id");
  const [dataType, setDataType] = useState();
  const [dataTypesOptions, setdataTypesOptions] = useState([
    { key: 0, text: "" },
  ]);

  useEffect(() => {
    let arr = [];
    for (let key in dataTypes) {
      arr.push({ key: key, value: key, text: dataTypes[key] });
    }
    setdataTypesOptions(arr);
  }, []);

  const createData = async () => {
    if (!content || !dataType) {
      alert("Please input all data");
      return;
    }
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/data`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        content: `${content}`,
        userId: `${id}`,
        dataType: `${dataType}`,
      }),
    })
      .then((res) => {
        setContent("");
        setDataType("");
        return res.json();
      })
      .then((data) => {
        props.setOpen(false);
        props.setUserData([...props.userData, data]);
        return data;
      });
  };

  return (
    <Modal
      closeIcon
      open={props.open}
      onClose={() => props.setOpen(false)}
      onOpen={() => props.setOpen(true)}
    >
      <Header icon="archive" content="New data entry" />
      <Modal.Content>
        <Form id="createForm">
          <Form.Field required>
            <label>Content</label>
            <Form.Input
              placeholder="Content"
              onChange={(e) => setContent(e.target.value)}
              error={content ? false : true}
            />
          </Form.Field>
          <Form.Field required>
            <label>Data Type</label>
            <Dropdown
              placeholder="Data type"
              fluid
              search
              selection
              options={dataTypesOptions}
              onChange={(event, data) => setDataType(data.value)}
              error={dataType ? false : true}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => props.setOpen(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button
          color="green"
          form="createForm"
          type="submit"
          onClick={() => createData()}
        >
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CreateModalComponent;
