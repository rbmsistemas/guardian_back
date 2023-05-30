import app from "./app.js";
import { PORT } from "./config.js";
import connection from "./db.js";
function main() {
  try {
    app.listen(PORT);
    console.log("Server on port", PORT);
    connection.query(
      "SELECT 2 + 2 AS solution",
      function (error, results, fields) {
        if (error) throw error;
        console.log("The solution is: ", results[0].solution);
      }
    );
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
}

main();
