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

export const Exams = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Exams, setExams] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);

  useEffect(() => {
    API.getRequest("/exam/all-exam-schedules")
      .then((snapshot) => {
        if (snapshot.success == true) {
          setExams(snapshot.exams);
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
      navigate('/exam/edit/'+selectedRowId)
    }
  }

  const handleBatchView = () => {
    if(selectedRowId != null){
      navigate('/exam/'+selectedRowId)
    }
  }
  return (
    <Container>
      <Breadcamps paths={{ Home: "/", "Exams": "/exam" }} />
      <PageHeading heading={"Exams List"}>
        {/* TODO: Add button components for create, view, edit */}
        {/* Use IconButton component in component folder*/}
        <IconButton
          text={"New Schedule"}
          icon={"ic:round-plus"}
          bgColor={"bg-blue-500"}
          textColor={"white"}
          onClick={() => navigate("/exam/schedule-exam")}
        />
        {/* <IconButton
          text={"View Schedule"}
          icon={"ep:view"}
          bgColor={"bg-blue-500"}
          textColor={"white"}
          onClick={() => handleBatchView()}
        /> */}
        <IconButton
          text={"Edit Schedule"}
          icon={"fa-regular:edit"}
          bgColor={"bg-blue-500"}
          textColor={"white"}
          onClick={() => handleBatchEdit()}
        />
      </PageHeading>
      {/* TODO: Add table for listing all Exams */}
      {/* Use Table component in component folder */}
      <SelectionTable
        headers={headers.ExamScheduleTableHeader}
        data={Exams}
        onSelect={(id) => handleSelection(id)}
        rowId={selectedRowId}
      ></SelectionTable>
    </Container>
  );
};
