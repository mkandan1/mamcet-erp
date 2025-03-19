import { Breadcamps } from "../components/Breadcumps";
import { ButtonLayout } from "../components/ButtonLayout";
import { Container } from "../components/Container";
import { FormLayout } from "../components/FormLayout";
import {
  CustomCreateSelect,
  CustomInput,
  FileInput,
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
import { SelectionTable } from "../components/Table";
import { headers } from "../data/constants";
import { StudentDataImportDialog } from "../components/Dialog";
import { ShowStudentsImportDialog } from "../redux/actions/dialogActions";

export const ViewBatch = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [BatchId, setBatchId] = useState(getId());
  const [BatchData, setBatchData] = useState({
    institution: null,
    program: null,
    department: null,
    course_name: null,
    batch_name: null,
    academic_year: null,
    regulation: null,
    students: [],
  });

  useEffect(() => {
    API.getRequest("/batch/" + BatchId)
      .then((snapshot) => {
        setBatchData(snapshot.batch);
        BatchData._id = snapshot.batch._id;
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
          value={BatchData.institution}
          onChange={(value) =>
            setBatchData((prev) => ({ ...prev, institution: value }))
          }
        />
        <SelectInput
          label={"Program"}
          placeholder={"Select Program"}
          options={["PG", "UG"]}
          required={true}
          value={BatchData.program}
          onChange={(value) =>
            setBatchData((prev) => ({ ...prev, program: value }))
          }
        />
        <SelectInput
          label={"Department"}
          placeholder={"Select Department"}
          options={[BatchData.department]}
          required={true}
          value={BatchData.department}
          onChange={(value) =>
            setBatchData((prev) => ({ ...prev, department: value }))
          }
        />

        <SelectInput
          label={"Regulation"}
          placeholder={"Select Regulation"}
          options={[BatchData.regulations]}
          required={true}
          value={BatchData.regulation}
          onChange={(value) =>
            setBatchData((prev) => ({ ...prev, regulation: value }))
          }
        />
        <SelectInput
          label={"Course"}
          placeholder={"Select Course"}
          options={[BatchData.courses]}
          required={true}
          value={BatchData.course_name}
          onChange={(value) =>
            setBatchData((prev) => ({ ...prev, course_name: value }))
          }
        />
        <TextInput
          label={"Batch name"}
          placeholder={"Enter Batch name"}
          required={true}
          value={BatchData.batch_name}
          onChange={(value) =>
            setBatchData((prev) => ({ ...prev, batch_name: value }))
          }
        />
        <SelectInput
          label={"Academic Year"}
          placeholder={"Select Academic"}
          options={[BatchData.academic_year]}
          value={BatchData.academic_year}
          onChange={(value) =>
            setBatchData((prev) => ({ ...prev, academic_year: value }))
          }
        />
        <CustomInput label={'Students'}>
          <IconButton
            text={'Show Students'}
            textColor={'white'}
            bgColor={'bg-blue-500'}
            icon={'mdi:eye'}
            onClick={() => dispatch(ShowStudentsImportDialog())}
          />
        </CustomInput>
      </FormLayout>
      <StudentDataImportDialog studentsProp={BatchData.students}/>
      <ButtonLayout cols={12} marginTop={14}>
        <IconButton
          text={"Go Back"}
          icon={"typcn:arrow-back"}
          textColor={"gray-500"}
          bgColor={"bg-white"}
          onClick={() => navigator("/course/Batch")}
        />
      </ButtonLayout>
    </Container>
  );
};
