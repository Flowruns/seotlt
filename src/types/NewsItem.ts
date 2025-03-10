/**
 * Интерфейс для одной новости
 */
export interface NewsItem {

    /**
     * Айди новости
     */
    id: number;

    /**
     * Заголовок новости
     */
    title: string;

    /**
     * Контент новости
     */
    content: string;
}