import { Knex } from "knex";

const config: Knex.Config = {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "database_username or root",
    password: "database_password",
    database: "todo",
  },
  migrations: {
    directory: "./db/migrations",
  },

};

export default config;
