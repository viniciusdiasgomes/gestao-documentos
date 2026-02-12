import { Router } from "express";
import { upload } from "../config/upload.js";
import {
  createDocument,
  listDocuments,
  getDocumentById,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/documentsController.js";

const router = Router();

router.get("/", listDocuments);
router.get("/:id", getDocumentById);


router.post("/", upload.single("file"), createDocument);
router.post("/:id/comments", createComment);


router.put("/:documentId/comments/:commentId", updateComment);
router.delete("/:documentId/comments/:commentId", deleteComment);

export default router;