import React, { useState } from "react";
import "./dataPage.css";
import HomePageMenu from "../../components/Home/homePageMenu";
import TableComponent from "../../components/DataComponents/TableComponent/tableComponent";
import { Segment, Button } from "semantic-ui-react";
import "./dataPage.css";
import ModalComponent from "../../components/DataComponents/ModalComponent/modalComponent";

const DataPage = () => {
  const [open, setOpen] = useState(false);
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
        <Button positive onClick={() => setOpen(true)}>
          Create data
        </Button>
        <TableComponent props={{userData, setUserData}}></TableComponent>
      </Segment>
      <ModalComponent props={{open, setOpen, userData, setUserData}}></ModalComponent>
    </div>
  );
};

export default DataPage;
