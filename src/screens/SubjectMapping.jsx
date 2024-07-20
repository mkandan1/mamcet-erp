import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Breadcamps } from '../components/Breadcumps';
import { IconButton } from '../components/Button';
import { ButtonLayout } from '../components/ButtonLayout';
import { Container } from '../components/Container';
import { FormLayout } from '../components/FormLayout';
import { SelectInput } from '../components/Input';
import { PageHeading } from '../components/PageHeading';
import { SubjectSelectionTable } from '../components/Table';
import { headers } from '../data/constants';
import { EssentialQueries, Queries } from '../api/Query';
import { generateAcademicYears, mapAcademicYearToSemesters } from '../services/academicYear';
import { SubjectImportDialog } from '../components/Dialog';
import { ShowSubjectImportDialog } from '../redux/actions/dialogActions';
import { API } from '../api/API';
import { showToast } from '../redux/actions/toastActions';

export const SubjectMapping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [BatchData, setBatchData] = useState({
    institution: null,
    program: null,
    department: null,
    course_name: null,
    batch_name: null,
    academic_year: null,
    regulation: null,
    semester_name: null,
    subjects: [],
  });

  const [fetchedData, setFetchedData] = useState({
    courses: [],
    regulations: [],
    departments: [],
    academic_year: [],
    batch_name: [],
    semesters: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departments = await EssentialQueries.getDepartments();
        const regulations = await EssentialQueries.getRegulations();
        setFetchedData((prev) => ({ ...prev, regulations, departments }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (BatchData.program && BatchData.department && BatchData.regulation) {
      const fetchData = async () => {
        const course = await EssentialQueries.getCourse(BatchData.program, BatchData.department, BatchData.regulation);
        setFetchedData((prev) => ({ ...prev, courses: course }));
      };
      fetchData();
    }
  }, [BatchData.regulation, BatchData.department, BatchData.program]);

  useEffect(() => {
    if (BatchData.course_name) {
      const fetchData = async () => {
        const { batch_name } = await EssentialQueries.getBatch(BatchData.program, BatchData.department, BatchData.regulation, BatchData.course_name);
        setFetchedData((prev) => ({ ...prev, batch_name: [batch_name] }));
        
      const academicYears = generateAcademicYears(batch_name);
      setFetchedData((prev)=> ({...prev, academic_year: academicYears}))
      };
      fetchData();
    }
  }, [BatchData.course_name]);

  useEffect(() => {
    if (BatchData.academic_year) {
      const semesters = mapAcademicYearToSemesters(BatchData.batch_name, BatchData.academic_year);
      setFetchedData((prev) => ({ ...prev, semesters }));
    }
  }, [BatchData.academic_year]);

  const handleSemesterChanges = () => {
    BatchData.subjects = BatchData.subjects.map((subject) => ({
        subjectId: subject._id,
        facultyId: subject.sub_faculty, // Add the faculty ID here
      }));
    API.postRequest('/semester/add', BatchData)
      .then((result) => {
        dispatch(showToast({ type: 'success', text: result.message }));
      })
      .catch((err) => {
        dispatch(showToast({ type: 'error', text: err.message }));
      });
  };

  const handleFetchSemester = async () => {
    const Batch = await EssentialQueries.getSemester(BatchData.program, BatchData.department, BatchData.course_name, BatchData.batch_name, BatchData.semester_name);
    setBatchData(Batch);
  };

  const handleAssignFaculty = (subjectId, facultyId) => {
    setBatchData((prev) => ({
      ...prev,
      subjects: prev.subjects.map((subject) =>
        subject._id === subjectId ? { ...subject, sub_faculty: facultyId } : subject
      ),
    }));
  };
  

  return (
    <Container>
      <Breadcamps paths={{ Home: '/', 'Subject Mapping': '' }} />
      <PageHeading heading={'Subject Mapping'} />
      <FormLayout>
        <SelectInput
          label={'Institution'}
          placeholder={'Select Institution'}
          options={['M.A.M. College of Engineering & Technology']}
          required={true}
          value={BatchData.institution}
          onChange={(value) =>
            setBatchData((prev) => ({ ...prev, institution: value }))
          }
        />
        <SelectInput
          label={'Program'}
          placeholder={'Select Program'}
          options={['PG', 'UG']}
          required={true}
          colStart={1}
          rowStart={2}
          value={BatchData.program}
          onChange={(value) =>
            setBatchData((prev) => ({ ...prev, program: value }))
          }
        />
        <SelectInput
          label={'Department'}
          placeholder={'Select Department'}
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
          label={'Regulation'}
          placeholder={'Select Regulation'}
          options={fetchedData.regulations}
          required={true}
          colStart={1}
          rowStart={4}
          value={BatchData.regulation}
          onChange={(value) =>
            setBatchData((prev) => ({ ...prev, regulation: value }))
          }
        />
        <SelectInput
          label={'Course'}
          placeholder={'Select Course'}
          options={fetchedData.courses}
          required={true}
          colStart={2}
          rowStart={1}
          value={BatchData.course_name}
          onChange={(value) =>
            setBatchData((prev) => ({ ...prev, course_name: value
            }))
          }
        />
        <SelectInput
          label={'Batch'}
          placeholder={'Select Batch'}
          required={true}
          colStart={2}
          rowStart={2}
          options={fetchedData.batch_name}
          value={BatchData.batch_name}
          onChange={(value) =>
            setBatchData((prev) => ({ ...prev, batch_name: value }))
          }
        />
        <SelectInput
          label={'Academic Year'}
          placeholder={'Select Academic Year'}
          options={fetchedData.academic_year}
          required={true}
          colStart={2}
          rowStart={3}
          value={BatchData.academic_year}
          onChange={(value) =>
            setBatchData((prev) => ({ ...prev, academic_year: value }))
          }
        />
        <SelectInput
          label={'Semester'}
          placeholder={'Select Semester'}
          options={fetchedData.semesters}
          required={true}
          colStart={2}
          rowStart={4}
          value={BatchData.semester_name}
          onChange={(value) =>
            setBatchData((prev) => ({ ...prev, semester_name: value }))
          }
        />
        <SubjectSelectionTable
          headers={headers.semesterSubjectTableHeader}
          data={BatchData.subjects}
          rowId={BatchData.rowId}
          onSelect={(id) => setBatchData((prev) => ({ ...prev, rowId: id }))}
          onAssignFaculty={handleAssignFaculty}
        />
        <SubjectImportDialog
          onImport={(subjects) => setBatchData((prev) => ({ ...prev, subjects }))}
        />
      </FormLayout>
      <ButtonLayout cols={12} marginTop={14}>
        <IconButton
          text={"Add subjects"}
          icon={"pajamas:import"}
          textColor={"white"}
          bgColor={"bg-blue-700"}
          onClick={() => dispatch(ShowSubjectImportDialog())}
        />
        <IconButton
          text={"Save changes"}
          icon={"ic:baseline-save"}
          textColor={"white"}
          bgColor={"bg-blue-700"}
          onClick={() => handleSemesterChanges()}
        />
        <IconButton
          text={"Go Back"}
          icon={"typcn:arrow-back"}
          textColor={"gray-500"}
          bgColor={"bg-white"}
          onClick={() => navigate("/course/all")}
        />
      </ButtonLayout>
    </Container>
  );
};
