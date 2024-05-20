import { Breadcamps } from "../components/Breadcumps";
import { Container } from "../components/Container";
import { PageHeading } from "../components/PageHeading";
import { IconButton } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { SelectionTable } from "../components/Table";
import { API } from "../api/API";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { headers } from "../data/constants";

export const Batches = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Batches, setBatches] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);

  useEffect(() => {
    API.getRequest("/batch")
      .then((snapshot) => {
        if (snapshot.success == true) {
          setBatches(snapshot.batches);
          console.log(snapshot)
        }
      })
      .catch((err) => {
        dispatch(
          showToast({
            type: "error",
            text: err.response.data.message,
          })
        );
      });
  }, []);

  const handleSelection = (id) => {
    if (selectedRowId == id) {
      return setSelectedRowId(null);
    }
    setSelectedRowId(id);
  };
  
  const handleBatchEdit = () => {
    if(selectedRowId != null){
      navigate('/course/batch/edit/'+selectedRowId)
    }
  }

  const handleBatchView = () => {
    if(selectedRowId != null){
      navigate('/course/batch/'+selectedRowId)
    }
  }
  return (
    <Container>
      <Breadcamps paths={{ Home: "/", "Batch List": "/batch/batch" }} />
      <PageHeading heading={"Batch List"}>
        {/* TODO: Add button components for create, view, edit */}
        {/* Use IconButton component in component folder*/}
        <IconButton
          text={"New Batch"}
          icon={"ic:round-plus"}
          bgColor={"bg-blue-500"}
          textColor={"white"}
          onClick={() => navigate("/course/batch/create")}
        />
        <IconButton
          text={"View Batch"}
          icon={"ep:view"}
          bgColor={"bg-blue-500"}
          textColor={"white"}
          onClick={() => handleBatchView()}
        />
        <IconButton
          text={"Edit Batch"}
          icon={"fa-regular:edit"}
          bgColor={"bg-blue-500"}
          textColor={"white"}
          onClick={() => handleBatchEdit()}
        />
      </PageHeading>
      {/* TODO: Add table for listing all batches */}
      {/* Use Table component in component folder */}
      <SelectionTable
        headers={headers.batchesTableHeader}
        data={Batches}
        onSelect={(id) => handleSelection(id)}
        rowId={selectedRowId}
      ></SelectionTable>
    </Container>
  );
};
