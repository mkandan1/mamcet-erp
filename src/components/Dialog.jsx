import { IconButton } from "./Button";
import { Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { HideMarkAllocationDialog, HideStudentsImportDialog, HideSubjectImportDialog } from "../redux/actions/dialogActions";
import { MultiSelectionTable, SelectionTable } from "./Table";
import { headers } from "../data/constants";
import { useEffect, useState, useRef } from "react";
import { API } from "../api/API";
import { showToast } from "../redux/actions/toastActions";
import { FileInput, TextInput } from "./Input";
import { ReadFile } from "../services/ReadFile";
import { Icon } from "@iconify/react/dist/iconify.js";
import { hideElement, showElement } from "../redux/actions/showActions";
import { FormLayout } from "./FormLayout";
import { ButtonLayout } from "./ButtonLayout";
import { hasEmptyValues } from "../services/DataPreprocessing";

export const SubjectImportDialog = ({ onImport }) => {
    const { show } = useSelector((state) => (state.subjectImportDialog));
    const [subject, setSubject] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([])
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState()

    const handleSubjectSelection = (subject) => {
        setSelectedSubjects((prev) => {
            const isSubjectSelected = prev.some(sub => sub._id === subject._id);
            if (isSubjectSelected) {
                return prev.filter(sub => sub._id !== subject._id);
            } else {
                return [...prev, subject];
            }
        });
    };

    const handleSearch = (e) => {
        const term = e.toLowerCase();
        setSearchTerm(term);

        try {
            const filtered = subject.filter((row) =>
                Object.values(row).some((value) => value.toString().toLowerCase().includes(term))
            );
            setSubject(filtered);
        } catch (error) {
            console.error('Error during filtering:', error);
            setSubject([]);
        }
    };


    useEffect(() => {
        API.getRequest("/subject")
            .then((snapshot) => {
                if (snapshot.success == true) {
                    setSubject(snapshot.subjects);
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
    }, []);
    return (
        <>
            <Modal
                show={show}
                position={"center"}
                onClose={() => dispatch(HideSubjectImportDialog())}
                size={'7xl'}
                root={{ baseURI: "rounded-none" }}
            >
                <Modal.Header>Import Subjects</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 p-6">
                        <TextInput
                            type={'search'}
                            label={'Search subject'}
                            placeholder={"Enter subject name or code"}
                            value={searchTerm}
                            onChange={(e) => handleSearch(e)}
                            rowStart={1}
                            colStart={1}
                        />
                        <MultiSelectionTable headers={headers.subjectTableHeader} data={subject} selectedRow={selectedSubjects} onSelect={(row) => handleSubjectSelection(row)}></MultiSelectionTable>
                    </div>
                </Modal.Body>
                <div className="w-full flex justify-end gap-x-4 py-5 px-5 items-center">
                    <span className="text-sm">{selectedSubjects.length} subjects selected</span>
                    <IconButton
                        text={"Import"}
                        icon={"pajamas:import"}
                        textColor={"white"}
                        bgColor={"bg-blue-500"}
                        onClick={() => { onImport(selectedSubjects); dispatch(HideSubjectImportDialog()) }}
                    />
                    <IconButton
                        text={"Close"}
                        icon={"ic:close"}
                        textColor={"gray-500"}
                        bgColor={"bg-white"}
                    />
                </div>
            </Modal>
        </>
    );
}



export const StudentDataImportDialog = ({ onImport, studentsProp }) => {
    const { show } = useSelector((state) => (state.importStudentsDataDialog));
    const [showForm, setShowForm] = useState(false);
    const [students, setStudents] = useState([]);
    const dispatch = useDispatch();

    const handleFileInputChange = async (file) => {
        ReadFile(file)
            .then((students) => {
                setStudents(students)
            })
            .catch((err) => {
                dispatch(showToast({ type: "error", text: err.message }));
            });
    };


    if (!show) {
        return
    }
    const handleAddStudent = () => {
        dispatch(showElement({ elementName: 'addStudent' }))
    }
    return (
        <>
            <Modal
                show={show}
                position={"center"}
                onClose={() => dispatch(HideStudentsImportDialog())}
                size={'7xl'}
                className="z-20"
                root={{ baseURI: "rounded-none" }}
            >
                <Modal.Header>Import Students Data</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 p-6">
                        <div className="flex justify-end">
                            <FileInput
                                bgColor={"blue-500"}
                                textColor={"white"}
                                id={"studentsFile"}
                                accept={".xlsx, .xls"}
                                label={"Choose Excel Sheet"}
                                icon={"subway:file-12"}
                                onFileSelect={(file) => handleFileInputChange(file)}
                            /><IconButton
                                text={'Add student'}
                                textColor={'white'}
                                bgColor={'bg-blue-500'}
                                icon={'gridicons:create'}
                                onClick={() => handleAddStudent()}
                            />
                        </div>
                        {showForm ? (
                            <div className="bg-yellow-100 p-0.5 pl-1 text-sm border border-yellow-300">
                                <p className="text-yellow-700 flex items-center gap-x-2"><Icon icon={'icomoon-free:info'} /> Feature is not available</p>
                            </div>
                        ) : <></>}
                        <SelectionTable
                            headers={headers.studentTableHeader}
                            data={studentsProp ? studentsProp : students}
                            rowId={''}
                        />
                    </div>
                </Modal.Body>
                <div className="w-full flex justify-end gap-x-4 py-5 px-5 items-center">
                    <span className="text-sm">{students.length} students imported</span>
                    <IconButton
                        text={"Import"}
                        icon={"pajamas:import"}
                        textColor={"white"}
                        bgColor={"bg-blue-500"}
                        onClick={() => { onImport(students); dispatch(HideStudentsImportDialog()) }}
                    />
                    <IconButton
                        text={"Close"}
                        icon={"ic:close"}
                        textColor={"gray-500"}
                        bgColor={"bg-white"}
                        onClick={() => dispatch(HideStudentsImportDialog())}
                    />
                </div>
            </Modal>
        </>
    );
}

export const AddStudentDialog = ({onAdd}) => {
    const { show, element } = useSelector((state) => (state.showElement))
    const dispatch = useDispatch()
    const handleCloseAddStudent = () => {
        dispatch(hideElement({ elementName: null }))
    }
    const [studentData, setStudentData] = useState({
        registerNumber: '',
        name: '',
        dob: '',
        fathersName: '',
        mothersName: '',
        phone: '',
        _10thMark: '',
        _12thMark: '',
    })
    const handleAddStudentToTable = () => {
        console.log(studentData)
        if (hasEmptyValues(studentData)) {
            return dispatch(showToast({ type: 'err', text: 'Fill all required fields' }))
        }

        onAdd(studentData)
    }
    return (
        <div className={`overflow-hidden transition-opacity duration-300 z-50 ${element === 'addStudent' && show ? 'absolute inset-0 bg-black bg-opacity-50' : 'hidden'}`}>
            <div className={`w-screen lg:w-2/3 absolute right-0 top-0 bottom-0 bg-white shadow-2xl px-10 py-5 transform transition-transform duration-300 ${element === 'addStudent' && show ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between">
                    <h1 className="text-lg font-medium">Add students</h1>
                    <Icon icon={'ic:baseline-close'} className="cursor-pointer text-xl" onClick={handleCloseAddStudent} />
                </div>
                <div className="mt-10">
                    <div className="flex flex-col gap-y-5 overflow-auto">
                        <TextInput
                            label={'Register No'}
                            value={studentData.registerNumber}
                            onChange={(e) => setStudentData((prev) => ({ ...prev, registerNumber: e }))}
                        />
                        <TextInput
                            label={'Name'}
                            value={studentData.name}
                            onChange={(e) => setStudentData((prev) => ({ ...prev, name: e }))}
                        />
                        <TextInput
                            label={'Date of Birth'}
                            type={'date'}
                            value={studentData.dob}
                            onChange={(e) => setStudentData((prev) => ({ ...prev, dob: e }))}
                        />
                        <TextInput
                            label={'Father\'s Name'}
                            value={studentData.fathersName}
                            onChange={(e) => setStudentData((prev) => ({ ...prev, fathersName: e }))}
                        />
                        <TextInput
                            label={'Mother\'s Name'}
                            value={studentData.mothersName}
                            onChange={(e) => setStudentData((prev) => ({ ...prev, mothersName: e }))}
                        />
                        <TextInput
                            label={'Phone number'}
                            value={studentData.phone}
                            onChange={(e) => setStudentData((prev) => ({ ...prev, phone: e }))}
                        />
                        <TextInput
                            label={'10th Mark'}
                            value={studentData._10thMark}
                            onChange={(e) => setStudentData((prev) => ({ ...prev, _10thMark: e }))}
                        />
                        <TextInput
                            label={'12th Mark'}
                            value={studentData._12thMark}
                            onChange={(e) => setStudentData((prev) => ({ ...prev, _12thMark: e }))}
                        />
                        <div className="flex justify-end">
                            <IconButton
                                bgColor={'bg-blue-600'}
                                textColor={'white'}
                                text={'Add student'}
                                onClick={() => handleAddStudentToTable()}
                            />
                            <IconButton
                                bgColor={'bg-white'}
                                textColor={'black'}
                                text={'Close'}
                                onClick={() => handleCloseAddStudent()} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}