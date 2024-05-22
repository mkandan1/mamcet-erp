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
import { FileInput } from "flowbite-react";
import { SelectionTable } from "../components/Table";
import { headers } from "../data/constants";
import { Queries } from "../api/Query";
import { generateAcademicYears } from "../services/academicYear";

export const EditBatch= () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [batchId, setBatchID] = useState(getId());
  const [BatchData, setBatchData] = useState({
    institution: null,
    program: null,
    department: null,
    batch_name: null,
    academic_year: null,
    regulation: null,
    students: [],
  });
  const [fetchedData, setFetchedData] = useState({
    courses: [],
    regulations: [],
    departments: [],
    academic_year: null,
  });

  useEffect(() => {
    Queries.getRegulations()
      .then((snapshot) => {
        setFetchedData((prev) => ({
          ...prev,
          regulations: snapshot.queries.regulation,
        }));
      })
      .catch((err) => {
        console.log(err.message);
      });
    Queries.getDepartment()
      .then((snapshot) => {
        setFetchedData((prev) => ({
          ...prev,
          departments: snapshot.queries.department,
        }));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    if (BatchData.program && BatchData.department && BatchData.regulation) {
      const queries = [
        {
          collectionName: "courses",
          values: {
            program: BatchData.program,
            department: BatchData.department,
            regulation: BatchData.regulation,
          },
          responseData: ["name"],
        },
      ];
      Queries.getDocuments(queries)
        .then((snapshot) => {
          setFetchedData((prev) => ({
            ...prev,
            courses: snapshot.options.name,
          }));
          setFetchedCourse(snapshot.documents);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [BatchData.regulation, BatchData.department, BatchData.program]);

  useEffect(() => {
    const academicYears = generateAcademicYears(BatchData.batch_name);
    setFetchedData((prev) => ({ ...prev, academic_year: academicYears }));
  }, [BatchData.batch_name]);

  useEffect(() => {
    API.getRequest("/batch/" + batchId)
      .then((snapshot) => {
        setBatchData(snapshot.batch);
        BatchData._id = snapshot.batch._id;
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

  const handleBatchChanges = () => {
    if (hasNullValues(BatchData)) {
      return dispatch(
        showToast({
          type: "error",
          text: "Fill all required fileds",
        })
      );
    }
    API.putRequest("/batch/edit", BatchData)
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

  const handleBatchDelete = () => {
    API.deleteRequest("/batch/delete", batchId)
      .then((result) => {
        dispatch(
          showToast({
            type: "success",
            text: "Batch deleted successfully",
          })
        );

        NavigateAfterTime('/course/batch', navigator, 500)
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
        paths={{ Home: "/", "Batch List": "/course/batch/", "Edit Batch": "" }}
      />
      <PageHeading heading={"Edit Batch"}></PageHeading>

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
            onChange={(value) =>
              setBatchData((prev) => ({ ...prev, program: value }))
            }
          />
          <SelectInput
            label={"Department"}
            placeholder={"Select Department"}
            options={fetchedData.departments}
            required={true}
            colStart={1}
            rowStart={3}
            value={BatchData.department}
            onChange={(value) =>
              setBatchData((prev) => ({ ...prev, department: value }))
            }
          />

          <SelectInput
            label={"Regulation"}
            placeholder={"Select Regulation"}
            options={fetchedData.regulations}
            required={true}
            colStart={1}
            rowStart={3}
            value={BatchData.regulation}
            onChange={(value) =>
              setBatchData((prev) => ({ ...prev, regulation: value }))
            }
          />
          <SelectInput
            label={"Course"}
            placeholder={"Select Course"}
            options={fetchedData.courses}
            required={true}
            colStart={2}
            rowStart={1}
            value={BatchData.course_name}
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
          text={"Save changes"}
          icon={"ic:baseline-save"}
          textColor={"white"}
          bgColor={"bg-blue-700"}
          onClick={() => handleBatchChanges()}
        />
        <IconButton
          text={"Delete"}
          icon={"octicon:trash-16"}
          textColor={"white"}
          bgColor={"bg-red-700"}
          onClick={() => handleBatchDelete()}
        />
        <IconButton
          text={"Cancel"}
          icon={"ic:close"}
          textColor={"gray-500"}
          bgColor={"bg-white"}
          onClick={() => navigator("/course/batch")}
        />
      </ButtonLayout>
    </Container>
  );
};
