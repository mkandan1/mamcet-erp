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
import { Queries } from "../api/Query";

export const CreateCourse = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [courseData, setCourseData] = useState({
    institution: null,
    program: null,
    duration: null,
    teaching_mode: null,
    name: null,
    regulation: null,
  });
  const [fetchedData, setFetchedData] = useState({
    regulations: []
  })

  useEffect(() => {
    Queries.getRegulations()
      .then((snapshot) => {
        setFetchedData((prev)=> ({...prev, regulations: snapshot.queries.regulation}))
      })
      .catch((err) => {
        console.log(err.message);
        dis
      });
  }, []);

  const handleCourseCreation = () => {
    if (hasNullValues(courseData)) {
      return dispatch(
        showToast({
          type: "error",
          text: "Fill all required fileds",
        })
      );
    }
    API.postRequest("/course/add", courseData)
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

  return (
    <Container>
      <Breadcamps
        paths={{ Home: "/", Courses: "/courses/all", "Create course": "" }}
      />
      <PageHeading heading={"Create Course"}></PageHeading>

      <FormLayout cols={"12"} rows={8}>
        <InputLayout cols={"12"} rows={12}>
          <SelectInput
            label={"Institution"}
            placeholder={"Select Institution"}
            options={["M.A.M. College of Engineering & Technology"]}
            required={true}
            colStart={1}
            rowStart={1}
            onChange={(value) =>
              setCourseData((prev) => ({ ...prev, institution: value }))
            }
          />
          <SelectInput
            label={"Program"}
            placeholder={"Select Program"}
            options={["PG", "UG"]}
            required={true}
            colStart={1}
            rowStart={2}
            onChange={(value) =>
              setCourseData((prev) => ({ ...prev, program: value }))
            }
          />
          <SelectInput
            label={"Duration"}
            placeholder={"Select Duration"}
            required={true}
            options={["1 YEAR", "2 YEARS", "3 YEARS", "4 YEARS", "5 YEARS"]}
            colStart={1}
            rowStart={3}
            onChange={(value) =>
              setCourseData((prev) => ({ ...prev, duration: value }))
            }
          />
          <SelectInput
            label={"Teaching mode"}
            placeholder={"Select Teaching mode"}
            required={true}
            options={["Online", "Offline"]}
            colStart={6}
            rowStart={1}
            onChange={(value) =>
              setCourseData((prev) => ({ ...prev, teaching_mode: value }))
            }
          />
          <TextInput
            label={"Course name"}
            placeholder={"Enter course name"}
            required={true}
            colStart={6}
            rowStart={2}
            onChange={(value) =>
              setCourseData((prev) => ({ ...prev, name: value }))
            }
          />
          <CustomCreateSelect
            label={"Regulation"}
            options={fetchedData.regulations}
            onChange={(value) =>
              setCourseData((prev) => ({ ...prev, regulation: value }))
            }
            value={courseData.regulation}
          />
        </InputLayout>
      </FormLayout>

      <ButtonLayout cols={12} marginTop={14}>
        <IconButton
          text={"Create course"}
          icon={"ic:round-plus"}
          textColor={"white"}
          bgColor={"bg-blue-700"}
          onClick={() => handleCourseCreation()}
        />
        <IconButton
          text={"Cancel"}
          icon={"ic:close"}
          textColor={"gray-500"}
          bgColor={"bg-white"}
          onClick={() => navigator("/course/all")}
        />
      </ButtonLayout>
    </Container>
  );
};
