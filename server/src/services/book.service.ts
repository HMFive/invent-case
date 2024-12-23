import { Book } from '../model/book.model';
import { ReturnedBook } from '../model/returned-book.model';

import { BorrowedBook } from '../model/borrowed-book.model';

export const getBooks = async () => {
  return Book.findAll();
};

export const getBooksByIds = async (id: number[]) => {
  return await Book.findAll({
    where: {
      id: id,
    },
  });
};

export const getBook = async (id: number) => {
  const book = await Book.findByPk(id);

  if (!book) {
    throw new Error('Book not found');
  }
  return book;
};

export const getAvgRating = async (id: number) => {
  const returnedBooks = await ReturnedBook.findAll({
    where: { book_id: id },
    attributes: ['rating', 'user_id'],
  });

  if (returnedBooks.length === 0) {
    return -1;
  }

  const ratingArray = returnedBooks.map((r) => {
    return r.rating;
  });

  const avgRating = ratingArray.reduce((a, b) => a + b / ratingArray.length);

  return Number(avgRating.toFixed(1));
};

export const getCurrentOwner = async (id: number) => {
  const currentOwner = await BorrowedBook.findOne({
    attributes: ['user_id'],
    where: {
      book_id: id,
    },
  });
  if (currentOwner) {
    return currentOwner;
  }
};
