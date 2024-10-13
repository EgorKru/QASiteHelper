// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
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
                        <Link to="/" className="header-title">QA Helper Platform</Link> {/* Заголовок теперь кликабельный */}

                        <div className="nav-bar">
                            <input
                                type="search"
                                placeholder="Поиск..."
                                className="search-bar"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <nav>
                                <Link to="/login" className="auth-button">Вход</Link>
                            </nav>
                        </div>
                    </div>
                </header>

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
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
