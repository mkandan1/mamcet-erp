import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { ButtonLayout } from "./ButtonLayout";
import { IconButton } from "./Button";
import { Tooltip } from "flowbite-react";
import { API } from "../api/API";
import { useDispatch } from "react-redux";
import { showToast } from "../redux/actions/toastActions";

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
      sub_id: subject.subjectId._id,
      label: subject.subjectId.sub_short_name,
      sub_type: subject.subjectId.sub_type,
      full_name: subject.subjectId.sub_name,
      field: subject.subjectId.sub_code,
      faculty_id: subject.facultyId ? subject.facultyId._id : null,  // Include faculty ID if present
      faculty_name: subject.facultyId ? `${subject.facultyId.firstName} ${subject.facultyId.lastName}` : 'Not Assigned'  // Include faculty name if present
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
          setStudents(result.students)
        })
        .catch((err) => dispatch(showToast({ type: 'err', text: err.message })));
      setScores(prevScores => [
        ...prevScores.filter(score => !(score.stud_id === student._id && score.examType === 'University' && score.sub_id === subjectField.sub_id)),
        scoreData
      ]);
    };
  
    const handlePassingYearChange = (student, subjectField, value) => {
        const updatedScores = scores.map(score => {
          if (score.stud_id === student._id && score.examType === 'University' && score.sub_id === subjectField.sub_id) {
            return { ...score, passingYear: value };
          }
          return score;
        });
      
        setScores(updatedScores);
      
        // Find the updated score data
        const updatedScoreData = updatedScores.find(score => 
          score.stud_id === student._id && score.examType === 'University' && score.sub_id === subjectField.sub_id
        );
      
        // If no score data is found, return
        if (!updatedScoreData) return;
      
        // Send update request
        API.postRequest('/score/university/update', { ...exam, scoreData: updatedScoreData })
          .then((result) => {
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
                      <th className="font-medium border bg-blue-700">
                        <div className="flex items-start gap-x-1">
                          {subHeader.label}
                          <Tooltip content={subHeader.full_name}>
                            <Icon icon={'ep:info-filled'} className="text-[10px] text-black cursor-pointer" />
                          </Tooltip>
                        </div>
                      </th>
                      <th className="font-medium border bg-blue-700">Passing Year</th>
                    </React.Fragment>
                  ))
                ) : (
                  <th key={index} className="font-medium bg-blue-700"></th>
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