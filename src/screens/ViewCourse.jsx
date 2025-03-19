import { Breadcamps } from "../components/Breadcumps";
import { ButtonLayout } from "../components/ButtonLayout";
import { Container } from "../components/Container";
import { FormLayout } from "../components/FormLayout";
import {
  CustomCreateSelect,
  SelectInput,
  TextInput,
} from "../components/Input";
import { InputLayout } from "../components/InputLayout";
import { PageHeading } from "../components/PageHeading";
import { IconButton } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../api/API";
import { showToast } from "../redux/actions/toastActions";
import { useDispatch } from "react-redux";
import { hasNullValues } from "../services/DataPreprocessing";
import { getId } from "../services/URLProcessing";

export const ViewCourse = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [courseId, setCourseID] = useState(getId());
  const [courseData, setCourseData] = useState({
    institution: null,
    program: null,
    duration: null,
    department: null,
    teaching_mode: null,
    name: null,
    regulation: null,
  });

  useEffect(() => {
    API.getRequest("/course/" + courseId)
      .then((snapshot) => {
        setCourseData(snapshot.course);
        courseData._id = snapshot.course._id;
      })
      .catch((err) => {
        dispatch(
          showToast({
            type: "error",
            text: err.response.data.message,
            icon: "carbon:close-filled",
          })
        );
      });
  }, []);

  return (
    <Container>
      <Breadcamps
        paths={{ Home: "/", Courses: "/course/all", "View course": "" }}
      />
      <PageHeading heading={"View Course"}></PageHeading>

      <FormLayout>
        <SelectInput
          label={"Institution"}
          placeholder={"Select Institution"}
          options={["Selvamm Arts and Science College"]}
          required={true}
          value={courseData.institution}
          colStart={"col-start-1"}
          rowStart={"row-start-1"}
          disabled={true}
        />
        <SelectInput
          label={"Program"}
          placeholder={"Select Program"}
          options={["PG", "UG"]}
          required={true}
          value={courseData.program}
          colStart={"col-start-1"}
          rowStart={"row-start-2"}
          onChange={(value) =>
            setCourseData((prev) => ({ ...prev, program: value }))
          }
        />
        <CustomCreateSelect
          label={"Department"}
          placeholder={"Select Department"}
          required={true}
          colStart={"col-start-1"}
          rowStart={"row-start-3"}
          value={courseData.department}
          options={[courseData.department]}
          onChange={(value) =>
            setCourseData((prev) => ({ ...prev, department: value }))
          }
        />
        <SelectInput
          label={"Duration"}
          placeholder={"Select Duration"}
          required={true}
          value={courseData.duration}
          options={["1 YEAR", "2 YEARS", "3 YEARS", "4 YEARS", "5 YEARS"]}
          colStart={"col-start-5"}
          rowStart={"row-start-1"}
          onChange={(value) =>
            setCourseData((prev) => ({ ...prev, duration: value }))
          }
        />
        <SelectInput
          label={"Teaching mode"}
          placeholder={"Select Teaching mode"}
          required={true}
          value={courseData.teaching_mode}
          options={["Online", "Offline"]}
          colStart={"col-start-5"}
          rowStart={"row-start-2"}
          onChange={(value) =>
            setCourseData((prev) => ({ ...prev, teaching_mode: value }))
          }
        />
        <TextInput
          label={"Course name"}
          placeholder={"Enter course name"}
          required={true}
          value={courseData.name}
          colStart={"col-start-5"}
          rowStart={"row-start-3"}
          onChange={(value) =>
            setCourseData((prev) => ({ ...prev, name: value }))
          }
        />
        <CustomCreateSelect
          label={"Regulation"}
          onChange={(value) =>
            setCourseData((prev) => ({ ...prev, regulation: value }))
          }
          required={true}
          colStart={"col-start-8"}
          rowStart={"row-start-1"}
          options={[courseData.regulation]}
          value={courseData.regulation}
        />
      </FormLayout>
      <ButtonLayout cols={12} marginTop={14}>
        <IconButton
          text={"Go Back"}
          icon={"typcn:arrow-back"}
          textColor={"gray-500"}
          bgColor={"bg-white"}
          onClick={() => navigator("/course/all")}
        />
      </ButtonLayout>
    </Container>
  );
};
