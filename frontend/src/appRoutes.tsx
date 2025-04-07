import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './login/loginPage';
import { HomePage } from './app/home';
import { CreateStudent } from './app/createStudent';
import { EditStudet } from './app/components/editStudet';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/nuevo-estudiante" element={<CreateStudent />} />
        <Route path="/editar-estudiante/:id" element={<EditStudet />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};