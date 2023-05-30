import connection from "../db";

export async function login(req, res) {
  req.body = req.body || {};
  const { email, password } = req.body;
  try {
    const [rows] = await connection.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );
    if (rows.length > 0) {
      const user = rows[0];
      res.json({
        message: "User logged",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
}

export async function register(req, res) {
  req.body = req.body || {};
  const { email, password, name, lastname } = req.body;
  try {
    const [rows] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (rows.length > 0) {
      res.status(404).json({
        message: "User already exists",
      });
    } else {
      const [rows] = await connection.query(
        "INSERT INTO users (email, password, name, lastname) VALUES (?, ?, ?, ?)",
        [email, password, name, lastname]
      );
      res.json({
        message: "User created",
        data: rows,
      });
    }
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
}

export async function logout(req, res) {
  res.json({
    message: "User logout",
  });
}
