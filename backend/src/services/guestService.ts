import guestModel from "../models/guestModel";

//todo: business logic
class GuestService {
  getAllGuests = async () => {
    return await guestModel.getGuestsFromDB();
  };

  addGuest = async (guestData: any) => {
    return await guestModel.createGuestInDB(guestData);
  };

   getGuestById = async (id: number) => {
    return await guestModel.getGuestByIdFromDB(id);
  }
  
    updateGuest = async (id: number, guestData: any) => {
      return await guestModel.updateGuestInDB(id, guestData);
    }
   
    deleteGuest = async (id: number) => {
      return await guestModel.deleteGuestFromDB(id);
    }
   
}

export default new GuestService();