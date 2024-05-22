import { IconButton } from "./Button";
import { Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { HideMarkAllocationDialog, HideStudentsImportDialog, HideSubjectImportDialog } from "../redux/actions/dialogActions";
import { MultiSelectionTable, SelectionTable } from "./Table";
import { headers } from "../data/constants";
import { useEffect, useState } from "react";
import { API } from "../api/API";
import { showToast } from "../redux/actions/toastActions";
import { FileInput, TextInput } from "./Input";
import { ReadFile } from "../services/ReadFile";
import { Icon } from "@iconify/react/dist/iconify.js";

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
    console.log(studentsProp)

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

    return (
        <>
            <Modal
                show={show}
                position={"center"}
                onClose={() => dispatch(HideStudentsImportDialog())}
                size={'7xl'}
                root={{ baseURI: "rounded-none" }}
            >
                <Modal.Header>Import Students Data</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 p-6">
                        <div className="flex gap-x-2 justify-end">
                            <IconButton
                                text={'Add student'}
                                textColor={'white'}
                                bgColor={'bg-blue-500'}
                                icon={'gridicons:create'}
                                onClick={() => setShowForm((prev) => !prev)}
                            />
                            <FileInput
                                bgColor={"blue-500"}
                                textColor={"white"}
                                id={"studentsFile"}
                                accept={".xlsx, .xls"}
                                label={"Choose Excel Sheet"}
                                icon={"subway:file-12"}
                                onFileSelect={(file) => handleFileInputChange(file)}
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
