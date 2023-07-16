export interface BookInfo {
  author: string;
  bookId: string;
  categoryName: string;
  coverImg: string;
  desc: string;
  title: string;
  wordCount?: number;
  isSerial?: boolean;
  minorCate?: string;
  chapters?: string[];
  chapterInfo?: ChapterInfo;
}

export interface ChapterInfo {
  chapterId: string;
  chapterIndex: number;
  chapterName: string;
  content: string[];
}
