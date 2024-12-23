import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../util/db';

interface BorrowedBookModel
  extends Model<
    InferAttributes<BorrowedBookModel>,
    InferCreationAttributes<BorrowedBookModel>
  > {
  book_id: number;
  user_id: number;
  created_at: CreationOptional<Date>;
}
export const BorrowedBook = sequelize.define<BorrowedBookModel>(
  'borrowed_books',
  {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },

  { timestamps: false, underscored: true }
);
