import reservationsModel from "../models/reservationsModel";
import { Reservation } from "../types/Reservation";

class ReservationsService {
  getAllReservationss = async (page: number = 1, limit: number = 10) => {
    const offset = (page - 1) * limit;
    const reservationss = await reservationsModel.getReservationssFromDB(offset, limit);
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
    reservationsData: Partial<Omit<Reservation, "id" | "created_at" | "updated_at">>
  ): Promise<Reservation | null> => {
    return await reservationsModel.updateReservationsInDB(id, reservationsData);
  };

  deleteReservations = async (id: string): Promise<void> => {
    await reservationsModel.deleteReservationsFromDB(id);
  };
}

export default new ReservationsService();
