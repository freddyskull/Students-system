import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './login/loginPage';
import { HomePage } from './app/home';
import { CreateStudent } from './app/createStudent';
import { EditStudet } from './app/components/editStudet';
import { ConecctionError } from './conecctionError';

const ProtectedRoute = ({ children }: { children: any }) => {
  const isAuthenticated = sessionStorage.getItem('auth');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/nuevo-estudiante"
          element={
            <ProtectedRoute>
              <CreateStudent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editar-estudiante/:id"
          element={
            <ProtectedRoute>
              <EditStudet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/error/"
          element={
            <ProtectedRoute>
              <ConecctionError />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};