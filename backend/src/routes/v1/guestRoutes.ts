import express from "express";
import guestController from "../../controllers/guestController";

const router = express.Router();

router.get("/", guestController.getGuests); // GET /guests
router.post("/", guestController.createGuest); // POST /guests

export default router;
