// src/components/RegisterPage.js
import React, { useState } from 'react'; // Импорт React и хук useState

// Компонент для страницы регистрации
const RegisterPage = () => {
    // Состояния для хранения значений полей формы
    const [username, setUsername] = useState(''); // Имя пользователя
    const [password, setPassword] = useState(''); // Пароль
    const [confirmPassword, setConfirmPassword] = useState(''); // Подтверждение пароля

    // Функция для обработки отправки формы
    const handleSubmit = (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
        //TODO Логика для регистрации (продумать макет и реализацию)
        if (password === confirmPassword) { // Проверка на совпадение паролей
            console.log('Регистрация:', { username, password }); // Логируем данные для регистрации
        } else {
            alert('Пароли не совпадают'); // Уведомляем пользователя о несоответствии паролей
        }
    };

    return (
        <div>
            <h2>Регистрация</h2> {/* Заголовок страницы регистрации */}
            <form onSubmit={handleSubmit}> {/* Обработчик события отправки формы */}
                <input
                    type="text"
                    placeholder="Имя пользователя" // Подсказка для ввода
                    value={username} // Значение поля ввода
                    onChange={(e) => setUsername(e.target.value)} // Обновляем состояние при изменении
                    required // Поле обязательно для заполнения
                />
                <input
                    type="password"
                    placeholder="Пароль" // Подсказка для ввода
                    value={password} // Значение поля ввода
                    onChange={(e) => setPassword(e.target.value)} // Обновляем состояние при изменении
                    required // Поле обязательно для заполнения
                />
                <input
                    type="password"
                    placeholder="Подтвердите пароль" // Подсказка для ввода
                    value={confirmPassword} // Значение поля ввода
                    onChange={(e) => setConfirmPassword(e.target.value)} // Обновляем состояние при изменении
                    required // Поле обязательно для заполнения
                />
                <button type="submit">Зарегистрироваться</button> {/* Кнопка для отправки формы */}
            </form>
        </div>
    );
};

// Экспортируем компонент для использования в других частях приложения
export default RegisterPage;
