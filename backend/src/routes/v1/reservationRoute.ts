import express from "express";
import reservationsController from "../../controllers/reservationsController";
import { Type } from "@sinclair/typebox";
import { validate } from "../../middleware/validateRequest";

const router = express.Router();

const GetReservationssQuerySchema = Type.Object({
  page: Type.Optional(Type.Number({ minimum: 1 })),
  limit: Type.Optional(Type.Number({ minimum: 1 })),
});
router.get(
  "/",
  validate(GetReservationssQuerySchema),
  reservationsController.getReservationss
); // GET /reservationss : no input required

const reservationByRoomOrGuestSchema = Type.Object({
  page: Type.Optional(Type.Integer({ minimum: 1 })), // Default: 1
  limit: Type.Optional(Type.Integer({ minimum: 1 })), // Default: 10
  guestId: Type.Optional(Type.String()), // Optional guest ID
  roomId: Type.Optional(Type.String()), // Optional room ID
});
router.get(
  "/upcoming",
  validate(reservationByRoomOrGuestSchema, "query"),
  reservationsController.getUpcomingReservations
); // GET /reservations/upcoming

// Route to get past reservations
router.get(
  "/past",
  validate(reservationByRoomOrGuestSchema, "query"),
  reservationsController.getPastReservations
);

router.get(
  "/current",
  validate(reservationByRoomOrGuestSchema, "query"),
  reservationsController.getCurrentReservation
);
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
  guestId: Type.String(),
  roomIds: Type.Array(Type.String()),
  checkinDate: Type.Date(),
  checkoutDate: Type.Date(),
});
router.post(
  "/",
  validate(AddReservationsSchema),
  reservationsController.createReservations
); // POST /reservationss : requires input

export default router;
