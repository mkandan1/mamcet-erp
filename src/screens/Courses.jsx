import { useNavigate } from "react-router-dom";
import { Breadcamps } from "../components/Breadcumps";
import { IconButton } from "../components/Button";
import { Container } from "../components/Container";
import { PageHeading } from "../components/PageHeading";
import { SelectionTable } from "../components/Table";

export const Courses = () => {
    const navigate = useNavigate();
  const header = [
    { label: "Subject Code", field: "subjectCode" },
    { label: "Subject Name", field: "subjectName" },
    { label: "Subject Credit", field: "subjectCredit" },
    { label: "Department", field: "department" },
    { label: "Program", field: "program" },
  ];
  return (
    <Container>
      <Breadcamps paths={{ Home: "/", Courses: "/courses/all" }} />
      <PageHeading heading={"Course List"}>
        <IconButton
          text={"New Course"}
          icon={"ic:round-plus"}
          bgColor={"blue-500"}
          textColor={"white"}
          onClick={()=> navigate('/course/create')}
        />
        <IconButton
          text={"View Course"}
          icon={"ep:view"}
          bgColor={"blue-500"}
          textColor={"white"}
        />
        <IconButton
          text={"Edit Course"}
          icon={"fa-regular:edit"}
          bgColor={"blue-500"}
          textColor={"white"}
        />
      </PageHeading>
      <SelectionTable headers={header}></SelectionTable>
    </Container>
  );
};
