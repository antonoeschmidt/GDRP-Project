import React, {useState, useEffect } from "react";
import { Button, Header, Icon, Modal, Form, Dropdown } from "semantic-ui-react";
import { dataTypes } from "../../../utils/utils";

const EditModalComponent = ({ props }) => {
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

  const editData = async () => {
    return fetch(
      `${process.env.REACT_APP_BACKEND_URL}/data/id/${props.edit._id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          content: `${props.edit.content}`,
          dataType: `${dataType}`
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        props.setOpen(false);
        let tempState = [...props.userData];
        let oldData = tempState.filter((d) => d._id === props.edit._id)[0];
        let index = tempState.findIndex((d) => d === oldData);
        tempState[index].content = props.edit.content;
        tempState[index].dataType = dataType;
        props.setUserData(tempState);
        return data;
      });
  };

  return (
    <Modal
      closeIcon
      open={props.open}
      onClose={() => props.setOpen(false)}
      onOpen={() => props.setOpen(true)}>
      <Header icon="archive" content="New data entry" />
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Content</label>
            <input
              value={props.edit.content}
              onChange={(e) => props.setEdit({...props.edit, content: e.target.value})}
            />
          </Form.Field>
          <label>Data Type</label>
          <Dropdown
            fluid
            search
            selection
            defaultValue={props.edit.dataType}
            options={dataTypesOptions}
            onChange={(event, data) => setDataType(data.value)}
          />
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
