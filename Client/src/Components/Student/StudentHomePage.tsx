import React, { useState, useEffect } from "react";
import api from "../../Services/api-login";
import { useParams } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { FaRegChartBar } from "react-icons/fa";
import { IoAnalytics } from "react-icons/io5";
import ProgressChart from "./Progreess"; // Import the chart component

interface Subject {
  _id: string;
  subjectName: string;
}

interface Semester {
  test1: number | null;
  test2: number | null;
  classActivity: number | null;
  midExam: number | null;
  finalExam: number | null;
}

interface Result {
  firstSemester: Semester;
  secondSemester: Semester;
  subject: Subject;
  _id: string;
}

function StudentHomePage() {
  const [results, setResults] = useState<Result[]>([]); // Correctly typed results array
  const { username } = useParams<{ username: string }>(); // Assuming username comes from params
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const [isFirstSemester, setIsFirstSemester] = useState(true); // Default to the first semester
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal state

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Fetching results with expected type Result[]
        const response = await api.get<Result[]>(
          `/student/${username}/results`
        );
        setResults(response.data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data");
      }
    };

    fetchResults();
  }, [username]);

  const handleSemesterToggle = () => {
    setIsFirstSemester(!isFirstSemester);
  };

  const openChartModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white h-screen flex flex-col justify-center items-center text-center p-6">
          <h1 className="text-4xl font-bold">Welcome</h1>
        </div>
        <div className="container mx-auto mt-8 p-4">
          <h2 className="text-xl font-semibold mb-4">Subject List</h2>
          <div className="space-y-4">
            {error && <p className="text-danger">{error}</p>}
            <div className="flex justify-end mb-4">
              <label className="flex items-center space-x-2">
                <span>First Semester</span>
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  checked={!isFirstSemester}
                  onChange={handleSemesterToggle}
                />
                <span>Second Semester</span>
              </label>
            </div>
            {/* Display subject results */}
            {results.map((result) => (
              <div key={result._id}>
                <button
                  onClick={() =>
                    setSelectedSubjectId(
                      selectedSubjectId === result.subject._id
                        ? null
                        : result.subject._id
                    )
                  }
                  className="w-full text-left flex justify-between p-4 btn btn-outline"
                >
                  {result.subject.subjectName}
                  {selectedSubjectId === result.subject._id ? (
                    <IoIosClose />
                  ) : (
                    <IoMdArrowDropdown />
                  )}
                </button>
                {selectedSubjectId === result.subject._id && (
                  <div className="card bg-base-100 w-full md:max-w-md shadow-xl">
                    <div className="card-body">
                      <h2 className="card-title">
                        Result for {result.subject.subjectName}
                      </h2>
                      {/* Display either first or second semester results */}
                      {isFirstSemester ? (
                        <>
                          <p>Test 1: {result.firstSemester.test1 ?? "N/A"}</p>
                          <p>Test 2: {result.firstSemester.test2 ?? "N/A"}</p>
                          <p>
                            Class Activity:{" "}
                            {result.firstSemester.classActivity ?? "N/A"}
                          </p>
                          <p>
                            Mid Exam: {result.firstSemester.midExam ?? "N/A"}
                          </p>
                          <p>
                            Final Exam:{" "}
                            {result.firstSemester.finalExam ?? "N/A"}
                          </p>
                        </>
                      ) : (
                        <>
                          <p>Test 1: {result.secondSemester.test1 ?? "N/A"}</p>
                          <p>Test 2: {result.secondSemester.test2 ?? "N/A"}</p>
                          <p>
                            Class Activity:{" "}
                            {result.secondSemester.classActivity ?? "N/A"}
                          </p>
                          <p>
                            Mid Exam: {result.secondSemester.midExam ?? "N/A"}
                          </p>
                          <p>
                            Final Exam:{" "}
                            {result.secondSemester.finalExam ?? "N/A"}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 p-6">
          <button className="btn btn-success flex-1 md:flex-none px-6 py-3 flex items-center justify-center text-white rounded-lg hover:bg-green-700 transition-all">
            See All Result <IoAnalytics className="ml-2" />
          </button>
          <button
            className="btn btn-success flex-1 md:flex-none px-6 py-3 flex items-center justify-center text-white rounded-lg hover:bg-green-700 transition-all"
            onClick={openChartModal}
          >
            See Chart
          </button>
          <button className="btn btn-success flex-1 md:flex-none px-6 py-3 flex items-center justify-center text-white rounded-lg hover:bg-green-700 transition-all">
            Message <AiOutlineMessage className="ml-2" />
          </button>
        </div>

        {/* Modal for Chart */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-3/4 h-3/4 overflow-y-auto relative">
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={closeModal}
              >
                <IoIosClose size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-4">Progress Chart</h2>
              {/* Pass all results to the chart component */}
              <ProgressChart
                results={results}
                isFirstSemester={isFirstSemester}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default StudentHomePage;
