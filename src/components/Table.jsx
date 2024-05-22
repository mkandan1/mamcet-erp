import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { ButtonLayout } from "./ButtonLayout";
import { IconButton } from "./Button";
import { Tooltip } from "flowbite-react";
import { API } from "../api/API";
import { useDispatch } from "react-redux";
import { showToast } from "../redux/actions/toastActions";

export const SelectionTable = ({ headers, data, onSelect, rowId }) => {
  return (
    <div className="overflow-x-auto row-span-12 col-span-12 mt-4">
      <table className="table table-sm">
        <thead className="bg-violet-700 border border-base-300 text-white">
          <tr className="border-b border-base-300">
            <th></th>
            {headers.map((header, index) => (
              <th key={index} className="font-medium">{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="border border-base-200">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className={`hover:bg-base-200 cursor-pointer ${row._id == rowId ? 'bg-blue-300' : 'bg-white'}`}>
                <td>{rowIndex + 1}</td>
                {headers.map((header, colIndex) => (
                  <td key={colIndex} onClick={() => onSelect(row._id)}>{row[header.field]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="w-full">
              <td colSpan={headers.length + 1} className="">
                <div className="w-full flex justify-center items-center">
                  <div className="flex gap-2 items-center">
                    <Icon icon={"fluent:box-dismiss-24-filled"} className="text-lg"></Icon>
                    No data available
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


export const MultiSelectionTable = ({ headers, data, onSelect, selectedRow }) => {
  return (
    <div className="overflow-x-auto row-span-12 col-span-12 mt-4">
      <table className="table table-sm">
        <thead className="bg-violet-700 border border-base-300 text-white">
          <tr className="border-b border-base-300">
            <th></th>
            {headers.map((header, index) => (
              <th key={index} className="font-medium">{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="border border-base-200">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className={`hover:bg-base-200 cursor-pointer ${selectedRow.some(subject => subject._id === row._id) ? 'bg-blue-300' : 'bg-white'}`}              >
                <td>{rowIndex + 1}</td>
                {headers.map((header, colIndex) => (
                  <td key={colIndex} onClick={() => onSelect(row)}>{row[header.field]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="w-full">
              <td colSpan={headers.length + 1} className="">
                <div className="w-full flex justify-center items-center">
                  <div className="flex gap-2 items-center">
                    <Icon icon={"fluent:box-dismiss-24-filled"} className="text-lg"></Icon>
                    No data available
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export const MarkAllocationTable = ({ students, semesters, exam, onSelect, selectedRow }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [scores, setScores] = useState(exam.scores);
  const studentsPerPage = 10;

  const totalPages = Math.ceil(students.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const headers = [
    { label: 'Register Number', field: 'registerNumber' },
    { label: 'Name', field: 'name' },
    { label: 'CIA I Exam', field: 'cia1', subHeaders: [] }, // Initialize with an empty array
    { label: 'CIA II Exam', field: 'cia2', subHeaders: [] }, // Initialize with an empty array
    { label: 'Model Exam', field: 'model', subHeaders: [] }, // Initialize with an empty array
  ];

  const subjects = semesters[0].subjects.map(subject => ({
    sub_id: subject._id,
    label: subject.sub_short_name,
    sub_type: subject.sub_type,
    full_name: subject.sub_name,
    field: subject.sub_code
  }));

  subjects.forEach(subject => {
    if (subject.sub_type === 'Lab') {
      headers[4].subHeaders.push(subject);
    } else {
      headers[2].subHeaders.push(subject);
      headers[3].subHeaders.push(subject);
    }
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleInputChange = async (student, examType, subjectField, value) => {
    const scoreData = {
      stud_id: student._id,
      registerNumber: student.registerNumber,
      name: student.name,
      passingYear: student.passingYear,
      score: Number(value),
      examType,
      sub_code: subjectField.field,
      sub_id: subjectField.sub_id
    };
    setScores(prevScores => [
      ...prevScores.filter(score => !(score.stud_id === student._id && score.examType === examType && score.sub_id === subjectField.sub_id)),
      scoreData
    ]);
  };

  const getScoreValue = (studentId, examType, subjectId) => {
    const score = scores.find(score => score.stud_id === studentId && score.examType === examType && score.sub_id === subjectId);
    return score ? score.score : '';
  };

  const handleSaveChanges = () => {
    const data = { ...exam, scores: scores }
    console.log('Saving scores...');
    API.postRequest('/score/update', data)
      .then((result) => {
        dispatch(showToast({ type: result.success ? 'success' : 'err', text: result.message }))
      })
      .catch((err) => dispatch(showToast({ type: 'err', text: err.message })))
  };

  return (
    <div className="overflow-x-auto row-span-12 col-span-12 mt-4">
      <table className="table table-sm">
        <thead className="bg-blue-700 border border-base-300 text-white">
          <tr className="border-b border-base-300">
            <th></th>
            {headers.map((header, index) => (
              <th key={index} colSpan={header.subHeaders ? header.subHeaders.length : 1} className="font-medium border max-w-10">{header.label}</th>
            ))}
          </tr>
          <tr className="border-b border-base-300">
            <th></th>
            {headers.map((header, index) =>
              header.subHeaders ? (
                header.subHeaders.map((subHeader, subIndex) => (
                  <th key={`${index}-${subIndex}`} className="font-medium border">
                    <div className="flex items-start gap-x-1 max-w-2">
                      {subHeader.label}
                      <Tooltip content={subHeader.full_name}>
                        <Icon icon={'ep:info-filled'} className="text-[10px] text-black cursor-pointer" />
                      </Tooltip>
                    </div>
                  </th>
                ))
              ) : (
                <th key={index} className="font-medium"></th>
              )
            )}
          </tr>
        </thead>

        <tbody className="border border-base-200">
          {currentStudents.length > 0 ? (
            currentStudents.map((student, rowIndex) => (
              <tr key={student._id} className={`hover:bg-base-200 cursor-pointer`}>
                <td>{indexOfFirstStudent + rowIndex + 1}</td>
                <td>{student.registerNumber}</td>
                <td>{student.name}</td>
                {headers.map((header, index) => {
                  if (index >= 2) { // Skip first two headers ('Register Number' and 'Name')
                    return header.subHeaders.map((subject, subIndex) => {
                      if (
                        (header.label === 'Model Exam') || // Include all subjects for the Model Exam
                        (header.label !== 'Model Exam' && subject.sub_type !== 'Lab') // Exclude lab subjects for CIA exams
                      ) {
                        return (
                          <td key={`${index}-${subIndex}`} className={`${getScoreValue(student._id, header.label, subject.sub_id) < 50 && getScoreValue(student._id, header.label, subject.sub_id) != '' ? 'bg-red-500' : 'text-base-content'}`}>
                            <input
                              type="number"
                              name={`${header.label}-${student._id}-${subject.field}`}
                              className={`input input-sm w-full ${getScoreValue(student._id, header.label, subject.sub_id) < 50 && getScoreValue(student._id, header.label, subject.sub_id) != '' ? 'bg-red-500' : 'text-base-content'}`}
                              value={getScoreValue(student._id, header.label, subject.sub_id)}
                              onChange={(e) => handleInputChange(student, header.label, subject, e.target.value)}
                            />
                          </td>
                        );
                      } else {
                        return null; // Render nothing for lab subjects in CIA exams
                      }
                    });
                  } else {
                    return null; // Skip first two columns ('Register Number' and 'Name')
                  }
                })}
              </tr>
            ))
          ) : (
            // Render a row with a single cell if there are no students
            <tr className="w-full">
              <td colSpan={headers.length}> {/* Colspan should span all headers */}
                <div className="w-full flex justify-center items-center">
                  <div className="flex gap-2 items-center">
                    <Icon icon={"fluent:box-dismiss-24-filled"} className="text-lg"></Icon>
                    No data available
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <div className="btn-group">
          <button
            className={`btn ${currentPage === 1 ? 'btn-disabled' : ''}`}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`btn ${currentPage === totalPages ? 'btn-disabled' : ''}`}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <ButtonLayout>
        <IconButton text={'Save Changes'} onClick={() => handleSaveChanges()} />
      </ButtonLayout>
    </div>
  );
};