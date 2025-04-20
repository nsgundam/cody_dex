import mysql from 'mysql2/promise';

export const mysqlPool = mysql.createPool({
  uri: process.env.MYSQL_URL,
});
