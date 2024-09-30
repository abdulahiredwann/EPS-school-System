import React, { useState, useEffect } from "react";
import api from "../../Services/api-login";

interface Subject {
  _id: string;
  subjectName: string;
}

interface Exam {
  midExam1: number | null;
  midExam2: number | null;
  finalExam: number | null;
}

interface Result {
  exams: Exam;
  subject: Subject;
  _id: string;
}

interface Props {
  username: string;
}

function StudentHomePage({ username }: Props) {
  const [results, setResults] = useState<Result[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Fetch the results (includes subjects and exam scores)
    const fetchResults = async () => {
      try {
        const response = await api.get(`/student/${username}/results`);
        setResults(response.data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data");
      }
    };

    fetchResults();
  }, [username]);

  const handleSubjectClick = (subjectId: string) => {
    // Toggle the selected subject
    setSelectedSubjectId((prevId) => (prevId === subjectId ? null : subjectId));
  };

  return (
    <>
      <div className="">
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white h-screen flex flex-col justify-center items-center text-center p-6">
          <h1 className="text-4xl font-bold">Welcome</h1>
        </div>
        <div className="container mx-auto mt-8 p-4">
          <h2 className="text-xl font-semibold mb-4">Subject List</h2>
          <div className="space-y-4">
            {error && <p className="text-danger">{error}</p>}
            {results.map((result) => (
              <div key={result._id}>
                <button
                  onClick={() => handleSubjectClick(result.subject._id)}
                  className="w-full text-left p-4 bg-blue-200 rounded-md shadow-md hover:bg-blue-300 transition duration-300 ease-in-out"
                >
                  {result.subject.subjectName}
                </button>
                {/* Show result table for the selected subject */}
                {selectedSubjectId === result.subject._id && (
                  <div className="p-4 bg-gray-100 rounded-md shadow-inner mt-2">
                    <h3 className="font-semibold mb-2">
                      Results for {result.subject.subjectName}
                    </h3>
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                          <tr>
                            <th scope="col">Mid Exam 1</th>
                            <th scope="col">Mid Exam 2</th>
                            <th scope="col">Final Exam</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {result.exams.midExam1 !== null
                                ? result.exams.midExam1
                                : "N/A"}
                            </td>
                            <td>
                              {result.exams.midExam2 !== null
                                ? result.exams.midExam2
                                : "N/A"}
                            </td>
                            <td>
                              {result.exams.finalExam !== null
                                ? result.exams.finalExam
                                : "N/A"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentHomePage;
