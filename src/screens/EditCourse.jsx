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
import { NavigateAfterTime } from "../services/MainServices";
import { Queries } from "../api/Query";

export const EditCourse = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [courseId, setCourseID] = useState(getId());
  const [fetchedQuery, setFetchedQuery] = useState({
    regulations: [],
    departments: [],
  });
  const [courseData, setCourseData] = useState({
    institution: null,
    program: null,
    duration: null,
    teaching_mode: null,
    name: null,
    regulation: null,
    department: null
  });

  useEffect(() => {
    Queries.getRegulations()
      .then((snapshot) => {
        setFetchedQuery((prev)=> ({...prev, regulations: snapshot.queries.regulation}))
      })
      .catch((err) => {
        console.log(err.message);
      });
      Queries.getDepartment()
      .then((snapshot) => {
        setFetchedQuery((prev)=> ({...prev, departments: snapshot.queries.department}))
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

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
          })
        );
      });
  }, []);

  const handleCourseChanges = () => {
    if (hasNullValues(courseData)) {
      return dispatch(
        showToast({
          type: "error",
          text: "Fill all required fileds",
        })
      );
    }
    API.putRequest("/course/edit", courseData)
      .then((data) => {
        if (data.success == true) {
          dispatch(
            showToast({
              type: "success",
              text: data.message,
            })
          );
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
  };

  const handleCourseDelete = () => {
    API.deleteRequest("/course/delete", courseId)
      .then((result) => {
        dispatch(
          showToast({
            type: "success",
            text: "Course deleted successfully",
          })
        );

        NavigateAfterTime('/course/all', navigator, 500)
      })
      .catch((err) => {
        dispatch(
          showToast({
            type: "error",
            text: err.message,
          })
        );
      });
  };

  return (
    <Container>
      <Breadcamps
        paths={{ Home: "/", Courses: "/course/all", "Edit course": "" }}
      />
      <PageHeading heading={"Edit Course"}></PageHeading>

      <FormLayout>
          <SelectInput
            label={"Institution"}
            placeholder={"Select Institution"}
            options={["Selvamm Arts and Science College"]}
            value={courseData.institution}
            required={true}
            onChange={(value) =>
              setCourseData((prev) => ({ ...prev, institution: value }))
            }
          />
          <SelectInput
            label={"Program"}
            placeholder={"Select Program"}
            options={["PG", "UG"]}
            value={courseData.program}
            required={true}
            onChange={(value) =>
              setCourseData((prev) => ({ ...prev, program: value }))
            }
          />
          <CustomCreateSelect
            label={"Department"}
            placeholder={"Select Department"}
            options={fetchedQuery.departments}
            required={true}
            value={courseData.department}
            onChange={(value) =>
              setCourseData((prev) => ({ ...prev, department: value }))
            }
          />
          <SelectInput
            label={"Duration"}
            placeholder={"Select Duration"}
            value={courseData.duration}
            required={true}
            options={["1 YEAR", "2 YEARS", "3 YEARS", "4 YEARS", "5 YEARS"]}
            onChange={(value) =>
              setCourseData((prev) => ({ ...prev, duration: value }))
            }
          />
          <SelectInput
            label={"Teaching mode"}
            placeholder={"Select Teaching mode"}
            value={courseData.teaching_mode}
            required={true}
            options={["Online", "Offline"]}
            onChange={(value) =>
              setCourseData((prev) => ({ ...prev, teaching_mode: value }))
            }
          />
          <TextInput
            label={"Course name"}
            placeholder={"Enter course name"}
            value={courseData.name}
            required={true}
            onChange={(value) =>
              setCourseData((prev) => ({ ...prev, name: value }))
            }
          />
          <CustomCreateSelect
            label={"Regulation"}
            value={courseData.regulation}
            options={[]}
            disabled={true}
            onChange={(value) =>
              setCourseData((prev) => ({ ...prev, regulation: value }))
            }
          />
      </FormLayout>
      <ButtonLayout cols={12} marginTop={14}>
        <IconButton
          text={"Save changes"}
          icon={"ic:baseline-save"}
          textColor={"white"}
          bgColor={"bg-blue-700"}
          onClick={() => handleCourseChanges()}
        />
        <IconButton
          text={"Delete"}
          icon={"octicon:trash-16"}
          textColor={"white"}
          bgColor={"bg-red-700"}
          onClick={() => handleCourseDelete()}
        />
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
