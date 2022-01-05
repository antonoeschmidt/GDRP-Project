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
  const [edit, setEdit] = useState({});
  const [userData, setUserData] = useState(undefined);

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
            setEditModal,
            setEdit
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
          edit,
          setEdit,
          userData,
          setUserData,
        }}
      />
    </div>
  );
};

export default DataPage;
