import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../util/db';

interface ReturnedBookModel
  extends Model<
    InferAttributes<ReturnedBookModel>,
    InferCreationAttributes<ReturnedBookModel>
  > {
  id: CreationOptional<number>;
  book_id: number;
  user_id: number;
  rating: number;
  created_at: CreationOptional<Date>;
  checked_at: Date;
}

export const ReturnedBook = sequelize.define<ReturnedBookModel>(
  'returned_books',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    checked_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },

  { timestamps: false, underscored: true }
);
