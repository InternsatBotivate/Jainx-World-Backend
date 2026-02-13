import express from "express";
import { getPrograms } from "../controllers/hp.controller.js";

const router = express.Router();

router.get("/programs", getPrograms);

export default router;
