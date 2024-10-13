// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AboutPage from './components/AboutPage';
import ConsultationPage from './components/ConsultationPage';
import ContactPage from './components/ContactPage';
import EventsPage from './components/EventsPage';
import FAQPage from './components/FAQPage';
import ForumPage from './components/ForumPage';
import ReviewsPage from './components/ReviewsPage';

function App() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <div className="container">
                        <h1>QA Helper Platform</h1>

                        <div className="nav-bar">
                            <input
                                type="search"
                                placeholder="Поиск..."
                                className="search-bar"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <nav>
                                <nav>
                                    <Link to="/about">О проекте</Link>
                                    <Link to="/consultation">Консультации</Link>
                                    <Link to="/events">События</Link>
                                    <Link to="/faq">FAQ</Link>
                                    <Link to="/forum">Форум</Link>
                                    <Link to="/contacts">Контакты</Link>
                                    <Link to="/login" className="auth-button">Вход</Link>
                                    <Link to="/register" className="auth-button">Регистрация</Link>
                                </nav>

                            </nav>
                        </div>
                    </div>
                </header>

                <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/consultation" element={<ConsultationPage />} />
                        <Route path="/contacts" element={<ContactPage />} />
                        <Route path="/events" element={<EventsPage />} />
                        <Route path="/faq" element={<FAQPage />} />
                        <Route path="/forum" element={<ForumPage />} />
                        <Route path="/reviews" element={<ReviewsPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
