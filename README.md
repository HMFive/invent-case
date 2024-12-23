How to Install

- Clone the project
- Create MySQL database with the provided DDLs
- `cd server`
- `npm install`
- set following properties in .env file
  `SERVER_PORT
DB_NAME
DB_USERNAME
DB_PASSWORD
DB_HOST
DB_PORT`
- `npm start`
- `cd ../client/`
- `npm install`
- set .env VITE_API_URL to server api url
- `npm run dev`
