import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import AdminPanel from './pages/AdminPanel';
import JobListPage from './pages/JobListPage';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Routes>
                        <Route path="/" element={<JobListPage />} />
                        <Route path="/admin" element={<AdminPanel />} />
                    </Routes>
                </Router>
            </PersistGate>
        </Provider>
    );
};

export default App;
