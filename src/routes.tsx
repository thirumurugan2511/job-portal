// src/routes.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobListPage from './pages/JobListPage';
import AdminPanel from './pages/AdminPanel'; // Import your admin panel

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<JobListPage />} />
            <Route path="/admin" element={<AdminPanel />} /> {/* Admin route */}
        </Routes>
    </Router>
);

export default AppRoutes;
