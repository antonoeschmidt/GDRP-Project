import React, { useState } from "react";
import { Segment, Button } from "semantic-ui-react";
import HomePageMenu from "../../components/Home/homePageMenu";
import TableComponent from "../../components/DataComponents/TableComponent/tableComponent";
import CreateModalComponent from "../../components/DataComponents/CreateModalComponent/createModalComponent";
import "./dataPage.css";
import EditModalComponent from "../../components/DataComponents/EditModalComponent/editModalComponent";

const DataPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [userData, setUserData] = useState(undefined);
  const [editId, setEditId] = useState("");
  const [editUserId, setEditUserId] = useState("");

  return (
    <div>
      <Segment
        inverted
        textAlign="center"
        style={{
          minHeight: 700,
          padding: "1em 0em" /* background: "#F7F8FC" */,
        }}
        vertical
      >
        <HomePageMenu activeMenu={"data"} /> <br />
        <Button positive onClick={() => setCreateModal(true)}>
          Create data
        </Button>
        <TableComponent
          props={{
            userData,
            setUserData,
            editModal,
            setEditModal,
            editContent,
            setEditContent,
            editId,
            setEditId,
            editUserId,
            setEditUserId,
          }}
        ></TableComponent>
      </Segment>
      <CreateModalComponent
        props={{
          open: createModal,
          setOpen: setCreateModal,
          userData,
          setUserData,
        }}
      />
      <EditModalComponent
        props={{
          open: editModal,
          setOpen: setEditModal,
          editContent,
          setEditContent,
          editId,
          setEditId,
          editUserId,
          setEditUserId,
          userData,
          setUserData,
        }}
      />
    </div>
  );
};

export default DataPage;
