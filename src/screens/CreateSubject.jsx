import { Breadcamps } from "../components/Breadcumps";
import { ButtonLayout } from "../components/ButtonLayout";
import { Container } from "../components/Container";
import { FormLayout } from "../components/FormLayout";
import { SelectInput, TextInput, ToggleInput } from "../components/Input";
import { InputLayout } from "../components/InputLayout";
import { PageHeading } from "../components/PageHeading";
import { IconButton } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API } from "../api/API";
import { showToast } from "../redux/actions/toastActions";
import { useDispatch } from "react-redux";
import { hasNullValues } from "../services/DataPreprocessing";

export const CreateSubject = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [subjectData, setSubjectData] = useState({
    sub_name: null,
    sub_code: null,
    sub_credits: null,
    sub_type: null,
    sub_mandatory: null,
  });

  const handleSubjectCreation = () => {
    if (hasNullValues(subjectData)) {
      return dispatch(
        showToast({
          type: "error",
          text: "Fill all required fileds",
        })
      );
    }
    API.postRequest("/subject/add", subjectData)
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
        paths={{
          Home: "/",
          Subjects: "/courses/subject",
          "Create subject": "",
        }}
      />
      <PageHeading heading={"Create Course"}></PageHeading>

      <FormLayout cols={"12"} rows={3}>
        <InputLayout cols={"12"} rows={"3"}>
          <TextInput
            label={"Subject name"}
            placeholder={"Enter Subject Name"}
            required={true}
            colStart={1}
            rowStart={1}
            onChange={(value) =>
              setSubjectData((prev) => ({ ...prev, sub_name: value }))
            }
          />
          <TextInput
            label={"Subject code"}
            placeholder={"Enter Subject Code"}
            required={true}
            colStart={1}
            rowStart={2}
            onChange={(value) =>
              setSubjectData((prev) => ({ ...prev, sub_code: value }))
            }
          />
          <TextInput
            label={"Subject credits"}
            placeholder={"Enter Subject Credits"}
            required={true}
            colStart={1}
            rowStart={3}
            onChange={(value) =>
              setSubjectData((prev) => ({ ...prev, sub_credits: value }))
            }
          />
          <SelectInput
            label={"Subject Type"}
            placeholder={"Select Subject Type"}
            options={["Theory", "Lab"]}
            required={true}
            colStart={2}
            rowStart={1}
            onChange={(value) =>
              setSubjectData((prev) => ({ ...prev, sub_type: value }))
            }
          />
          <ToggleInput
            label={"Mandatory course"}
            checked={true}
            required={true}
            colStart={2}
            rowStart={2}
            onChange={(value) =>
              setSubjectData((prev) => ({ ...prev, sub_mandatory: value }))
            }
          />
        </InputLayout>
      </FormLayout>
      <ButtonLayout cols={12} marginTop={14}>
        <IconButton
          text={"Create subject"}
          icon={"ic:round-plus"}
          textColor={"white"}
          bgColor={"bg-blue-700"}
          onClick={() => handleSubjectCreation()}
        />
        <IconButton
          text={"Cancel"}
          icon={"ic:close"}
          textColor={"gray-500"}
          bgColor={"bg-white"}
          onClick={() => navigator("/course/subject")}
        />
      </ButtonLayout>
    </Container>
  );
};
