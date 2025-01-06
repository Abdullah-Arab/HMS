import guestModel from "../models/guestModel";

class GuestService {
  getAllGuests = async () => {
    return await guestModel.getGuestsFromDB();
  };

  addGuest = async (guestData: any) => {
    return await guestModel.createGuestInDB(guestData);
  };
}

export default new GuestService();