import express from "express";
import { processExcel } from "../controller/excelController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// POST route for reading Excel file
router.post("/read", upload.single("file"), processExcel);

export default router;