import React from "react";
import { Button, Header, Icon, Modal, Form } from "semantic-ui-react";

const EditModalComponent = ({ props }) => {
  const editData = async () => {
    return fetch(`http://localhost:3001/data/dataid/${props.editId}` , {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `${props.editContent}`,
      }),
    })
      .then((res) => {
        return res.json();
    })
      .then((data) => {
        props.setOpen(false);
        let tempState = [...props.userData]
        let oldData = tempState.filter(d => d._id === props.editId)[0];
        let index = tempState.findIndex(d => d === oldData)
        tempState[index].content = props.editContent;
        props.setUserData(tempState);
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
        <Button color="green" type="submit" onClick={() => editData()}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
export default EditModalComponent;
