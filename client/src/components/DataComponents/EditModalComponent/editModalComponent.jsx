import React from "react";
import { Button, Header, Icon, Modal, Form } from "semantic-ui-react";

const EditModalComponent = ({ props }) => {
  const sendEditData = async () => {
    return fetch("http://localhost:3001/data/dataid", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: `${props.editId}`,
        userId: `${props.editUserId}`,
        content: `${props.editContent}`,
      }),
    })
      .then((res) => {
        return res.json();
    })
      .then((data) => {
        props.setOpen(false);
        // TODO : Update view according to
        // var hej = props.userData && props.userData.filter(d => d._id !== props.editId);
        // props.setUserData(hej);
        // props.setUserData([...props.userdata, data]);
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
              value={props.editContent}
              onChange={(e) => props.setEditContent(e.target.value)}
            />
          </Form.Field>
          <Form.Field></Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => props.setOpen(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" type="submit" onClick={() => sendEditData()}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
export default EditModalComponent;
