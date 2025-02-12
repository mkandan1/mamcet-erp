import React, { useState } from "react";

export const ViewResult = () => {
    const [rollNumber, setRollNumber] = useState("");
    const [dob, setDob] = useState("");
    const [student, setStudent] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const gradeOptions = [
        { label: 'O', value: 10 },
        { label: 'A+', value: 9 },
        { label: 'A', value: 8 },
        { label: 'B+', value: 7 },
        { label: 'B', value: 6 },
        { label: 'C', value: 5 },
        { label: 'RA', value: 0 }
    ];

    const getGradeLabel = (marks) => {
        const grade = gradeOptions.find(option => option.value === marks);
        return grade ? grade.label : marks;
    };

    const fetchResult = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const formattedDob = dob.split("-").reverse().join("-");

        API.getRequest(`/score/university/get?regNo=${rollNumber}&dob=${formattedDob}`)
        .then((response) => {
            console.log("API Response:", response);
    
            if (response.success) {
                setStudent(response.data);
                setStudent((prev) => ({ ...prev }));
            } else {
                setStudent(null);
                setError(response.message || "No results found.");
            }
        })
        .catch((err) => {
            console.error("Error fetching results:", err);
            dispatch(
                showToast({
                    type: "error",
                    text: err.response?.data?.message || "Failed to fetch results.",
                    icon: "carbon:close-filled",
                })
            );
            setError("Failed to fetch results. Please try again later.");
        })
        .finally(() => {
            setLoading(false);
        });    
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <header className="flex flex-col items-center text-center mb-8">
                <img src="/logo.jpg" alt="SASC Logo" className="w-28 mb-3 shadow-lg rounded-full" />
                <h1 className="text-2xl font-bold text-gray-800">
                    SELVAMM ARTS AND SCIENCE COLLEGE (Autonomous)
                </h1>
            </header>

            {/* Main Content */}
            <main className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-center text-gray-700">Student Result</h2>

                {/* Form */}
                <form onSubmit={fetchResult} className="flex flex-col gap-4 mt-6">
                    <input
                        type="text"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        placeholder="Enter Roll Number"
                        required
                        className="border p-3 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                        className="border p-3 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    />
                    <button type="submit" className="bg-blue-600 text-white p-3 rounded-md shadow hover:bg-blue-700">
                        {loading ? "Fetching..." : "Get Result"}
                    </button>
                </form>

                {/* Error Message */}
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

                {/* Student Info */}
                {student && (
                    <div className="mt-6 p-4 bg-gray-50 border rounded-lg shadow-sm">
                        <div className="flex items-center gap-4">
                            <img
                                src={
                                    student.photo ||
                                    "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                                }
                                alt="Student"
                                className="w-16 h-16 rounded-full border shadow"
                            />
                            <div>
                                <p className="font-semibold text-gray-800">{student.name}</p>
                                <p className="text-gray-600">Reg No: {student.regNo}</p>
                                <p className="text-gray-600">College: {student.college}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Table */}
                {student && student.exams.length > 0 && (
                    <div className="mt-6">
                        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="p-3 border">Semester</th>
                                    <th className="p-3 border">Subject</th>
                                    <th className="p-3 border">Grade</th>
                                    <th className="p-3 border">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {student.exams.map((exam, index) =>
                                    Object.entries(exam.subjects).map(([subject, marks], subIndex) => (
                                        <tr key={`${exam.sem}-${subject}`} className="text-center border">
                                            <td className="p-3 border bg-gray-50">{subIndex === 0 ? exam.sem : ""}</td>
                                            <td className="p-3 border">{subject}</td>
                                            <td className="p-3 border font-semibold">{getGradeLabel(marks)}</td>
                                            <td className={`p-3 border font-semibold ${marks >= 5 ? "text-green-600" : "text-red-600"}`}>
                                                {marks >= 5 ? "Pass" : "Fail"}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
};
