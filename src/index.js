import app from "./app.js";
import { PORT } from "./config.js";

function main() {
  try {
    app.listen(PORT);
    console.log("Server on port", PORT);
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
}

main();