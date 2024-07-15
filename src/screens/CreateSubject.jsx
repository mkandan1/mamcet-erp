import { Breadcamps } from "../components/Breadcumps";
import { ButtonLayout } from "../components/ButtonLayout";
import { Container } from "../components/Container";
import { FormLayout } from "../components/FormLayout";
import { SelectInput, TextInput, ToggleInput } from "../components/Input";
import { InputLayout } from "../components/InputLayout";
import { PageHeading } from "../components/PageHeading";
import { IconButton } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../api/API";
import { showToast } from "../redux/actions/toastActions";
import { useDispatch } from "react-redux";
import { hasEmptyValues } from "../services/DataPreprocessing";
import { Queries } from "../api/Query";

export const CreateSubject = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [fetchedQuery, setFetchedQuery] = useState({
    regulations: [],
  });
  const [subjectData, setSubjectData] = useState({
    sub_name: "",
    sub_short_name: "",
    sub_code: "",
    sub_credits: "",
    sub_type: "",
    sub_regulation: "",
    sub_mandatory: false,
  });

  useEffect(() => {
    Queries.getRegulations()
      .then((snapshot) => {
        setFetchedQuery((prev)=> ({...prev, regulations: snapshot.queries.regulation}))
      })
      .catch((err) => {
        console.log(err.message);
        dis
      });
  }, []);

  const handleSubjectCreation = () => {
    if (hasEmptyValues(subjectData)) {
      return dispatch(
        showToast({
          type: "error",
          text: "Fill all required fileds",
        })
      );
    }
    console.log(subjectData)
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
        console.trace(err)
      });
      setSubjectData({
        sub_name: "",
        sub_short_name: "",
        sub_code: "",
        sub_credits: "",
        sub_type: "",
        sub_regulation: "",
        sub_mandatory: false,
      })
  };

  return (
    <Container>
      <Breadcamps
        paths={{
          Home: "/",
          Subjects: "/course/subject",
          "Create subject": "",
        }}
      />
      <PageHeading heading={"Create Subject"}></PageHeading>

      <FormLayout cols={"12"} rows={4}>
      <TextInput
            label={"Subject code"}
            placeholder={"Enter Subject Code"}
            value={subjectData.sub_code}
            required={true}
            colStart={1}
            rowStart={3}
            onChange={(value) =>
              setSubjectData((prev) => ({ ...prev, sub_code: value }))
            }
          />
          <TextInput
            label={"Subject name"}
            placeholder={"Enter Subject Name"}
            value={subjectData.sub_name}
            required={true}
            colStart={1}
            rowStart={1}
            onChange={(value) =>
              setSubjectData((prev) => ({ ...prev, sub_name: value }))
            }
          />
          <TextInput
            label={"Subject Short Name"}
            placeholder={"Enter Subject Short Name"}
            value={subjectData.sub_short_name}
            required={true}
            colStart={1}
            rowStart={2}
            onChange={(value) =>
              setSubjectData((prev) => ({ ...prev, sub_short_name: value }))
            }
          />
          <TextInput
            label={"Subject credits"}
            placeholder={"Enter Subject Credits"}
            value={subjectData.sub_credits}
            required={true}
            colStart={2}
            rowStart={1}
            onChange={(value) =>
              setSubjectData((prev) => ({ ...prev, sub_credits: value }))
            }
          />
          <SelectInput
            label={"Subject Type"}
            placeholder={"Select Subject Type"}
            options={["Theory", "Lab"]}
            value={subjectData.sub_type}
            required={true}
            colStart={2}
            rowStart={2}
            onChange={(value) =>
              setSubjectData((prev) => ({ ...prev, sub_type: value }))
            }
          />
          <SelectInput 
            label={'Regulation'}
            placeholder={'Select regulation'}
            value={subjectData.sub_regulation}
            required={true}
            colStart={2}
            rowStart={3}
            options={fetchedQuery.regulations}
            onChange={(value) =>
              setSubjectData((prev) => ({ ...prev, sub_regulation: value }))
            }
          />
          <ToggleInput
            label={"Mandatory course"}
            checked={subjectData.sub_mandatory}
            required={true}
            colStart={2}
            rowStart={4}
            onChange={(value) =>
              setSubjectData((prev) => ({ ...prev, sub_mandatory: value }))
            }
          />
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
