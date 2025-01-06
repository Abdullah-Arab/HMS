import express from "express";
import guestController from "../../controllers/guestController";
import { Type } from "@sinclair/typebox";
import { validate } from "../../middleware/validateRequest";

const router = express.Router();

const GetGuestsQuerySchema = Type.Object({
  page: Type.Optional(Type.Number({ minimum: 1 })),
  limit: Type.Optional(Type.Number({ minimum: 1 })),
});
router.get("/", validate(GetGuestsQuerySchema), guestController.getGuests); // GET /guests : no input required

// schema for input validation using typebox
const GuestIdSchema = Type.Object({
  id: Type.String(), // Change to Type.String() for route params
});
router.get(
  "/:id",
  validate(GuestIdSchema, "params"),
  guestController.getGuestById
);
router.put(
  "/:id",
  validate(GuestIdSchema, "params"),
  guestController.updateGuest
);
router.delete(
  "/:id",
  validate(GuestIdSchema, "params"),
  guestController.deleteGuest
);

// schema for input validation using typebox
const AddGuestSchema = Type.Object({
  name: Type.String(),
  email: Type.String(),
  phone: Type.String(),
});
router.post("/", validate(AddGuestSchema), guestController.createGuest); // POST /guests : requires input

export default router;
