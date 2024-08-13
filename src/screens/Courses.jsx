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

export const Courses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const header = [
    { label: "Institution", field: "institution" },
    { label: "Program", field: "program" },
    { label: "Course Name", field: "name" },
    { label: "Duration", field: "duration" },
    { label: "Teaching Mode", field: "teaching_mode" },
    { label: "Regulation", field: "regulation" },
  ];

  useEffect(() => {
    API.getRequest("/course")
      .then((snapshot) => {
        if (snapshot.success == true) {
          setCourses(snapshot.courses);
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
      navigate('/course/edit/'+selectedRowId)
    }
  }

  const handleCourseView = () => {
    if(selectedRowId != null){
      navigate('/course/'+selectedRowId)
    }
  }

  return (
    <Container title={'Courses'}>
      <Breadcamps paths={{ Home: "/", Courses: "/courses/all" }} />
      <PageHeading heading={"Course List"}>
        <IconButton
          text={"New Course"}
          icon={"ic:round-plus"}
          bgColor={"bg-blue-500"}
          textColor={"white"}
          onClick={() => navigate("/course/create")}
        />
        <IconButton
          text={"View Course"}
          icon={"ep:view"}
          bgColor={"bg-blue-500"}
          textColor={"white"}
          onClick={()=> handleCourseView()}
        />
        <IconButton
          text={"Edit Course"}
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
