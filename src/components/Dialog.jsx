import { IconButton } from "./Button";
import { Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { HideSubjectImportDialog } from "../redux/actions/dialogActions";
import { MultiSelectionTable } from "./Table";
import { headers } from "../data/constants";
import { useEffect, useState } from "react";
import { API } from "../api/API";
import { showToast } from "../redux/actions/toastActions";
import { TextInput } from "./Input";

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