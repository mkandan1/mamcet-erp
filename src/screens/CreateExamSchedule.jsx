import { useEffect, useState } from "react"
import { Breadcamps } from "../components/Breadcumps"
import { IconButton } from "../components/Button"
import { ButtonLayout } from "../components/ButtonLayout"
import { Container } from "../components/Container"
import { FormLayout } from "../components/FormLayout"
import { SelectInput, TextInput } from "../components/Input"
import { InputLayout } from "../components/InputLayout"
import { PageHeading } from "../components/PageHeading"
import { EssentialQueries } from "../api/Query"
import { mapAcademicYearToSemesters } from "../services/academicYear"
import { useDispatch } from "react-redux"
import { ShowMarkAllocationDialog } from "../redux/actions/dialogActions"
import { API } from "../api/API"
import { showToast } from "../redux/actions/toastActions"
import { useNavigate } from "react-router-dom"
import { MarkAllocationDialog } from "../components/MADialog"
import { hasNullValues } from "../services/DataPreprocessing"

export const CreateExamSchedule = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const [QueryData, setQueryData] = useState({
        institution: null,
        program: null,
        department: null,
        course_name: null,
        regulation: null,
        batch_name: null,
        academic_year: null,
        semester_name: null,
        exam_name: null,
    });

    const [fetchedData, setFetchedData] = useState({
        courses: [],
        regulations: [],
        departments: [],
        academic_year: [],
        batch_name: [],
        semesters: []
    });

    const handleScheduleExam = async () => {
        if (hasNullValues(QueryData)) {
            dispatch((showToast({ type: 'err', text: 'Fill all required flieds' })))
        }
        await API.postRequest('/exam/schedule-exam', QueryData)
            .then((result) => {
                dispatch(showToast({type: 'success', text: result.message}))
            })
            .catch((err) => {
                dispatch(showToast({ type: "err", text: err.response.data.message }))
                console.error(err)
            })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const departments = await EssentialQueries.getDepartments();
                const regulations = await EssentialQueries.getRegulations();
                setFetchedData((prev) => ({ ...prev, regulations: regulations, departments: departments }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        if (QueryData.program && QueryData.department && QueryData.regulation) {

            const fetchData = async () => {
                const course = await EssentialQueries.getCourse(QueryData.program, QueryData.department, QueryData.regulation);
                setFetchedData((prev) => ({ ...prev, courses: course }))
            }
            fetchData()
        }
    }, [QueryData.regulation, QueryData.department, QueryData.program]);

    useEffect(() => {
        if (QueryData.course_name) {

            const fetchData = async () => {
                const { batch_name, academic_year } = await EssentialQueries.getBatch(QueryData.program, QueryData.department, QueryData.regulation, QueryData.course_name);
                setFetchedData((prev) => ({ ...prev, batch_name, academic_year }));
                console.log(batch_name)
            }
            fetchData()
        }
    }, [QueryData.course_name]);

    useEffect(() => {
        if (QueryData.academic_year) {
            const semesters = mapAcademicYearToSemesters(QueryData.batch_name, QueryData.academic_year);
            setFetchedData((prev) => ({ ...prev, semesters: semesters }));
        }
    }, [QueryData.academic_year]);

    
    return (
        <Container>
            <Breadcamps paths={{ Home: '/', 'Exam': '', 'Mark Allocation': '' }} />
            <PageHeading heading={'Schedule Exam'} />
            <FormLayout>
                <SelectInput
                    label={"Institution"}
                    placeholder={"Select Institution"}
                    options={["Selvam Arts and Science College"]}
                    required={true}
                    colStart={"col-start-1"}
                    rowStart={"row-start-1"}
                    value={QueryData.institution}
                    onChange={(value) =>
                        setQueryData((prev) => ({ ...prev, institution: value }))
                    }
                />
                <SelectInput
                    label={"Program"}
                    placeholder={"Select Program"}
                    options={["PG", "UG"]}
                    required={true}
                    colStart={"col-start-1"}
                    rowStart={"row-start-2"}
                    value={QueryData.program}
                    onChange={(value) =>
                        setQueryData((prev) => ({ ...prev, program: value }))
                    }
                />
                <SelectInput
                    label={"Department"}
                    placeholder={"Select Department"}
                    options={fetchedData.departments}
                    required={true}
                    colStart={"col-start-1"}
                    rowStart={"row-start-3"}
                    value={QueryData.department}
                    onChange={(value) =>
                        setQueryData((prev) => ({ ...prev, department: value }))
                    }
                />

                <SelectInput
                    label={"Regulation"}
                    placeholder={"Select Regulation"}
                    options={fetchedData.regulations}
                    required={true}
                    colStart={"col-start-1"}
                    rowStart={"row-start-4"}
                    value={QueryData.regulation}
                    onChange={(value) =>
                        setQueryData((prev) => ({ ...prev, regulation: value }))
                    }
                />
                <SelectInput
                    label={"Course"}
                    placeholder={"Select Course"}
                    options={fetchedData.courses}
                    required={true}
                    colStart={"col-start-5"}
                    rowStart={"row-start-1"}
                    value={QueryData.course_name}
                    onChange={(value) =>
                        setQueryData((prev) => ({ ...prev, course_name: value }))
                    }
                />
                <SelectInput
                    label={"Batch"}
                    placeholder={"Select Batch"}
                    required={true}
                    colStart={"col-start-5"}
                    rowStart={"row-start-2"}
                    options={[fetchedData.batch_name]}
                    value={QueryData.batch_name}
                    onChange={(value) =>
                        setQueryData((prev) => ({ ...prev, batch_name: value }))
                    }
                />
                <SelectInput
                    label={"Academic Year"}
                    placeholder={"Select Academic"}
                    options={[fetchedData.academic_year]}
                    required={true}
                    colStart={"col-start-5"}
                    rowStart={"row-start-3"}
                    value={QueryData.academic_year}
                    onChange={(value) =>
                        setQueryData((prev) => ({ ...prev, academic_year: value }))
                    }
                />
                <SelectInput
                    label={"Semester"}
                    placeholder={"Select Semester"}
                    options={fetchedData.semesters}
                    required={true}
                    colStart={"col-start-5"}
                    rowStart={"row-start-4"}
                    value={QueryData.semester_name}
                    onChange={(value) =>
                        setQueryData((prev) => ({ ...prev, semester_name: value }))
                    }
                />
                <SelectInput
                    label={"Exam"}
                    placeholder={"Select Exam"}
                    options={['Internal Exams', 'University Exam']}
                    required={true}
                    colStart={"col-start-8"}
                    rowStart={"row-start-1"}
                    value={QueryData.exam_name}
                    onChange={(value) =>
                        setQueryData((prev) => ({ ...prev, exam_name: value }))
                    }
                />
            </FormLayout>
            <ButtonLayout cols={12} marginTop={14}>
                <IconButton
                    text={"Schedule Exam"}
                    icon={"material-symbols:schedule"}
                    textColor={"white"}
                    bgColor={"bg-blue-700"}
                    onClick={() => handleScheduleExam()}
                />
                <IconButton
                    text={"Go Back"}
                    icon={"typcn:arrow-back"}
                    textColor={"gray-500"}
                    bgColor={"bg-white"}
                    onClick={() => navigator("/exam/all")}
                />
            </ButtonLayout>
        </Container>
    );
}