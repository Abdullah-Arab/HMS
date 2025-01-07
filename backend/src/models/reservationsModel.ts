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

  getUpcomingReservations = async (
    guestId?: string,
    roomId?: string,
    offset: number = 0,
    limit: number = 10
  ) => {
    const query = db("reservations")
      .join(
        "reservations_rooms",
        "reservations.id",
        "reservations_rooms.reservation_id"
      ) // Join with the many-to-many table
      .select("reservations.*") // Select fields from reservations
      .where("reservations.check_in", ">", new Date().toISOString()) // Upcoming reservations
      .orderBy("reservations.check_in", "asc") // Sort by nearest check-in
      .offset(offset)
      .limit(limit);

    if (guestId) {
      query.andWhere("reservations.guest_id", guestId);
    }

    if (roomId) {
      query.andWhere("reservations_rooms.room_id", roomId);
    }

    return await query;
  };

  countUpcomingReservations = async (
    guestId?: string,
    roomId?: string
  ): Promise<number> => {
    const query = db("reservations")
      .join(
        "reservations_rooms",
        "reservations.id",
        "reservations_rooms.reservation_id"
      )
      .where("reservations.check_in", ">", new Date().toISOString()); // Upcoming reservations

    if (guestId) {
      query.andWhere("reservations.guest_id", guestId);
    }

    if (roomId) {
      query.andWhere("reservations_rooms.room_id", roomId);
    }

    const [{ count }] = await query.count("* as count");
    return Number(count);
  };

  getPastReservations = async (
    guestId?: string,
    roomId?: string,
    offset: number = 0,
    limit: number = 10
  ) => {
    const query = db("reservations")
      .join(
        "reservations_rooms",
        "reservations.id",
        "reservations_rooms.reservation_id"
      ) // Join with the many-to-many table
      .select("reservations.*") // Select fields from reservations
      .where("reservations.check_out", "<", new Date().toISOString())
      .orderBy("reservations.check_out", "desc") // Sort by the most recent past checkout
      .offset(offset)
      .limit(limit);

    if (guestId) {
      query.andWhere("reservations.guest_id", guestId);
    }

    if (roomId) {
      query.andWhere("reservations_rooms.room_id", roomId);
    }

    return await query;
  };

  countPastReservations = async (
    guestId?: string,
    roomId?: string
  ): Promise<number> => {
    const query = db("reservations")
      .join(
        "reservations_rooms",
        "reservations.id",
        "reservations_rooms.reservation_id"
      )
      .where("reservations.check_out", "<", new Date().toISOString()); // Past reservations

    if (guestId) {
      query.andWhere("reservations.guest_id", guestId);
    }

    if (roomId) {
      query.andWhere("reservations_rooms.room_id", roomId);
    }

    const [{ count }] = await query.count("* as count");
    return Number(count);
  };

  getCurrentReservation = async (guestId?: string, roomId?: string) => {
    const query = db("reservations")
      .join(
        "reservations_rooms",
        "reservations.id",
        "reservations_rooms.reservation_id"
      )
      .select("reservations.*")
      .where("reservations.check_in", "<=", new Date().toISOString())
      .andWhere("reservations.check_out", ">=", new Date().toISOString());

    if (guestId) {
      query.andWhere("reservations.guest_id", guestId);
    }

    if (roomId) {
      query.andWhere("reservations_rooms.room_id", roomId);
    }

    return await query.first(); // Fetch the first matching reservation
  };
}

export default new ReservationsModel();
