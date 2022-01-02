import React, { useState } from "react";
import { Button, Header, Icon, Modal, Form } from "semantic-ui-react";

const CreateModalComponent = ({ props }) => {
  const [content, setContent] = useState("");
  const id = localStorage.getItem("id");

  const createData = async () => {
    return fetch("http://localhost:3001/data", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `${content}`,
        userId: `${id}`,
      }),
    })
      .then((res) => {
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
        <Form>
          <Form.Field>
            <label>Content</label>
            <input
              placeholder="Content"
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Field>
          <Form.Field></Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => props.setOpen(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" type="submit" onClick={() => createData()}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CreateModalComponent;