import { Router } from "express";
import multer, { diskStorage } from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const router = Router();

// Configurar multer
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/inventories/files/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = uuidv4() + ext;
    cb(null, filename);
  },
});

// Configurar multer para aceptar varios tipos de archivos
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedFileTypes = [
      "pdf",
      "txt",
      "xlsx",
      "xls",
      "docx",
      "doc",
      "csv",
      "pptx",
      "ppt",
    ];

    // Verificar la extensión del archivo
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedFileTypes.includes(ext.substring(1))) {
      return cb(null, true);
    } else {
      return cb(new Error("Formato de archivo no permitido"));
    }
  },
});

// Ruta para la carga de archivos
router.post("/inventory/file", upload.single("file"), function (req, res) {
  // Verificar si se recibió un archivo
  if (!req.file) {
    return res.status(400).send("No se encontró ningún archivo");
  }

  // Construir la URL completa del archivo con el nuevo nombre
  const fileUrl = `/uploads/inventories/files/${req.file.filename}`;

  // Devolver la URL del archivo en la respuesta
  res.send(fileUrl);
});

export default router;
