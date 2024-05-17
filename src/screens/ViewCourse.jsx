import { Breadcamps } from "../components/Breadcumps";
import { ButtonLayout } from "../components/ButtonLayout";
import { Container } from "../components/Container";
import { FormLayout } from "../components/FormLayout";
import { SelectInput, TextInput } from "../components/Input";
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
    teaching_mode: null,
    name: null,
  });

  useEffect(() => {
    API.getRequest("/course/" + courseId)
      .then((snapshot) => {
        setCourseData(snapshot.course);
        courseData._id = snapshot.course._id
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

      <FormLayout cols={"12"} rows={3}>
        <InputLayout cols={"12"} rows={"3"}>
          <SelectInput
            label={"Institution"}
            placeholder={"Select Institution"}
            options={["M.A.M. College of Engineering & Technology"]}
            value={courseData.institution}
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
            value={courseData.program}
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
            value={courseData.duration}
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
            value={courseData.teaching_mode}
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
            value={courseData.name}
            required={true}
            colStart={6}
            rowStart={2}
            onChange={(value) =>
              setCourseData((prev) => ({ ...prev, name: value }))
            }
          />
        </InputLayout>
      </FormLayout>
    </Container>
  );
};
