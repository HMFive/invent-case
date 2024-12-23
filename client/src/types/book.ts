import { User } from './user';

export interface Book {
  id: number;
  title: string;
  description: string;
  author: string;
  year: number;
  score: number;
  currentOwner?: User;
}
