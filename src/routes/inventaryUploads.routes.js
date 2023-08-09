import { Router } from "express";
import multer, { diskStorage } from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const router = Router();

// Configurar multer
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/inventaries/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = uuidv4() + ext;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

// Ruta para la carga de archivos
router.post("/provider", upload.single("image"), function (req, res) {
  // Verificar si se recibió un archivo de imagen
  if (!req.file) {
    return res.status(400).send("No se encontró ninguna imagen");
  }

  // Construir la URL completa de la imagen con el nuevo nombre
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/inventarios/${
    req.file.filename
  }`;

  // Devolver la URL de la imagen en la respuesta
  res.send(imageUrl);
});

export default router;
