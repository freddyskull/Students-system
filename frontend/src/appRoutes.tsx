import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './login/loginPage';
import { HomePage } from './app/home';
import { CreateStudent } from './app/createStudent';
import { EditStudet } from './app/components/editStudet';
import { ConecctionError } from './conecctionError';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/nuevo-estudiante" element={<CreateStudent />} />
        <Route path="/editar-estudiante/:id" element={<EditStudet />} />
        <Route path="/error/" element={<ConecctionError />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
};