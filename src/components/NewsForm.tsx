import React, { useState, useEffect } from 'react';
import { NewsItem } from '../types/NewsItem';
import { Button, TextField } from '@mui/material';


/**
 * Интерфейс для компонента NewsForm
 */
interface NewsFormProps {

    /**
     * Функция - обработчик для кнопки "Принять/Добавить"
     * @param item - объект типа NewsItem, содержащий данные для отправки
     */
    onSubmit: (item: NewsItem) => void;

    /**
     * Блок с новостью
     */
    existingNews: NewsItem | null;
}

/**
 * Компонент с формой для создания и редактирования новостей
 * @param onSubmit - функция обработчик кнопки "Принять/Добавить"
 * @param existingNews - блок с новостью
 */
const NewsForm: React.FC<NewsFormProps> = ({ onSubmit, existingNews }) => {
    
    // Состояние title для хранения заголовка новости
    const [title, setTitle] = useState('');
    
    // Состояние body для хранения содержимого новости
    const [body, setBody] = useState('');

    // useEffect срабатывает каждый раз, когда изменяется existingNews
    // Если есть существующая новость, заполняем поля формы её данными 
    // если нет - очищаем поля формы
    useEffect(() => {
        if (existingNews) {

            // Устанавливаем заголовок существующей новости
            setTitle(existingNews.title);

            // Устанавливаем содержимое существующей новости
            setBody(existingNews.content);
        } else {

            // Сброс заголовка
            setTitle('');

            // Сброс содержимого
            setBody('');
        }
        
        // Изменится, если поменяется блок новости
    }, [existingNews]);

    /**
     * Функция обработчик события для отправки формы
     * @param e - событие изменения
     */
    const handleSubmit = (e: React.FormEvent) => {

        // Предотвращаем стандартное поведение формы (перезагрузку страницы)
        e.preventDefault();

        // Создаем объект новостей на основе введённых данных
        const item: NewsItem = {

            // Генерация ID для новых записей
            id: existingNews ? existingNews.id : Date.now(),

            // Используем введённый заголовок
            title,

            // Используем введённое содержимое
            content: body,
        };
        
        // Вызов функции onSubmit с созданным объектом новости
        onSubmit(item);
        
        // Сбрасываем заголовок
        setTitle('');
        
        // Сбрасываем блок новости
        setBody('');
    };

    // Возвращаем JSX элемент, который содержит структуру формы создания и редактирования новости
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Заголовок"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                {existingNews ? 'Принять' : 'Добавить'}
            </Button>
        </form>
    );
};

// Экспортируем компонент NewsForm
export default NewsForm;