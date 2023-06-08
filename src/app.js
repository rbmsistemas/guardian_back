import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import pingRoutes from "./routes/ping.routes.js";
import proveedoresRoutes from "./routes/proveedores.routes.js";
import uploadsRoutes from "./routes/uploads.routes.js";

const app = express();

app.use(cors([process.env.FRONTEND_URL]));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", pingRoutes);
app.use("/api", proveedoresRoutes);
app.use("/api/uploads", uploadsRoutes);

app.use((err, req, res, next) => {
  res.status(404).send({ error: err.message });
});

export default app;
