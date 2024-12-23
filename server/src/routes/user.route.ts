import express from 'express';
import * as userController from '../controllers/user.controller';

const router = express.Router();

router.get('/users', userController.getUsers);

router.get('/users/:id', userController.getUser);

router.post('/users/:id/borrow/:bookId', userController.borrowBook);

router.post('/users/:id/return/:bookId', userController.returnBook);

export default router;
