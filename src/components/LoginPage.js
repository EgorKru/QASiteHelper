import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './LoginPage.css';

const LoginPage = () => {
    const validationSchema = Yup.object({
        username: Yup.string().required('Имя пользователя обязательно'),
        password: Yup.string().required('Пароль обязателен'),
    });

    const handleSubmit = (values) => {
        console.log('Вход:', values);
        // Логика для входа
    };

    return (
        <div className="login-container">
            <h2>Вход</h2>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        <div className="input-container">
                            <Field
                                type="text"
                                name="username"
                                placeholder=" "
                                className="input"
                            />
                            <label className="field-label">
                                Имя пользователя
                            </label>
                            <ErrorMessage name="username" component="div" className="error-message" />
                        </div>
                        <div className="input-container">
                            <Field
                                type="password"
                                name="password"
                                placeholder=" "
                                className="input"
                            />
                            <label className="field-label">
                                Пароль
                            </label>
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>
                        <button type="submit">Войти</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginPage;
