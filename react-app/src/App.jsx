import { AuthProvider } from './context/AuthContext';
import { DashboardProvider } from './context/DashboardContext';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import QuizPage from './pages/QuizPage';
import RegisterPage from './pages/RegisterPage';
import CandidateDashboardPage from './pages/CandidateDashboardPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import MentorDashboardPage from './pages/MentorDashboardPage';

export default function App() {
  const path = window.location.pathname;

  const renderCurrentPage = () => {
    if (path === '/kesfet' || path === '/search') return <ExplorePage />;
    if (path === '/quiz') return <QuizPage />;
    if (path === '/kayit') return <RegisterPage />;
    if (path === '/panel/ogrenci') return <StudentDashboardPage />;
    if (path === '/panel/aday') return <CandidateDashboardPage />;
    if (path === '/panel/mentor') return <MentorDashboardPage />;
    return <HomePage />;
  };

  return (
    <AuthProvider>
      <DashboardProvider>
        {renderCurrentPage()}
      </DashboardProvider>
    </AuthProvider>
  );
}
