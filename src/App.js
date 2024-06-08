import "./App.css";

import { Route, Routes } from "react-router-dom";
import AcademyDetail from "./components/AcademyDetail";
import ManagerBooks from "./components/ManagerBooks";
import ManagerStaffs from "./components/ManagerStaffs";
import PrivateRoute from "./components/PrivateRoute";
import Academies from "./pages/Academies";
import ChooseProfile from "./pages/ChooseProfile";
import CourtDetail from "./pages/Client/CourtDetail";
import Courts from "./pages/Client/Courts";
import UserProfile from "./pages/Client/UserProfile";
import CourtBook from "./pages/CourtBook";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Manager from "./pages/Manager";
import ManagerAcadamies from "./pages/ManagerAcadamies";
import ManagerCourts from "./pages/ManagerCourts";
import Redirect from "./pages/Redirect";
import SignUp from "./pages/SignUp";
import ManagerCourtsCheck from "./components/Managers/ManagerCourtsCheck";
import ManagerAcademiesCheck from "./components/Managers/ManagerAcademiesCheck";
import UserSubscriptions from "./pages/Client/UserSubscriptions";
import ManagerBalance from "./pages/ManagerBalance";
import ManagerTrainers from "./pages/ManagerTrainers";
import TrainersClient from "./pages/Client/TrainersClient";
import UserRoute from "./components/Routes/UserRoute";
import PasswordReset from "./pages/PasswordReset";
import ManagerTrainersCheck from "./components/ManagerTrainersCheck";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/password/reset/" element={<PasswordReset />} />
        <Route path="/redirect" element={<Redirect />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/check/profile" element={<ChooseProfile />} />

        <Route
          path="/manager/:username"
          element={
            <PrivateRoute>
              <Manager />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/:username/academies"
          element={
            <PrivateRoute>
              <ManagerAcadamies />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/:username/trainers/"
          element={
            <PrivateRoute>
              <ManagerTrainers />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/:username/courts"
          element={
            <PrivateRoute>
              <ManagerCourts />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/:username/books"
          element={
            <PrivateRoute>
              <ManagerBooks />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/:username/staffs"
          element={
            <PrivateRoute>
              <ManagerStaffs />
            </PrivateRoute>
          }
        />
        {/* <Route path='/manager/:username/settings' element={<PrivateRoute><ManagerSettings /></PrivateRoute>} /> */}
        <Route
          path="/manager/:username/balance/"
          element={
            <PrivateRoute>
              <ManagerBalance />
            </PrivateRoute>
          }
        />

        <Route
          path="/staff/:username"
          element={
            <PrivateRoute>
              <Manager />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff/:username/trainers/"
          element={
            <PrivateRoute>
              <ManagerTrainers />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff/:username/academies"
          element={
            <PrivateRoute>
              <ManagerAcadamies />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff/:username/courts"
          element={
            <PrivateRoute>
              <ManagerCourts />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff/:username/books"
          element={
            <PrivateRoute>
              <ManagerBooks />
            </PrivateRoute>
          }
        />
        {/* <Route path='/staff/:username/settings' element={<PrivateRoute><ManagerSettings /></PrivateRoute>} /> */}
        <Route
          path="/staff/:username/balance/"
          element={
            <PrivateRoute>
              <ManagerBalance />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/:username/"
          element={
            <UserRoute>
              <UserProfile />
            </UserRoute>
          }
        />
        <Route
          path="/profile/:username/academies/"
          element={
            <UserRoute>
              <UserSubscriptions />
            </UserRoute>
          }
        />

        <Route
          path="/managers/:academyName/:academyId/courts/"
          element={
            <PrivateRoute>
              <ManagerCourtsCheck />
            </PrivateRoute>
          }
        />
        <Route
          path="/managers/:academyName/:academyId/trainers/"
          element={
            <PrivateRoute>
              <ManagerTrainersCheck />
            </PrivateRoute>
          }
        />
        <Route
          path="/managers/:academyName/:academyId/academies/"
          element={
            <PrivateRoute>
              <ManagerAcademiesCheck />
            </PrivateRoute>
          }
        />

        <Route
          path="/academies/"
          element={
            <UserRoute>
              <Academies />
            </UserRoute>
          }
        />
        <Route
          path="/academies/:academyName/"
          element={
            <UserRoute>
              <AcademyDetail />
            </UserRoute>
          }
        />

        <Route
          path="/trainers/"
          element={
            <UserRoute>
              <TrainersClient />
            </UserRoute>
          }
        />

        <Route path="/courts" element={<Courts />} />
        <Route path="/court/:courtName/:courtId" element={<CourtDetail />} />
        <Route
          path="/court/:courtName/:courtId/book/"
          element={<CourtBook />}
        />
      </Routes>
    </div>
  );
}

export default App;
