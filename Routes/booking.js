import express from "express";
import { createBooking, getBooking, getAllBooking } from "../Controller/bookingController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
//create review
router.post("/",verifyUser, createBooking);
router.get("/:id",verifyUser, getBooking);
router.get("/",verifyAdmin, getAllBooking);
export default router;