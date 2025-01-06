import express from "express";
import reservationsController from "../../controllers/reservationsController";
import { Type } from "@sinclair/typebox";
import { validate } from "../../middleware/validateRequest";

const router = express.Router();

const GetReservationssQuerySchema = Type.Object({
  page: Type.Optional(Type.Number({ minimum: 1 })),
  limit: Type.Optional(Type.Number({ minimum: 1 })),
});
router.get("/", validate(GetReservationssQuerySchema), reservationsController.getReservationss); // GET /reservationss : no input required

// schema for input validation using typebox
const ReservationsIdSchema = Type.Object({
  id: Type.String(),
});
router.get(
  "/:id",
  validate(ReservationsIdSchema, "params"),
  reservationsController.getReservationsById
); // GET /reservationss/:id : requires input
router.put(
  "/:id",
  validate(ReservationsIdSchema, "params"),
  reservationsController.updateReservations
); // PUT /reservationss/:id : requires input
router.delete(
  "/:id",
  validate(ReservationsIdSchema, "params"),
  reservationsController.deleteReservations
); // DELETE /reservationss/:id : requires input

// schema for input validation using typebox
const AddReservationsSchema = Type.Object({
  // guest id
  // room ids
  // checkin date
  // checkout date

  guestId: Type.String(),
  roomIds: Type.Array(Type.String()),
  checkinDate: Type.Date(),
  checkoutDate: Type.Date(),
});
router.post("/", validate(AddReservationsSchema), reservationsController.createReservations); // POST /reservationss : requires input

export default router;
