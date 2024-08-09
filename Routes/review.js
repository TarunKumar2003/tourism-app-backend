import express from "express";
import { createReview } from "../Controller/reviewController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
//create review
router.post("/:tourId",verifyUser, createReview);
export default router;