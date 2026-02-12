import { Router } from "express";
import { upload } from "../config/upload.js";
import { createDocument } from "../controllers/documentsController.js";

const router = Router();

router.post("/", upload.single("file"), createDocument);

export default router;