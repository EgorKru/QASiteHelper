import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './LoginPage.css';

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object({
        username: Yup.string().required('Имя пользователя обязательно'),
        password: Yup.string().required('Пароль обязателен'),
    });

    const handleSubmit = (values) => {
        setLoading(true);
        setStatusMessage('');
        console.log('Вход:', values);

        // Симуляция асинхронного запроса
        setTimeout(() => {
            setLoading(false);
            setStatusMessage('Вход успешен!'); // или 'Ошибка входа', если нужно
        }, 2000);
    };

    return (
        <div className="login-container neon-background">
            <h2>Вход</h2>
            {statusMessage && <div className="status-message">{statusMessage}</div>}
            {loading && <div className="progress-bar"></div>}
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, setFieldTouched }) => (
                    <Form>
                        <div className="input-container">
                            <Field
                                type="text"
                                name="username"
                                className="input"
                                onBlur={(e) => {
                                    setFieldTouched("username");
                                    handleChange(e);
                                }}
                            />
                            <label className="field-label">Имя пользователя</label>
                            <ErrorMessage name="username" component="div" className="error-message" />
                        </div>
                        <div className="input-container">
                            <div className="password-wrapper">
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="input password-input"
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                            <label className="field-label">Пароль</label>
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Загрузка...' : 'Войти'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginPage;
