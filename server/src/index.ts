import express, { Express } from 'express';
import userRoute from './routes/user.route';
import bookRoute from './routes/book.route';
import { ReturnedBook } from './model/returned-book.model';
import { Book } from './model/book.model';
import { sequelize } from './util/db';
import bodyParser from 'body-parser';
import cors from 'cors';

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bookRoute);
app.use(userRoute);

Book.hasMany(ReturnedBook, { foreignKey: 'book_id' });
ReturnedBook.belongsTo(Book);

sequelize.sync().then(() => {
  app.listen(process.env.SERVER_PORT);
});
