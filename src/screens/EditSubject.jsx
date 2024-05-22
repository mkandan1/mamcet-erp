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
import { NavigateAfterTime } from "../services/MainServices";
import { Queries } from "../api/Query";

export const EditSubject = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [subjectId, setSubjectId] = useState(getId());
  const [fetchedQuery, setFetchedQuery] = useState({
    regulations: [],
  });
  const [subjectData, setSubjectData] = useState({
    sub_name: null,
    sub_code: null,
    sub_credits: null,
    sub_type: null,
    sub_regulation: null,
    sub_mandatory: false,
  });

  useEffect(() => {
    Queries.getRegulations()
      .then((snapshot) => {
        setFetchedQuery((prev) => ({ ...prev, regulations: snapshot.queries.regulation }))
      })
      .catch((err) => {
        console.log(err.message);
        dis
      });
  }, []);

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
          })
        );
      });
  }, []);

  const handleSubjectChanges = () => {
    if (hasNullValues(subjectData)) {
      return dispatch(
        showToast({
          type: "error",
          text: "Fill all required fileds",
        })
      );
    }
    API.putRequest("/subject/edit", subjectData)
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

  const handleSubjectDelete = () => {
    API.deleteRequest("/subject/delete", subjectId)
      .then((result) => {
        dispatch(
          showToast({
            type: "success",
            text: "Subject deleted successfully",
          })
        );

        NavigateAfterTime('/course/subject', navigator, 500)
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
        paths={{ Home: "/", Subject: "/course/subject", "Edit subject": "" }}
      />
      <PageHeading heading={"Edit Subject"}></PageHeading>

      <FormLayout>
        <TextInput
          label={"Subject name"}
          placeholder={"Enter Subject Name"}
          required={true}
          value={subjectData.sub_name}
          onChange={(value) =>
            setSubjectData((prev) => ({ ...prev, sub_name: value }))
          }
        />
        <TextInput
          label={"Subject code"}
          placeholder={"Enter Subject Code"}
          required={true}
          value={subjectData.sub_code}
          onChange={(value) =>
            setSubjectData((prev) => ({ ...prev, sub_code: value }))
          }
        />
        <TextInput
          label={"Subject credits"}
          placeholder={"Enter Subject Credits"}
          required={true}
          value={subjectData.sub_credits}
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
          onChange={(value) =>
            setSubjectData((prev) => ({ ...prev, sub_type: value }))
          }
        />
        <SelectInput
          label={"Regulation"}
          placeholder={"Select regulation"}
          required={true}
          value={subjectData.sub_regulation}
          options={fetchedQuery.regulations}
          onChange={(value) =>
            setSubjectData((prev) => ({ ...prev, sub_regulation: value }))
          }
        />
        <ToggleInput
          label={"Mandatory course"}
          checked={subjectData.sub_mandatory}
          required={true}
          value={subjectData.sub_mandatory}
          onChange={(value) =>
            setSubjectData((prev) => ({ ...prev, sub_mandatory: value }))
          }
        />
      </FormLayout>
      <ButtonLayout cols={12} marginTop={14}>
        <IconButton
          text={"Save changes"}
          icon={"ic:baseline-save"}
          textColor={"white"}
          bgColor={"bg-blue-700"}
          onClick={() => handleSubjectChanges()}
        />
        <IconButton
          text={"Delete"}
          icon={"octicon:trash-16"}
          textColor={"white"}
          bgColor={"bg-red-700"}
          onClick={() => handleSubjectDelete()}
        />
        <IconButton
          text={"Go Back"}
          icon={"typcn:arrow-back"}
          textColor={"gray-500"}
          bgColor={"bg-white"}
          onClick={() => navigator("/course/subject")}
        />
      </ButtonLayout>
    </Container>
  );
};
