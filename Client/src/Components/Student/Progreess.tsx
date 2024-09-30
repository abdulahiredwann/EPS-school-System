import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Semester {
  test1: number | null;
  test2: number | null;
  classActivity: number | null;
  midExam: number | null;
  finalExam: number | null;
}

interface Subject {
  _id: string;
  subjectName: string;
}

interface Result {
  firstSemester: Semester;
  secondSemester: Semester;
  subject: Subject;
}

interface ProgressChartProps {
  results: Result[];
  isFirstSemester: boolean;
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  results,
  isFirstSemester,
}) => {
  const data = {
    labels: results.map((result) => result.subject.subjectName),
    datasets: [
      {
        label: "Total Score (Percentage)",
        data: results.map((result) => {
          const semester = isFirstSemester
            ? result.firstSemester
            : result.secondSemester;
          return (
            (semester.test1 || 0) +
            (semester.test2 || 0) +
            (semester.classActivity || 0) +
            (semester.midExam || 0) +
            (semester.finalExam || 0)
          );
        }),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Student Progress",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100, // Max score is 100%
      },
    },
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProgressChart;
