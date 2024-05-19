import { Breadcamps } from "../components/Breadcumps";
import { ButtonLayout } from "../components/ButtonLayout";
import { Container } from "../components/Container";
import { FormLayout } from "../components/FormLayout";
import {
  CustomCreateSelect,
  SelectInput,
  TextInput,
  ToggleInput,
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

export const ViewSubject = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [subjectId, setSubjectId] = useState(getId());
  const [subjectData, setSubjectData] = useState({
    sub_name: null,
    sub_code: null,
    sub_credits: null,
    sub_type: null,
    sub_regulation: null,
    sub_mandatory: false,
  });

  useEffect(() => {
    API.getRequest("/subject/" + subjectId)
      .then((snapshot) => {
        setSubjectData(snapshot.subject);
        subjectData._id = snapshot.subject._id;
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
          <TextInput
            label={"Subject name"}
            placeholder={"Enter Subject Name"}
            required={true}
            value={subjectData.sub_name}
            colStart={1}
            rowStart={1}
            disabled={true}
            onChange={(value) =>
              setSubjectData((prev) => ({ ...prev, sub_name: value }))
            }
          />
          <TextInput
            label={"Subject code"}
            placeholder={"Enter Subject Code"}
            required={true}
            value={subjectData.sub_code}
            colStart={1}
            rowStart={2}
            disabled={true}
            onChange={(value) =>
              setSubjectData((prev) => ({ ...prev, sub_code: value }))
            }
          />
          <TextInput
            label={"Subject credits"}
            placeholder={"Enter Subject Credits"}
            required={true}
            value={subjectData.sub_credits}
            colStart={1}
            rowStart={3}
            disabled={true}
            onChange={(value) =>
              setSubjectData((prev) => ({ ...prev, sub_credits: value }))
            }
          />
          <SelectInput
            label={"Subject Type"}
            placeholder={"Select Subject Type"}
            options={["Theory", "Lab"]}
            required={true}
            value={subjectData.sub_type}
            colStart={2}
            rowStart={1}
            disabled={true}
            onChange={(value) =>
              setSubjectData((prev) => ({ ...prev, sub_type: value }))
            }
          />
          <SelectInput
            label={"Regulation"}
            placeholder={"Select regulation"}
            required={true}
            value={subjectData.sub_regulation}
            options={[subjectData.sub_regulation]}
            colStart={2}
            rowStart={2}
            disabled={true}
            onChange={(value) =>
              setSubjectData((prev) => ({ ...prev, sub_regulation: value }))
            }
          />
          <ToggleInput
            label={"Mandatory course"}
            checked={subjectData.sub_mandatory}
            required={true}
            value={subjectData.sub_mandatory}
            colStart={2}
            rowStart={3}
            disabled={true}
            onChange={(value) =>
              setSubjectData((prev) => ({ ...prev, sub_mandatory: value }))
            }
          />
        </InputLayout>
      </FormLayout>
      <ButtonLayout cols={12} marginTop={14}>
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
