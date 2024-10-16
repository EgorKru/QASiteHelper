import React from 'react';
import './CompilerPage.css';

const CompilerPage = () => {
    return (
        <div className="compiler-page">
            <div className="description">
                <h2>Описание модуля</h2>
                <p>
                    В этом модуле вы изучите основы Java, включая синтаксис, 
                    переменные, операторы и основы объектно-ориентированного 
                    программирования. Каждый раздел содержит интерактивные 
                    задания для закрепления знаний.
                </p>
            </div>
            <div className="modules-container">
                <h2>Темы</h2>
                <div className="modules-list">
                    <div className="module-item">Введение в Java</div>
                    <div className="module-item">Переменные и типы данных</div>
                    <div className="module-item">Условные операторы</div>
                    <div className="module-item">Циклы</div>
                    <div className="module-item">Методы и функции</div>
                    <div className="module-item">Объектно-ориентированное программирование</div>
                </div>
            </div>
        </div>
    );
};

export default CompilerPage;
