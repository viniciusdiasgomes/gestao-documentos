import { Router } from "express";
import { upload } from "../config/upload.js";
import {
  createDocument,
  listDocuments,
  getDocumentById,
} from "../controllers/documentsController.js";

const router = Router();

router.get("/:id", getDocumentById);
router.get("/", listDocuments);
router.post("/", upload.single("file"), createDocument);

export default router;