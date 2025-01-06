import guestModel from "../models/guestModel";
import { Guest } from "../types/Guest";

class GuestService {
  getAllGuests = async (): Promise<Guest[]> => {
    return await guestModel.getGuestsFromDB();
  };

  addGuest = async (
    guestData: Omit<Guest, "id" | "created_at" | "updated_at">
  ): Promise<Guest> => {
    return await guestModel.createGuestInDB(guestData);
  };

  getGuestById = async (id: string): Promise<Guest | null> => {
    return await guestModel.getGuestByIdFromDB(id);
  };

  updateGuest = async (
    id: string,
    guestData: Partial<Omit<Guest, "id" | "created_at" | "updated_at">>
  ): Promise<Guest | null> => {
    return await guestModel.updateGuestInDB(id, guestData);
  };

  deleteGuest = async (id: string): Promise<void> => {
    await guestModel.deleteGuestFromDB(id);
  };
}

export default new GuestService();
