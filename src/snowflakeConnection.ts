require("dotenv").config();
import snowflake from 'snowflake-sdk';
import sequelize from "./database";
import Book from "./models/Book";

export default function snowflakeConnection() {

  const connection = snowflake.createConnection({
    account: `${process.env.ACCOUNT}`,
    username: `${process.env.USER_NAME}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DATABASE}`,
    warehouse: `${process.env.WAREHOUSE}`,
    schema: `${process.env.SCHEMA}`,
  });
  
  // connection.connect((err, conn) => {
  //   if (err) {
  //     console.error(`No se puede conectar: ${err.message}`);
  //   } else {
  //     console.log('Conexión exitosa a Snowflake.');
  //     const connection_ID = conn.getId();
  
  //     // Ejecuta una consulta simple
  //     conn.execute({
  //       sqlText: 'SELECT CURRENT_VERSION()',
  //       complete: (err, stmt, rows) => {
  //         if (err) {
  //           console.error(`Error al ejecutar la consulta: ${err.message}`);
  //         } else {
  //           if (rows && rows.length > 0) {
  //             console.log('La versión actual de Snowflake es: ', rows[0]);
  //           } else {
  //             console.log('No se devolvieron filas.');
  //           }
  //         }
  //       }
  //     });
  //   }
  // });
  connection.connect((err, conn) => {
    if (err) {
      console.error(`can't connect to Snowflake: ${err.message}`);
    } else {
      console.log('Connection success to Snowflake.');
      const connection_ID = conn.getId();

      // Execute search query
      conn.execute({
        sqlText: 'SELECT * FROM table', 
        complete: (err, stmt, rows) => {
          if (err) {
            console.error(`Error executing query to Snowflake: ${err.message}`);
          } else {
            if (rows && rows.length > 0) {
              console.log('Data retreived from Snowflake:', rows);

              sequelize.sync()
                .then(() => Book.bulkCreate(rows))
                .then(() => console.log('Data saved within PostgreSQL.'))
                .catch(error => console.error('Error saving data into PostgreSQL:', error));
            } else {
              console.log('No rows retreived from Snowflake.');
            }
          }
        }
      });
    }
  });
}

