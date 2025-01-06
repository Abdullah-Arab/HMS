import db from "../db";

class GuestModel {
  getGuestsFromDB = async () => {
    return await db("guests").select("*");
  };

  createGuestInDB = async (guestData: any) => {
    return await db("guests").insert(guestData).returning("*");
  };
}

export default new GuestModel();