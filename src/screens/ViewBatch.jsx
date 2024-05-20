import { Breadcamps } from "../components/Breadcumps";
import { ButtonLayout } from "../components/ButtonLayout";
import { Container } from "../components/Container";
import { FormLayout } from "../components/FormLayout";
import {
  CustomCreateSelect,
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
    API.getRequest("/batch/"+BatchId)
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

      <FormLayout cols={"12"} rows={12}>
        <InputLayout cols={"12"} rows={12}>
          <SelectInput
            label={"Institution"}
            placeholder={"Select Institution"}
            options={["M.A.M. College of Engineering & Technology"]}
            required={true}
            colStart={1}
            rowStart={1}
            value={BatchData.institution}
            disabled={true}
            onChange={(value) =>
              setBatchData((prev) => ({ ...prev, institution: value }))
            }
          />
          <SelectInput
            label={"Program"}
            placeholder={"Select Program"}
            options={["PG", "UG"]}
            required={true}
            colStart={1}
            rowStart={2}
            value={BatchData.program}
            disabled={true}
            onChange={(value) =>
              setBatchData((prev) => ({ ...prev, program: value }))
            }
          />
          <SelectInput
            label={"Department"}
            placeholder={"Select Department"}
            options={[BatchData.department]}
            required={true}
            colStart={1}
            rowStart={3}
            value={BatchData.department}
            disabled={true}
            onChange={(value) =>
              setBatchData((prev) => ({ ...prev, department: value }))
            }
          />

          <SelectInput
            label={"Regulation"}
            placeholder={"Select Regulation"}
            options={[BatchData.regulation]}
            required={true}
            colStart={1}
            rowStart={3}
            value={BatchData.regulation}
            disabled={true}
            onChange={(value) =>
              setBatchData((prev) => ({ ...prev, regulation: value }))
            }
          />
          <SelectInput
            label={"Course"}
            placeholder={"Select Course"}
            options={[BatchData.course_name]}
            required={true}
            colStart={2}
            rowStart={1}
            value={BatchData.course_name}
            disabled={true}
            onChange={(value) =>
              setBatchData((prev) => ({ ...prev, course_name: value }))
            }
          />
          <TextInput
            label={"Batch name"}
            placeholder={"Enter Batch name"}
            required={true}
            colStart={2}
            rowStart={2}
            value={BatchData.batch_name}
            disabled={true}
            onChange={(value) =>
              setBatchData((prev) => ({ ...prev, batch_name: value }))
            }
          />
          <SelectInput
            label={"Academic Year"}
            placeholder={"Select Academic"}
            options={[BatchData.academic_year]}
            required={true}
            colStart={2}
            rowStart={3}
            value={BatchData.academic_year}
            disabled={true}
            onChange={(value) =>
              setBatchData((prev) => ({ ...prev, academic_year: value }))
            }
          />
          <FileInput
            bgColor={"blue-500"}
            textColor={"white"}
            id={"studentsFile"}
            accept={".xlsx, .xls"}
            label={"Upload"}
            icon={"entypo:upload"}
            onFileSelect={(file) => handleFileInputChange(file)}
          />

          <SelectionTable
            headers={headers.studentTableHeader}
            data={BatchData.students}
          />
        </InputLayout>
      </FormLayout>
      <ButtonLayout cols={12} marginTop={14}>
        <IconButton
          text={"Cancel"}
          icon={"ic:close"}
          textColor={"gray-500"}
          bgColor={"bg-white"}
          onClick={() => navigator("/course/Batch")}
        />
      </ButtonLayout>
    </Container>
  );
};
