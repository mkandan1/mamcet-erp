import { useEffect, useState } from "react"
import { Breadcamps } from "../components/Breadcumps"
import { IconButton } from "../components/Button"
import { ButtonLayout } from "../components/ButtonLayout"
import { Container } from "../components/Container"
import { FormLayout } from "../components/FormLayout"
import { SelectInput } from "../components/Input"
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

export const MarkAllocation = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const [BatchData, setBatchData] = useState({
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
    const [exam, setExam] = useState(null);
    const [semester, setSemester] = useState(null);
    const [students, setStudents] = useState(null)

    const [fetchedData, setFetchedData] = useState({
        courses: [],
        regulations: [],
        departments: [],
        academic_year: [],
        batch_name: [],
        semesters: []
    });

    const handleEdit = async () => {
        if (hasNullValues(BatchData)) {
            dispatch((showToast({ type: 'err', text: 'Fill all required flieds' })))
        }
        await API.postRequest('/exam/get-exam-data', BatchData)
            .then((snapshot) => {
                const batch = snapshot.existBatch;
                setExam(batch.exams)
                setSemester(batch.semesters)
                setStudents(batch.students)
                dispatch(ShowMarkAllocationDialog())
            })
            .catch((err) => {
                dispatch(showToast({ type: "err", text: err.message }))
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
        if (BatchData.program && BatchData.department && BatchData.regulation) {

            const fetchData = async () => {
                const course = await EssentialQueries.getCourse(BatchData.program, BatchData.department, BatchData.regulation);
                setFetchedData((prev) => ({ ...prev, courses: course }))
            }
            fetchData()
        }
    }, [BatchData.regulation, BatchData.department, BatchData.program]);

    useEffect(() => {
        if (BatchData.course_name) {

            const fetchData = async () => {
                const { batch_name, academic_year } = await EssentialQueries.getBatch(BatchData.program, BatchData.department, BatchData.regulation, BatchData.course_name);
                setFetchedData((prev) => ({ ...prev, batch_name: [batch_name], academic_year: [academic_year] }))
            }
            fetchData()
        }
    }, [BatchData.course_name]);

    useEffect(() => {
        if (BatchData.academic_year) {
            const semesters = mapAcademicYearToSemesters(BatchData.batch_name, BatchData.academic_year);
            setFetchedData((prev) => ({ ...prev, semesters: semesters }));
        }
    }, [BatchData.academic_year]);

    const handleSemesterChanges = () => {
        BatchData.subjects = BatchData.subjects.map((subject) => subject._id)
        API.postRequest('/semester/add', BatchData)
            .then((result) => {
                dispatch(showToast({ type: "success", text: result.message }))
            })
            .catch((err) => {
                dispatch(showToast({ type: "error", text: err.message }))
            })
    }
    return (
        <Container>
            <Breadcamps paths={{ Home: '/', 'Exam': '', 'Mark Allocation': '' }} />
            <PageHeading heading={'Mark Allocation'} />
            <FormLayout cols={"12"} rows={6}>
                <InputLayout cols={"12"} rows={6}>
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
                        rowStart={4}
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
                    <SelectInput
                        label={"Batch"}
                        placeholder={"Select Batch"}
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
                        label={"Academic Year"}
                        placeholder={"Select Academic"}
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
                        label={"Semester"}
                        placeholder={"Select Semester"}
                        options={fetchedData.semesters}
                        required={true}
                        colStart={2}
                        rowStart={4}
                        value={BatchData.semester_name}
                        onChange={(value) =>
                            setBatchData((prev) => ({ ...prev, semester_name: value }))
                        }
                    />
                    <SelectInput
                        label={"Exam"}
                        placeholder={"Select Exam"}
                        options={['Internal Exams', 'University Exam']}
                        required={true}
                        colStart={3}
                        rowStart={1}
                        value={BatchData.exam_name}
                        onChange={(value) =>
                            setBatchData((prev) => ({ ...prev, exam_name: value }))
                        }
                    />
                    {/* <div className="w-full col-span-12 flex justify-end">
                        <IconButton
                            text={'Fetch semester'}
                            textColor={'white'}
                            bgColor={'bg-blue-600'}
                            icon={'ic:baseline-rotate-right'}
                            onClick={()=> handleFetchSemester()}
                        />
                    </div> */}
                </InputLayout>
                <MarkAllocationDialog exam={exam?exam[0] : []} students={students} semesters={semester}/>
            </FormLayout>
            <ButtonLayout cols={12} marginTop={14}>
                <IconButton
                    text={"Edit"}
                    icon={"bx:edit"}
                    textColor={"white"}
                    bgColor={"bg-blue-700"}
                    onClick={() => handleEdit()}
                />
                <IconButton
                    text={"Cancel"}
                    icon={"ic:close"}
                    textColor={"gray-500"}
                    bgColor={"bg-white"}
                    onClick={() => navigator("/course/all")}
                />
            </ButtonLayout>
        </Container>
    );
}