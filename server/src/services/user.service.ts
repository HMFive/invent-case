import { ReturnedBook } from '../model/returned-book.model';
import { Book } from '../model/book.model';
import { User } from '../model/user.model';
import { BorrowedBook } from '../model/borrowed-book.model';

export const getUsers = async () => {
  return await User.findAll();
};

export const getUser = async (id: number) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error('User not found');
  } else {
    return user;
  }
};

export const getCurrentBooks = async (id: number) => {
  const borrowedBooks = await BorrowedBook.findAll({
    where: { user_id: id },
    attributes: ['book_id'],
  });
  return borrowedBooks.map((r) => Number(r.book_id));
};

export const getReturnedBooks = async (id: number) => {
  const returnedBooks = await ReturnedBook.findAll({
    where: { user_id: id },
    attributes: [
      'id',
      'book.title',
      'book.author',
      'book.year',
      'rating',
      'created_at',
      'checked_at',
    ],
    include: [
      {
        model: Book,
        attributes: [],
      },
    ],
    raw: true,
  });

  return returnedBooks;
};

export const borrowBook = async (id: number, bookId: number) => {
  const book = await Book.findByPk(bookId);
  const borrowedBooks = await BorrowedBook.findOne({
    where: { book_id: bookId },
  });
  if (!book) {
    throw new Error('There is no book');
  }
  if (borrowedBooks) {
    throw new Error('This book has been borrowed');
  }
  const borrowedBook = await BorrowedBook.create({
    user_id: id,
    book_id: bookId,
  });

  return borrowedBook;
};

export const returnBook = async (
  id: number,
  bookId: number,
  rating: number
) => {
  const book = await Book.findByPk(bookId);
  const borrowedBook = await BorrowedBook.findOne({
    where: { book_id: bookId, user_id: id },
  });

  if (!book) {
    throw new Error('There is no book');
  }
  if (!borrowedBook) {
    throw new Error('You dont have that book');
  }

  const returnedBook = await ReturnedBook.create({
    book_id: bookId,
    rating: rating,
    user_id: id,
    checked_at: borrowedBook.created_at,
  });
  await BorrowedBook.destroy({
    where: {
      book_id: bookId,
    },
  });

  return returnedBook;
};
