import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import db from "../models/index.js";

export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  try {
    if (!token) return res.status(403).json({ message: "No token provided" });

    const decoded = jwt.verify(token, SECRET);

    const user = await db.User.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (!user) return res.status(403).json({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(Date.now() + ": " + "Verification failed");
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
