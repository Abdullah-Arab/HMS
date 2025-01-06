import express from "express";
import guestController from "../../controllers/guestController";
import { Type } from "@sinclair/typebox";
import { validate } from "../../middleware/validateRequest";


const router = express.Router();

router.get("/", guestController.getGuests); // GET /guests : no input required

// schema for input validation using typebox
const GuestIdSchema = Type.Object({
  id: Type.String(), // Change to Type.String() for route params
});
router.get("/:id", validate(GuestIdSchema), guestController.getGuestById); // GET /guests/:id : requires input
router.put("/:id", validate(GuestIdSchema), guestController.updateGuest); // PUT /guests/:id : requires input
router.delete("/:id", validate(GuestIdSchema), guestController.deleteGuest); // DELETE /guests/:id : requires input

// schema for input validation using typebox
const AddGuestSchema = Type.Object({
    name: Type.String(),
    email: Type.String(),
    phone: Type.String(),
    });
router.post("/", validate(AddGuestSchema), guestController.createGuest); // POST /guests : requires input


export default router;
