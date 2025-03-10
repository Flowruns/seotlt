import axios from 'axios';


/**
 * Функция для получения массива новостей
 */
export const fetchNews = async () => {
    
    // HTTP-запрос с помощью библиотеки axios для получения данных с jsonplaceholder.typicode.com
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    
    // Возвращаем полученные данные
    return response.data;
};