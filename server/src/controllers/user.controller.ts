import { NextFunction, Request, Response } from 'express';
import * as User from '../services/user.service';
import * as Book from '../services/book.service';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.getUsers();
    res.status(200).json(users);
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ error: err.message });
    }
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const user = await User.getUser(id);

    const currentBookIds = await User.getCurrentBooks(id);
    const currentBooks = await Book.getBooksByIds(currentBookIds);

    const returnedBooks = await User.getReturnedBooks(id);

    res.status(200).json({
      id: user.id,
      name: user.name,
      books: {
        past: returnedBooks,
        present: currentBooks,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ error: err.message });
    }
  }
};

export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const bookId = Number(req.params.bookId);

    const borrowedBook = await User.borrowBook(id, bookId);
    res.status(200).json(borrowedBook);
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ error: err.message });
    }
  }
};

export const returnBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const bookId = Number(req.params.bookId);
    const rating = Number(req.body.score);
    const borrowedBook = await User.returnBook(id, bookId, rating);
    res.status(200).json(borrowedBook);
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ error: err.message });
    }
  }
};
