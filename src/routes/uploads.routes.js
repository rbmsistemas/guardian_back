import { Router } from "express";
import multer, { diskStorage } from "multer";
import path from "path";

const router = Router();

// Configurar multer
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/proveedores/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Ruta para la carga de archivos
router.post("/provider", upload.single("image"), function (req, res) {
  // Verificar si se recibió un archivo de imagen
  if (!req.file) {
    return res.status(400).send("No se encontró ninguna imagen");
  }

  // Construir la URL completa de la imagen
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/proveedores/${
    req.file.filename
  }`;

  // Devolver la URL de la imagen en la respuesta
  res.send(imageUrl);
});

export default router;
