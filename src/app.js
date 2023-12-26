import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import pingRoutes from "./routes/ping.routes.js";
import companyRoutes from "./routes/company.routes.js";
import uploadsRoutes from "./routes/uploads.routes.js";
import uploadsInventoryRoutes from "./routes/inventoryUploads.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import inventoryTypeRoutes from "./routes/inventoryType.routes.js";
import inventoryBrand from "./routes/inventoryBrand.routes.js";
import inventoryModel from "./routes/inventoryModel.routes.js";
import inventoryField from "./routes/inventoryField.routes.js";
import inventoryUploadFilesRoutes from "./routes/inventoryUploadFiles.routes.js";

const app = express();

app.use(cors([process.env.FRONTEND_URL]));

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api", pingRoutes);
app.use("/api", companyRoutes);
app.use("/api", inventoryRoutes);
app.use("/api", inventoryTypeRoutes);
app.use("/api", inventoryBrand);
app.use("/api", inventoryModel);
app.use("/api", inventoryField);
app.use("/api/uploads", uploadsInventoryRoutes);
app.use("/api/uploads", inventoryUploadFilesRoutes);
app.use("/api/uploads", uploadsRoutes);

app.use((err, req, res, next) => {
  res.status(404).send({ error: err.message });
});

export default app;
