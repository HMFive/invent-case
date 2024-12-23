import { sequelize } from '../util/db';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id: number;
  name: string;
  created_at: Date;
}

export const User = sequelize.define<UserModel>(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: false, underscored: true }
);
