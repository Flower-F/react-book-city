import { Navigate, createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { ShelfPage } from '../pages/shelf';
import { RankingPage } from '../pages/ranking';
import { CategoryPage } from '../pages/category';
import { SearchPage } from '../pages/search';
import { BookListPage } from '../pages/bookList';
import { DetailPage } from '../pages/detail';
import { ChapterPage } from '../pages/chapter';

export const routerConfig = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/shelf',
    element: <ShelfPage />,
  },
  {
    path: '/ranking',
    element: <RankingPage />,
  },
  {
    path: '/category',
    element: <CategoryPage />,
  },
  {
    path: '/search',
    element: <SearchPage />,
  },
  {
    path: '/booklist/:key',
    element: <BookListPage />,
  },
  {
    path: '/book/:id',
    element: <DetailPage />,
  },
  {
    path: '/book/:bookId/:chapterId',
    element: <ChapterPage />,
  },
  {
    path: '*',
    element: <Navigate to='/' />,
  },
]);
