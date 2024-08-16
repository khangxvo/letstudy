import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        // <LoginPage />
        // < HomePage />
        <Router>
            <Routes>
                <Route path='/homepage' element={<HomePage />}></Route>
                <Route path='/' element={<LoginPage />}></Route>
            </Routes>
        </Router>

    );
}

export default App;
