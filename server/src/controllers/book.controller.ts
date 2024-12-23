import { NextFunction, Request, Response } from 'express';
import * as Book from '../services/book.service';
import * as User from '../services/user.service';

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await Book.getBooks();
    res.status(200).json(books);
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ error: err.message });
    }
  }
};

export const getBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const book = await Book.getBook(id);
    const bookAvg = await Book.getAvgRating(id);
    const currentOwnerId = await Book.getCurrentOwner(id);
    if (currentOwnerId) {
      const currentOwner = await User.getUser(currentOwnerId.user_id);
      book?.set('currentOwner', currentOwner);
    }
    book?.set('score', bookAvg);

    res.status(200).json(book);
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ error: err.message });
    }
  }
};
