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
} from "../components/Input";
import { InputLayout } from "../components/InputLayout";
import { PageHeading } from "../components/PageHeading";
import { IconButton } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { API } from "../api/API";
import { showToast } from "../redux/actions/toastActions";
import { useDispatch } from "react-redux";
import { hasNullValues } from "../services/DataPreprocessing";
import { Queries } from "../api/Query";
import { generateAcademicYears } from "../services/academicYear";
import { SelectionTable } from "../components/Table";
import { ReadFile } from "../services/ReadFile";
import { headers } from "../data/constants";
import { BatchAPI } from "../api/BatchAPI";
import { ShowStudentsImportDialog } from "../redux/actions/dialogActions";
import { StudentDataImportDialog } from "../components/Dialog";
import { Icon } from "@iconify/react/dist/iconify.js";

export const CreateBatch = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);
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
  const [fetchedCourse, setFetchedCourse] = useState();
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

  const handleBatchCreation = () => {
    if (hasNullValues(BatchData)) {
      return dispatch(
        showToast({ type: "error", text: "Fill all required fields" })
      );
    }
    BatchAPI.createBatch(BatchData, dispatch);
  };
  return (
    <Container>
      <Breadcamps
        paths={{ Home: "/", Batch: "/course/batch", "Create Batch": "" }}
      />
      <PageHeading heading={"Create Batch"}></PageHeading>

      <FormLayout>
        <SelectInput
          label={"Institution"}
          placeholder={"Select Institution"}
          options={["M.A.M. College of Engineering & Technology"]}
          required={true}
          colStart={1}
          rowStart={1}
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
          onChange={(value) =>
            setBatchData((prev) => ({ ...prev, batch_name: value }))
          }
        />
        <SelectInput
          label={"Academic Year"}
          placeholder={"Select Academic"}
          options={fetchedData.academic_year}
          required={true}
          colStart={2}
          rowStart={3}
          onChange={(value) =>
            setBatchData((prev) => ({ ...prev, academic_year: value }))
          }
        />

        <CustomInput label={'Students'}>
          <IconButton
            text={'Import Students'}
            textColor={'white'}
            bgColor={'bg-blue-500'}
            icon={'pajamas:import'}
            onClick={() => dispatch(ShowStudentsImportDialog())}
          />
          <p>{BatchData.students.length > 0 ? <span className="text-sm mt-4 text-green-700 bg-green-100 p-1 border flex gap-x-2 border-green-400"><Icon icon={'mdi:success-circle'}/> {BatchData.students.length} students imported successfully</span> : <></>}</p>
        </CustomInput>

        <StudentDataImportDialog onImport={(students) => setBatchData((prev) => ({ ...prev, students: students }))} students={BatchData.students} />
      </FormLayout>
      <ButtonLayout cols={12} marginTop={14}>
        <IconButton
          text={"Create Batch"}
          icon={"ic:round-plus"}
          textColor={"white"}
          bgColor={"bg-blue-700"}
          onClick={() => handleBatchCreation()}
        />
        <IconButton
          text={"Go Back"}
          icon={"typcn:arrow-back"}
          textColor={"gray-500"}
          bgColor={"bg-white"}
          onClick={() => navigator("/course/batch")}
        />
      </ButtonLayout>
    </Container>
  );
};
