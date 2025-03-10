import React, { useEffect, useState } from "react";
import NewsForm from "./components/NewsForm";
import NewsList from "./components/NewsList";
import {Container, Grid2} from "@mui/material";
import { NewsItem } from "./types/NewsItem";
import {fetchNews} from "./api/newsApi.ts";


/**
 * Основной компонент приложения
 */
const App: React.FC = () => {
    
    // Состояние для хранения списка новостей
    const [news, setNews] = useState<NewsItem[]>([]);

    // Состояние для управления редактируемой новостью
    const [editingItem, setEditingItem] = useState<NewsItem | null>(null);

    // Эффект для получения новостей из API на монтирование компонента
    useEffect(() => {
        const loadNews = async () => {

            // Получаем новости из API
            const fetchedNews = await fetchNews();

            // Устанавливаем полученные новости в состояние
            setNews(fetchedNews); 
        };

        // Вызываем функцию загрузки новостей
        loadNews(); 
    }, []); 

    // Эффект для загрузки новостей из localStorage
    useEffect(() => {
        const loadNews = () => {

            // Получаем новости из localStorage
            const localNews = localStorage.getItem("news"); 
            
            // если получили
            if (localNews) {

                // Парсим и устанавливаем новости в состояние, если они существуют
                setNews(JSON.parse(localNews)); 
            }
        };

        // Вызов функции для загрузки новостей
        loadNews(); 
    }, []);

    // Функция для сохранения новостей в localStorage
    const saveToLocalStorage = (data: NewsItem[]) => {

        // Сохраняем новости в виде строки JSON
        localStorage.setItem("news", JSON.stringify(data)); 
    };

    // Обработчик добавления новости
    const handleAddNews = (item: NewsItem) => {

        // Добавляем новость в текущий список
        const updatedNews = [...news, item];

        // Обновляем состояние
        setNews(updatedNews);

        // Сохраняем обновленный список в localStorage
        saveToLocalStorage(updatedNews); 
    };

    // Обработчик редактирования новости
    const handleEditNews = (id: number) => {

        // Находим новость по её ID
        const itemToEdit = news.find((item) => item.id === id);

        // Устанавливаем редактируемую новость или null, если не найдена
        setEditingItem(itemToEdit || null); 
    };

    // Обработчик обновления новости
    const handleUpdateNews = (item: NewsItem) => {

        // Обновляем новость, если её ID совпадает
        const updatedNews = news.map((newsItem) =>
            newsItem.id === item.id ? item : newsItem 
        );

        // Обновляем состояние
        setNews(updatedNews);

        // Сохраняем обновленный список в localStorage
        saveToLocalStorage(updatedNews);

        // Сбрасываем редактируемую новость на null
        setEditingItem(null); 
    };

    // Обработчик удаления новости
    const handleDeleteNews = (id: number) => {

        // Фильтруем новости для удаления
        const updatedNews = news.filter((item) => item.id !== id);

        // Обновляем состояние
        setNews(updatedNews);
        
        // Сохраняем обновленный список в localStorage
        saveToLocalStorage(updatedNews); 
    };

    return (
        <Container style={{ maxWidth: "600px", marginTop: "20px" }}>
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <NewsForm
                        onSubmit={editingItem ? handleUpdateNews : handleAddNews}
                        existingNews={editingItem}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <NewsList news={news} onDelete={handleDeleteNews} onEdit={handleEditNews} />
                </Grid2>
            </Grid2>
        </Container>
    );
};

// Экспортируем компонент App
export default App; 