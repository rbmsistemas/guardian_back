import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import pingRoutes from "./routes/ping.routes.js";
import proveedoresRoutes from "./routes/proveedores.routes.js";
import uploadsRoutes from "./routes/uploads.routes.js";
import uploadsInventaryRoutes from "./routes/inventaryUploads.routes.js";
import inventaryRoutes from "./routes/inventary.routes.js";
import inventaryTypesRoutes from "./routes/inventaryTypes.routes.js";
import inventaryBrands from "./routes/inventaryBrands.routes.js";
import inventaryModels from "./routes/inventaryModels.routes.js";

const app = express();

app.use(cors([process.env.FRONTEND_URL]));

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api", pingRoutes);
app.use("/api", proveedoresRoutes);
app.use("/api", inventaryRoutes);
app.use("/api", inventaryTypesRoutes);
app.use("/api", inventaryBrands);
app.use("/api", inventaryModels);
app.use("/api/uploadsInventary", uploadsInventaryRoutes);
app.use("/api/uploads", uploadsRoutes);

app.use((err, req, res, next) => {
  res.status(404).send({ error: err.message });
});

export default app;
