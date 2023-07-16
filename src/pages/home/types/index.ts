import { BookInfo } from '../../../types/book';

export interface Ranking {
  id: string;
  title: string;
  books: BookInfo[];
}

export interface Banner {
  src: string;
  alt: string;
}

export interface HomeData {
  banner: Banner[];
  limited: BookInfo[];
  popular: BookInfo[];
  ranking: Ranking[];
  recommend: BookInfo[];
}
