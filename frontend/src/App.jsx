import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserManagement from './pages/UserManagement';
import ModifyUser from './pages/ModifyUser';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/allusers" element={<UserManagement />} />
                    <Route path="/modify/:id" element={<ModifyUser />} />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;