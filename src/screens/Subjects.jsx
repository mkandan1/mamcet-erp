import { useNavigate } from "react-router-dom";
import { Breadcamps } from "../components/Breadcumps";
import { IconButton } from "../components/Button";
import { Container } from "../components/Container";
import { PageHeading } from "../components/PageHeading";
import { SelectionTable } from "../components/Table";
import { useEffect, useState } from "react";
import { API } from "../api/API";
import { useDispatch } from "react-redux";
import { showToast } from "../redux/actions/toastActions";

export const Subjects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const header = [
    { label: "Subject Name", field: "sub_name" },
    { label: "Subject Code", field: "sub_code" },
    { label: "Subject Credits", field: "sub_credits" },
    { label: "Subject Type", field: "sub_type" },
    { label: "Subject Regulation", field: "sub_regulation" },
  ];

  useEffect(() => {
    API.getRequest("/subject")
      .then((snapshot) => {
        if (snapshot.success == true) {
          setCourses(snapshot.subjects);
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
  
  const handleCourseEdit = () => {
    if(selectedRowId != null){
      navigate('/course/subject/edit/'+selectedRowId)
    }
  }

  const handleCourseView = () => {
    if(selectedRowId != null){
      navigate('/course/subject/'+selectedRowId)
    }
  }

  return (
    <Container>
      <Breadcamps paths={{ Home: "/", Subjects: "/course/subject" }} />
      <PageHeading heading={"Subject List"}>
        <IconButton
          text={"New Subject"}
          icon={"ic:round-plus"}
          bgColor={"bg-blue-500"}
          textColor={"white"}
          onClick={() => navigate("/course/subject/create")}
        />
        <IconButton
          text={"View Subject"}
          icon={"ep:view"}
          bgColor={"bg-blue-500"}
          textColor={"white"}
          onClick={()=> handleCourseView()}
        />
        <IconButton
          text={"Edit Subject"}
          icon={"fa-regular:edit"}
          bgColor={"bg-blue-500"}
          textColor={"white"}
          onClick={()=> handleCourseEdit()}
        />
      </PageHeading>
      <SelectionTable
        headers={header}
        data={courses}
        onSelect={(id) => handleSelection(id)}
        rowId={selectedRowId}
      ></SelectionTable>
    </Container>
  );
};
