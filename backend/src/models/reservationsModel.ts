import db from "../db";
import { Reservation } from "../types/Reservation";

class ReservationsModel {
  // Get all reservations
  getReservationssFromDB = async (offset: number, limit: number) => {
    return await db("reservations").select("*").offset(offset).limit(limit);
  };

  getReservationssCount = async (): Promise<number> => {
    const [{ count }] = await db("reservations").count("* as count");
    return Number(count);
  };

  // Create a new reservations
  createReservationsInDB = async (
    reservationsData: Omit<Reservation, "id" | "created_at" | "updated_at">
  ): Promise<Reservation> => {
    const [newReservations] = await db("reservations")
      .insert(reservationsData)
      .returning("*");
    return newReservations;
  };

  // Get a reservations by ID
  getReservationsByIdFromDB = async (
    id: string
  ): Promise<Reservation | null> => {
    return await db("reservations").where({ id }).first();
  };

  // Update an existing reservations
  updateReservationsInDB = async (
    id: string,
    reservationsData: Partial<
      Omit<Reservation, "id" | "created_at" | "updated_at">
    >
  ): Promise<Reservation | null> => {
    const [updatedReservations] = await db("reservations")
      .where({ id })
      .update(reservationsData)
      .returning("*");
    return updatedReservations;
  };

  // Delete a reservations by ID
  deleteReservationsFromDB = async (id: string): Promise<void> => {
    await db("reservations").where({ id }).delete();
  };
}

export default new ReservationsModel();
