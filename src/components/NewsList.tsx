import React from 'react';
import { NewsItem } from '../types/NewsItem';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


/**
 * Интерфейс для компонента NewsList
 */
interface NewsListProps {

    /**
     * Массив новостей
     */
    news: NewsItem[];

    /**
     * Функция обработчик удаления новости
     * @param id - айди новостного блока
     */
    onDelete: (id: number) => void;

    /**
     * Функция обработчик редактирования новости
     * @param id - айди новостного блока
     */
    onEdit: (id: number) => void;
}

/**
 * Компонент со списком новостей
 * @param news - массив новостей
 * @param onDelete - функция обработчик удаления новости
 * @param onEdit - функция обработчик редактирования новости
 */
const NewsList: React.FC<NewsListProps> = ({ news, onDelete, onEdit }) => {

    // Возвращаем JSX элемент, который содержит структуру списка новостей
    return (
        <List>
            {news.map((item) => (
                <ListItem key={item.id}>
                    <ListItemText primary={item.title} secondary={item.title} />
                        <IconButton edge="end" onClick={() => onEdit(item.id)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" onClick={() => onDelete(item.id)}>
                            <DeleteIcon />
                        </IconButton>
                </ListItem>
            ))}
        </List>
    );
};

// Экспортируем компонент NewsList
export default NewsList;