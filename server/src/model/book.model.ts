import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../util/db';

interface BookModel
  extends Model<
    InferAttributes<BookModel>,
    InferCreationAttributes<BookModel>
  > {
  id: number;
  title: string;
  description: string;
  author: string;
  year: number;
  score: number;
  currentOwner: any;
}

export const Book = sequelize.define<BookModel>(
  'books',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      type: DataTypes.VIRTUAL,

      set(value: number) {
        this.setDataValue('score', value);
      },
    },
    currentOwner: {
      type: DataTypes.VIRTUAL,

      set(value: number) {
        this.setDataValue('currentOwner', value);
      },
    },
  },
  { timestamps: false }
);
