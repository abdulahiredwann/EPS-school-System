import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import AdminLogin from "./Components/Admin/AdminLogin";
import Admin from "./Components/Admin/Admin";
import CreateNewStudent from "./Components/Admin/CreateNewStudent";
import CreateNewTeacher from "./Components/Admin/CreateNewTeacher";
import StudentLogin from "./Components/Student/StudentLogin";
import TeacherLogin from "./Components/Teacher/TeacherLogin";
import Teacher from "./Components/Teacher/Teacher";
import Student from "./Components/Student/Student";
import HomePage from "./Components/Home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route
              path="/adminlogin"
              element={<AdminLogin></AdminLogin>}
            ></Route>
            <Route path="/admin" element={<Admin></Admin>}></Route>
            <Route
              path="/createstudent"
              element={<CreateNewStudent></CreateNewStudent>}
            ></Route>
            <Route
              path="/createteacher"
              element={<CreateNewTeacher></CreateNewTeacher>}
            ></Route>
            <Route
              path="/studentlogin"
              element={<StudentLogin></StudentLogin>}
            ></Route>
            <Route
              path="/student/:username"
              element={<Student></Student>}
            ></Route>
            <Route
              path="/teacher/:username"
              element={<Teacher></Teacher>}
            ></Route>
            <Route
              path="/loginteacher"
              element={<TeacherLogin></TeacherLogin>}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
