
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';


import Header from "./components/Header";
import Footer from "./components/Footer";
import ImageSlider from "./components/ImageSlider";
import MainIntro from "./pages/MainIntro";
import Login from "./pages/Login";
import ProfessorIntro from "./pages/ProfessorIntro";
import ClubIntro from "./pages/ClubIntro";
import Staff from "./pages/Staff";
import MySchedule from "./pages/MySchedule";
import Calendar from "./pages/Calendar";
import Recuit from './pages/Recuit';
import PostDetail from './pages/PostDetail';
import PostWrite from './pages/PostWrite';
import PostEdit from "./pages/PostEdit";
import LearningResources from './pages/LearningResources';
import GraduationRequirements from './pages/GraduationRequirement';
import '@fontsource/share-tech-mono';
import ScrollToTop from "./components/ScrollToTop";



function PrivateRoute({ children }) {
  const { isLogged, loading } = useAuth();
  const loc = useLocation();

  if (loading) return <div>로딩 중...</div>;
  return isLogged ? children : <Navigate to="/login" state={{ from: loc }} replace />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Header />
        <div className="page-wrapper">
          <main className="page-content">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <ImageSlider />
                    <MainIntro />
                  </>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/intro/professors" element={<ProfessorIntro />} />
              <Route path="/intro/clubintro" element={<ClubIntro />} />
              <Route path="/intro/staff" element={<Staff />} />
              <Route path="/community/recuit" element={<Recuit />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/resources/learning" element={<LearningResources />} />
              <Route path="/resources/graduation" element={<GraduationRequirements />} />

              <Route
                path="/schedule/schedulelist"
                element={
                  <PrivateRoute>
                    <MySchedule />
                  </PrivateRoute>
                }
              />
              <Route
                path="/schedule/calendar"
                element={
                  <Calendar />
                }
              />
              <Route
                path="/community/recuit/write"
                element={
                  <PrivateRoute>
                    <PostWrite />
                  </PrivateRoute>
                }
              />
              <Route path="/posts/:id/edit"
                element={
                  <PrivateRoute>
                    <PostEdit />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
          </main>
          <Footer />
        </div>

      </AuthProvider>


    </Router>
  );
}

export default App;
