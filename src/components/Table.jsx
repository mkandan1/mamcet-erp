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

export const InternalMarkAllocationTable = ({ students, semesters, exam, onSelect, selectedRow }) => {
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

    const data = { ...exam, scores: scoreData }
    console.log('Saving scores...');
    API.postRequest('/score/update', data)
      .then((result) => {
        dispatch(showToast({ type: result.success ? 'success' : 'err', text: result.message }))
      })
      .catch((err) => dispatch(showToast({ type: 'err', text: err.message })))
  };

  const getScoreValue = (studentId, examType, subjectId) => {
    const score = scores.find(score => score.stud_id === studentId && score.examType === examType && score.sub_id === subjectId);
    return score ? score.score : '';
  };

  const handleSaveChanges = () => {

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

const gradeOptions = [
  { label: 'O', value: 10 },
  { label: 'A+', value: 9 },
  { label: 'A', value: 8 },
  { label: 'B+', value: 7 },
  { label: 'B', value: 6 },
  { label: 'C', value: 5 },
  { label: 'RA', value: 0 }
];

const generatePassingYearOptions = (batchName) => {
  const [startYear, endYear] = batchName.split(' - ').map(Number);
  const options = [];
  for (let year = startYear; year <= endYear; year++) {
    options.push({ label: `APRIL / MAY ${year}`, value: `APRIL / MAY ${year}` });
    options.push({ label: `NOV / DEC ${year}`, value: `NOV / DEC ${year}` });
  }
  return options;
};

export const UniversityMarkAllocationTable = ({ studentsProp, semesters, exam, onSelect, selectedRow }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [scores, setScores] = useState(exam.scores);
  const [students, setStudents] = useState(studentsProp);
  const studentsPerPage = 10;

  const totalPages = Math.ceil(students.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const headers = [
    { label: 'Register Number', field: 'registerNumber' },
    { label: 'Name', field: 'name' },
    { label: 'University Marks', field: 'university', subHeaders: [] },
    { label: `${exam.semester_name} Arrears`, field: 'semester_arrear' },
    { label: 'History of Arrears', field: 'history_of_arrears' },
    { label: 'GPA', field: 'gpa' },
    { label: 'CGPA', field: 'cgpa' },
  ];

  const subjects = semesters[0].subjects.map(subject => ({
    sub_id: subject._id,
    label: subject.sub_short_name,
    sub_type: subject.sub_type,
    full_name: subject.sub_name,
    field: subject.sub_code
  }));

  headers[2].subHeaders = subjects;

  const passingYearOptions = generatePassingYearOptions(exam.batch_name);

  const getScoreValue = (studentId, subjectId) => {
    const score = scores.find(score => score.stud_id === studentId && score.examType === 'University' && score.sub_id === subjectId);
    return score ? score.score : '';
  };

  const getPassingYearValue = (studentId, subjectId) => {
    const score = scores.find(score => score.stud_id === studentId && score.examType === 'University' && score.sub_id === subjectId);
    return score ? score.passingYear : '';
  };

  const handleGradeChange = (student, subjectField, value) => {
    const scoreData = {
      stud_id: student._id,
      registerNumber: student.registerNumber,
      name: student.name,
      passingYear: '',
      score: Number(value),
      examType: 'University',
      sub_code: subjectField.field,
      sub_id: subjectField.sub_id
    };
    const data = { ...exam, scoreData };
    console.log('Saving scores...', data);
    API.postRequest('/score/university/update', data)
      .then((result) => {
        dispatch(showToast({ type: result.success ? 'success' : 'err', text: result.message }));
      })
      .catch((err) => dispatch(showToast({ type: 'err', text: err.message })));
    setScores(prevScores => [
      ...prevScores.filter(score => !(score.stud_id === student._id && score.examType === 'University' && score.sub_id === subjectField.sub_id)),
      scoreData
    ]);
  };

  const handlePassingYearChange = (student, subjectField, value) => {
    const newScores = scores.map(score => {
      if (score.stud_id === student._id && score.examType === 'University' && score.sub_id === subjectField.sub_id) {
        return { ...score, passingYear: value };
      }
      return score;
    });

    setScores(newScores);

    const scoreData = newScores.find(score => score.stud_id === student._id && score.examType === 'University' && score.sub_id === subjectField.sub_id);
    API.postRequest('/score/university/update', { ...exam, scoreData })
      .then((result) => {
        setStudents(result.students)
        dispatch(showToast({ type: result.success ? 'success' : 'err', text: result.message }));
      })
      .catch((err) => dispatch(showToast({ type: 'err', text: err.message })));
  };

  return (
    <div className="overflow-x-auto row-span-12 w-full grid-rows-12 mt-4 h-[75vh]">
      <table className="table table-sm overflow-auto row-span-12 w-full">
        <thead className="bg-blue-700 border border-base-300 w-full text-white">
          <tr className="border-b border-base-300 bg-blue-700">
            <th className="sticky left-0 top-0 z-20 bg-blue-700"></th>
            <th className="sticky left-12 top-0 z-20 bg-blue-700">Register Number</th>
            <th className="sticky left-40 top-0 z-20 bg-blue-700">Name</th>
            {headers.slice(2).map((header, index) => (
              <th key={index} colSpan={header.subHeaders ? header.subHeaders.length * 2 : 1} className="font-medium border">{header.label}</th>
            ))}
          </tr>
          <tr className="border-b border-base-300 bg-blue-700">
            <th className="sticky left-0 top-10 z-10 bg-blue-700"></th>
            <th className="sticky left-10 top-10 z-10 bg-blue-700"></th>
            <th className="sticky left-32 top-10 z-10 bg-blue-700"></th>
            {headers.slice(2).map((header, index) =>
              header.subHeaders ? (
                header.subHeaders.map((subHeader, subIndex) => (
                  <React.Fragment key={`${index}-${subIndex}`}>
                    <th className="font-medium border sticky top-10 bg-blue-700">
                      <div className="flex items-start gap-x-1">
                        {subHeader.label}
                        <Tooltip content={subHeader.full_name}>
                          <Icon icon={'ep:info-filled'} className="text-[10px] text-black cursor-pointer" />
                        </Tooltip>
                      </div>
                    </th>
                    <th className="font-medium border sticky top-10 bg-blue-700">Passing Year</th>
                  </React.Fragment>
                ))
              ) : (
                <th key={index} className="font-medium sticky top-10 bg-blue-700"></th>
              )
            )}
          </tr>
        </thead>
        <tbody className="border border-base-200">
          {currentStudents.length > 0 ? (
            currentStudents.map((student, rowIndex) => (
              <tr key={student._id} className={`hover:bg-base-200 cursor-pointer bg-white h-10`}>
                <td className="sticky left-0 z-10 bg-white">{indexOfFirstStudent + rowIndex + 1}</td>
                <td className="sticky left-10 z-10 bg-white">{student.registerNumber}</td>
                <td className="sticky left-36 z-10 bg-white">{student.name}</td>
                {subjects.map((subject, subIndex) => (
                  <React.Fragment key={`${subject.field}-${subIndex}`}>
                    <td className="border border-gray-100">
                      <select
                        name={`Grade-${student._id}-${subject.field}`}
                        className="border border-gray-300 input-xs h-full w-20"
                        value={getScoreValue(student._id, subject.sub_id)}
                        onChange={(e) => handleGradeChange(student, subject, e.target.value)}
                      >
                        <option value="" disabled>Choose</option>
                        {gradeOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        name={`PassingYear-${student._id}-${subject.field}`}
                        className="border border-gray-300  input-xs h-full w-32 text-gray-500"
                        value={getPassingYearValue(student._id, subject.sub_id)}
                        onChange={(e) => handlePassingYearChange(student, subject, e.target.value)}
                        disabled={getScoreValue(student._id, subject.sub_id) == 0 ? true : false}
                      >
                        <option value="" disabled>Select Passing Year</option>
                        {passingYearOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </td>
                  </React.Fragment>
                ))}
                <td>
                  {student.semesterStats.length > 0 &&
                    student.semesterStats.find(semester => semester.semester_name.toString() === exam.semester_name) ?
                    student.semesterStats.find(semester => semester.semester_name.toString() === exam.semester_name).arrears.length : 0
                  }
                </td>
                <td>
                  {student.history_of_arrears.length > 0 ? 
                    student.history_of_arrears.length : 0
                  }
                </td>
                <td>
                  {student.semesterStats.length > 0 &&
                    student.semesterStats.find(semester => semester.semester_name.toString() === exam.semester_name) ?
                    student.semesterStats.find(semester => semester.semester_name.toString() === exam.semester_name).gpa : 0
                  }
                </td>
                <td>
                  {student.cgpa}
                </td>
              </tr>
            ))
          ) : (
            <tr className="w-full">
              <td colSpan={headers.length * 2} className="">
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
      <div className="flex justify-end mt-4 absolute right-10">
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
        {/* <IconButton text={'Save Changes'} onClick={() => handleSaveChanges()} /> */}
      </ButtonLayout>
    </div>
  );
  

};