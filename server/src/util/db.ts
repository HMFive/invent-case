import { Sequelize } from 'sequelize';
require('dotenv').config();

declare const process: {
  env: {
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: number;
  };
};
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);
