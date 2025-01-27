import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { ButtonLayout } from "./ButtonLayout";
import { IconButton } from "./Button";
import { Tooltip } from "flowbite-react";
import { API } from "../api/API";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";
import { showToast } from "../redux/actions/toastActions";

export const SelectionTable = ({ headers, data, onSelect, rowId }) => {
  return (
    <div className="overflow-x-auto row-span-12 col-span-12 mt-4">
      <table className="table table-sm">
        <thead className="bg-violet-700 border border-base-300 text-white">
          <tr className="border-b border-base-300">
            <th></th>
            {headers?.map((header, index) => (
              <th key={index} className="font-medium">{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="border border-base-200">
          {data?.length > 0 ? (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex} className={`hover:bg-base-200 cursor-pointer ${row._id == rowId ? 'bg-blue-300' : 'bg-white'}`}>
                <td>{rowIndex + 1}</td>
                {headers?.map((header, colIndex) => (
                  <td key={colIndex} onClick={() => onSelect(row._id)}>{row[header.field]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="w-full">
              <td colSpan={headers?.length + 1} className="">
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

export const SubjectSelectionTable = ({ headers, onAssignFaculty, data, onSelect, rowId }) => {
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    API.getRequest('/employee')
      .then((result) => {
        setStaffs(result.employees);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleFacultyChange = (subjectId, facultyId) => {
    onAssignFaculty(subjectId, facultyId);
  };

  return (
    <div className="overflow-x-auto row-span-12 col-span-12 mt-4">
      <table className="table table-sm">
        <thead className="bg-violet-700 border border-base-300 text-white">
          <tr className="border-b border-base-300">
            <th></th>
            {headers?.map((header, index) => (
              <th key={index} className="font-medium">{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="border border-base-200">
          {data?.length > 0 ? (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex} className={`hover:bg-base-200 cursor-pointer ${row._id === rowId ? 'bg-blue-300' : 'bg-white'}`}>
                <td>{rowIndex + 1}</td>
                {headers?.map((header, colIndex) => (
                  <td key={colIndex} onClick={() => onSelect(row._id)}>
                    {header.field === 'sub_faculty' ? (
                      <select
                        className="input-sm text-xs border-none"
                        onChange={(e) => handleFacultyChange(row._id, e.target.value)}
                        value={row.sub_faculty || ''}
                      >
                        <option value="">Select Faculty</option>
                        {staffs?.map((staff) => (
                          <option key={staff._id} value={staff._id}>{staff.firstName} {staff.lastName}</option>
                        ))}
                      </select>
                    ) : (
                      row[header.field]
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="w-full">
              <td colSpan={headers?.length + 1} className="">
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
            {headers?.map((header, index) => (
              <th key={index} className="font-medium">{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="border border-base-200">
          {data?.length > 0 ? (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex} className={`hover:bg-base-200 cursor-pointer ${selectedRow?.some(subject => subject._id === row._id) ? 'bg-blue-300' : 'bg-white'}`}              >
                <td>{rowIndex + 1}</td>
                {headers?.map((header, colIndex) => (
                  <td key={colIndex} onClick={() => onSelect(row)}>{row[header.field]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="w-full">
              <td colSpan={headers?.length + 1} className="">
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
  const [scores, setScores] = useState(exam.scores || []);
  const studentsPerPage = 10;

  const totalPages = Math.ceil(students?.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students?.slice(indexOfFirstStudent, indexOfLastStudent);

  const headers = [
    { label: 'Register Number', field: 'registerNumber' },
    { label: 'Name', field: 'name' },
    { label: 'CIA I Exam', field: 'cia1', subHeaders: [] },
    { label: 'CIA II Exam', field: 'cia2', subHeaders: [] },
    { label: 'Model Exam', field: 'model', subHeaders: [] },
  ];

  const subjects = semesters[0].subjects?.map(subject => ({
    sub_id: subject.subjectId._id,
    label: subject.subjectId.sub_short_name,
    sub_type: subject.subjectId.sub_type,
    full_name: subject.subjectId.sub_name,
    field: subject.subjectId.sub_code,
    faculty_id: subject.facultyId ? subject.facultyId._id : null,
    faculty_name: subject.facultyId ? `${subject.facultyId.firstName} ${subject.facultyId.lastName}` : 'Not Assigned',
  }));

  subjects?.forEach(subject => {
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
    const numericValue = parseFloat(value); // Ensure the value is converted to a number
    const scoreData = {
      stud_id: student._id,
      registerNumber: student.registerNumber,
      name: student.name,
      passingYear: student.passingYear,
      score: numericValue,
      examType,
      sub_code: subjectField.field,
      sub_id: subjectField.sub_id
    };

    setScores(prevScores => [
      ...prevScores.filter(score => !(score.stud_id === student._id && score.examType === examType && score.sub_id === subjectField.sub_id)),
      scoreData
    ]);

    const data = { ...exam, scoreData };
    try {
      const result = await API.postRequest('/score/internals/update', data);
      dispatch(showToast({ type: result.success ? 'success' : 'err', text: result.message }));
    } catch (err) {
      dispatch(showToast({ type: 'err', text: err.message }));
    }
  };

  const getScoreValue = (studentId, examType, subjectId) => {
    const score = scores.find(score => score.stud_id === studentId && score.examType === examType && score.sub_id === subjectId);
    return score ? score.score : '';
  };

  const handleSaveChanges = () => {
    // Implement save changes logic here
  };

  const calculateStatistics = (students, subjects) => {
    const statistics = {
      'CIA I Exam': { passed: 0, failed: 0 },
      'CIA II Exam': { passed: 0, failed: 0 },
      'Model Exam': { passed: 0, failed: 0 },
    };
  
    students?.forEach(student => {
      ['CIA I Exam', 'CIA II Exam', 'Model Exam']?.forEach(examType => {
        const hasFailed = subjects?.some(subject => {
          const score = getScoreValue(student._id, examType, subject.sub_id);
          return parseFloat(score) < 50;
        });
  
        if (hasFailed) {
          statistics[examType].failed += 1;
        } else {
          statistics[examType].passed += 1;
        }
      });
    });
  
    return statistics;
  };
  
  
  const ExamStatistics = ({ statistics }) => {
    return (
      <div className="stats">
        {Object.keys(statistics)?.map(examType => (
          <div key={examType} className="stat">
            <h3 className="stat-title">{examType}</h3>
            <div className="stat-values">
              <div className="stat-passed">Passed: {statistics[examType].passed}</div>
              <div className="stat-failed">Failed: {statistics[examType].failed}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  
  const generateExcelReport = () => {
    const worksheetData = [];
    const failedStudents = [];
    const passedStudents = [];

    // Headers for Excel
    const excelHeaders = [
      'Register Number',
      'Name',
      'CIA I Exam',
      'CIA II Exam',
      'Model Exam',
      'Status'
    ];

    worksheetData.push(excelHeaders);

    // Populate rows with student data
    students?.forEach(student => {
      // Get scores for each exam
      const cia1Score = getScoreValue(student._id, 'CIA I Exam', subjects[0]?.sub_id);
      const cia2Score = getScoreValue(student._id, 'CIA II Exam', subjects[0]?.sub_id);
      const modelScore = getScoreValue(student._id, 'Model Exam', subjects[0]?.sub_id);

      // Check if any score is below 50
      const hasFailed = [cia1Score, cia2Score, modelScore]?.some(score => parseFloat(score) < 50);

      let row = [
        student.registerNumber,
        student.name,
        cia1Score || '',
        cia2Score || '',
        modelScore || '',
      ];

      if (hasFailed) {
        row.push('Failed');
        failedStudents.push(student);
      } else {
        row.push('Passed');
        passedStudents.push(student);
      }

      worksheetData.push(row);
    });

    // Add summary at the bottom
    worksheetData.push([]);
    worksheetData.push(['Summary']);
    worksheetData.push(['Total Passed', passedStudents?.length]);
    worksheetData.push(['Total Failed', failedStudents?.length]);

    // Generate the worksheet and workbook
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');

    // Export to Excel
    XLSX.writeFile(wb, 'Student_Report.xlsx');
  };

  const statistics = calculateStatistics(students, subjects);

  return (
    <div className="overflow-x-auto row-span-12 col-span-12 mt-4 z-60">
      <ExamStatistics statistics={statistics} />
      <table className="table table-sm">
        <thead className="bg-blue-700 border border-base-300 text-white">
          <tr className="border-b border-base-300">
            <th></th>
            {headers?.map((header, index) => (
              <th key={index} colSpan={header.subHeaders ? header.subHeaders?.length : 1} className="font-medium border max-w-10">{header.label}</th>
            ))}
          </tr>
          <tr className="border-b border-base-300">
            <th></th>
            {headers?.map((header, index) =>
              header.subHeaders ? (
                header.subHeaders?.map((subHeader, subIndex) => (
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
          {currentStudents?.length > 0 ? (
            currentStudents?.map((student, rowIndex) => (
              <tr key={student._id} className={`hover:bg-base-200 cursor-pointer`}>
                <td>{indexOfFirstStudent + rowIndex + 1}</td>
                <td>{student.registerNumber}</td>
                <td>{student.name}</td>
                {headers?.map((header, index) => {
                  if (index >= 2) {
                    return header.subHeaders?.map((subject, subIndex) => {
                      if (
                        (header.label === 'Model Exam') ||
                        (header.label !== 'Model Exam' && subject.sub_type !== 'Lab')
                      ) {
                        return (
                          <td key={`${index}-${subIndex}`} className={`${getScoreValue(student._id, header.label, subject.sub_id) < 50 && getScoreValue(student._id, header.label, subject.sub_id) !== '' ? 'bg-red-200' : 'text-base-content'} ${localStorage.getItem('uid') === subject.faculty_id ? '' : 'bg-gray-200'}`}>
                            <input
                              type="number"
                              disabled={localStorage.getItem('uid') !== subject.faculty_id}
                              name={`${header.label}-${student._id}-${subject.field}`}
                              className={`border ${localStorage.getItem('uid') !== subject.faculty_id ? 'bg-gray-200' : ''} border-gray-300 input-sm w-20 ${getScoreValue(student._id, header.label, subject.sub_id) < 50 && getScoreValue(student._id, header.label, subject.sub_id) !== '' ? 'bg-red-200' : 'text-base-content'}`}
                              value={getScoreValue(student._id, header.label, subject.sub_id)}
                              onChange={(e) => handleInputChange(student, header.label, subject, e.target.value)}
                            />
                          </td>
                        );
                      } else {
                        return null;
                      }
                    });
                  } else {
                    return null;
                  }
                })}
              </tr>
            ))
          ) : (
            <tr className="w-full">
              <td colSpan={headers?.length}>
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

          <button
            className="btn btn-primary ml-4"
            onClick={generateExcelReport}
          >
            Export to Excel
          </button>
        </div>
      </div>
    </div>
  );
};