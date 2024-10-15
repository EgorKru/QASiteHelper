import React, { useState } from 'react'; // Импортируем React и useState
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Импортируем компоненты Formik
import * as Yup from 'yup'; // Импортируем Yup для валидации
import './LoginPage.css'; // Импортируем CSS для стилизации страницы входа

// Компонент для страницы входа
const LoginPage = () => {
    // Определяем схему валидации с использованием Yup
    const validationSchema = Yup.object({
        username: Yup.string().required('Имя пользователя обязательно'), // Поле обязательно
        password: Yup.string().required('Пароль обязателен'), // Поле обязательно
    });

    // Обработчик для отправки формы
    const handleSubmit = (values) => {
        console.log('Вход:', values); // Логируем значения для входа
        // Логика для входа
    };

    return (
        <div className="login-container"> {/* Контейнер для стилизации */}
            <h2>Вход</h2> {/* Заголовок страницы */}
            <Formik
                initialValues={{ username: '', password: '' }} // Начальные значения полей формы
                validationSchema={validationSchema} // Схема валидации
                onSubmit={handleSubmit} // Обработчик при отправке формы
            >
                {() => (
                    <Form>
                        {/* Поле для ввода имени пользователя */}
                        <div className="input-container">
                            <Field
                                type="text"
                                name="username" // Имя поля
                                placeholder=" " // Пустой плейсхолдер
                                className="input" // Класс для стилизации
                            />
                            <label className="field-label"> {/* Подпись к полю */}
                                Имя пользователя
                            </label>
                            <ErrorMessage name="username" component="div" className="error-message" /> {/* Сообщение об ошибке */}
                        </div>
                        {/* Поле для ввода пароля */}
                        <div className="input-container">
                            <Field
                                type="password"
                                name="password" // Имя поля
                                placeholder=" " // Пустой плейсхолдер
                                className="input" // Класс для стилизации
                            />
                            <label className="field-label"> {/* Подпись к полю */}
                                Пароль
                            </label>
                            <ErrorMessage name="password" component="div" className="error-message" /> {/* Сообщение об ошибке */}
                        </div>
                        <button type="submit">Войти</button> {/* Кнопка для отправки формы */}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

// Экспортируем компонент для использования в других частях приложения
export default LoginPage;
