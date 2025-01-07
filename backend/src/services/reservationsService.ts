import reservationsModel from "../models/reservationsModel";
import { Reservation } from "../types/Reservation";


// --todo: retrieve upcoming/past reservations for specific guest/room sorted by most recent--
// --todo: total amount of upcoming reservations for specific guest/room--
// --todo: current reservation for specific guest/room--
// --todo: when creating a reservation, check if room is available--
// --todo: when creating a reservation, validate check-in and check-out dates--
// --todo: when creating a reservation, handle multiple rooms ( in reservation model as well )--
// todo: handle race conditions
// todo: cancel reservation
class ReservationsService {
  getAllReservationss = async (page: number = 1, limit: number = 10) => {
    const offset = (page - 1) * limit;
    const reservationss = await reservationsModel.getReservationssFromDB(
      offset,
      limit
    );
    const total = await reservationsModel.getReservationssCount(); // Get total count of reservationss
    return {
      data: reservationss,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  };



  getReservationsById = async (id: string): Promise<Reservation | null> => {
    return await reservationsModel.getReservationsByIdFromDB(id);
  };

  updateReservations = async (
    id: string,
    reservationsData: Partial<
      Omit<Reservation, "id" | "created_at" | "updated_at">
    >
  ): Promise<Reservation | null> => {
    return await reservationsModel.updateReservationsInDB(id, reservationsData);
  };

  deleteReservations = async (id: string): Promise<void> => {
    await reservationsModel.deleteReservationsFromDB(id);
  };

  getUpcomingReservations = async (
    page: number = 1,
    limit: number = 10,
    guestId?: string,
    roomId?: string
  ) => {
    const offset = (page - 1) * limit;

    const reservations = await reservationsModel.getUpcomingReservations(
      guestId,
      roomId,
      offset,
      limit
    );

    const total = await reservationsModel.countUpcomingReservations(
      guestId,
      roomId
    );

    return {
      data: reservations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  };

  getPastReservations = async (
    page: number = 1,
    limit: number = 10,
    guestId?: string,
    roomId?: string
  ) => {
    const offset = (page - 1) * limit;

    const reservations = await reservationsModel.getPastReservations(
      guestId,
      roomId,
      offset,
      limit
    );

    const total = await reservationsModel.countPastReservations(
      guestId,
      roomId
    );

    return {
      data: reservations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  };

  getCurrentReservation = async (guestId?: string, roomId?: string) => {
    // at least one of guestId or roomId must be provided
    if (!guestId && !roomId) {
      throw new Error(
        "Either guestId or roomId must be provided to fetch the current reservation."
      );
    }

    // Fetch current reservation from the model
    return await reservationsModel.getCurrentReservation(guestId, roomId);
  };

  isRoomAvailable = async (
    roomId: string,
    checkIn: string,
    checkOut: string
  ): Promise<boolean> => {
    // Ensure check-in date is before check-out date
    if (new Date(checkIn) >= new Date(checkOut)) {
      throw new Error("Check-in date must be before check-out date.");
    }

    // Call model to check availability
    const available = await reservationsModel.isRoomAvailable(
      roomId,
      checkIn,
      checkOut
    );
    if (!available) {
      throw new Error(
        `Room ${roomId} is not available for the selected dates.`
      );
    }

    return available;
  };
  async createReservation(data: {
    guestId: string;
    roomIds: string[];
    check_in: string;
    check_out: string;
  }) {
    const { guestId, roomIds, check_in, check_out } = data;

    // Check availability for all rooms
    for (const roomId of roomIds) {
      await this.isRoomAvailable(roomId, check_in, check_out);
    }

    // If all rooms are available, create reservation
    const newReservation = await reservationsModel.createReservation({
      guest_id: guestId,
      check_in: check_in,
      check_out: check_out,
    });

    // Link rooms to the reservation
    for (const roomId of roomIds) {
      await reservationsModel.linkRoomToReservation(newReservation.id, roomId);
    }

    return newReservation;
  }
}

export default new ReservationsService();
