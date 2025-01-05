import express from "express";
import { getGuests, createGuest } from "../../controllers/guestController";

const router = express.Router();

router.get("/", getGuests); // GET /guests
router.post("/", createGuest); // POST /guests

export default router;
