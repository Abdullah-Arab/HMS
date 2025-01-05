import { getGuestsFromDB, createGuestInDB } from "../models/guestModel";

export const getAllGuests = async () => {
  return await getGuestsFromDB();
};

export const addGuest = async (guestData: any) => {
  return await createGuestInDB(guestData);
};
