import reservationsModel from "../models/reservationsModel";
import { Reservation } from "../types/Reservation";


// todo: retrieve upcoming/past reservations for specific guest/room sorted by most recent
// todo: total amount of upcoming reservations for specific guest/room
// todo: current reservation for specific guest/room
// todo: when creating a reservation, check if room is available
// todo: when creating a reservation, validate check-in and check-out dates
// todo: when creating a reservation, handle multiple rooms ( in reservation model as well )
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

  addReservations = async (
    reservationsData: Omit<Reservation, "id" | "created_at" | "updated_at">
  ): Promise<Reservation> => {
    return await reservationsModel.createReservationsInDB(reservationsData);
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
}

export default new ReservationsService();
