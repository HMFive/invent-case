import express from 'express';
import * as bookController from '../controllers/book.controller';

const router = express.Router();

router.get('/books', bookController.getBooks);

router.get('/books/:id', bookController.getBook);

export default router;
