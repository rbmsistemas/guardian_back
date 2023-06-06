import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors([process.env.FRONTEND_URL]));

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  res.status(404).send({ error: err.message });
});

export default app;
