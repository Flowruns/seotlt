import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App.tsx";

/**
 * Привязываем приложение к корню документа
 * Создает корневой элемент ReactDOM в DOM-узле с идентификатором root
 * Знак восклицания после getElementById('root') указывает TypeScript, 
 * что элемент с таким идентификатором точно существует в DOM
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
