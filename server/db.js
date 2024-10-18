import pkg from "pg";
const { Pool } = pkg;
export const pool = new Pool({
  user: "postgres",
  password: "mohsoo",
  host: "localhost",
  port: 5432,
  database: "perntodo",
});
// Port 5432 is used for connecting your application to the PostgreSQL server, not for web access.
