import { Book } from './book';

export interface User {
  id: number;
  name: string;
  created_at: string;
}

export interface UserDetail {
  id: number;
  name: string;
  books: {
    past: Book[];
    present: Book[];
  };
  created_at: string;
}
