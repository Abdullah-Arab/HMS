import db from "../db";


class GuestModel {
  getGuestsFromDB = async () => {
    return await db("guests").select("*");
  };

  createGuestInDB = async (guestData: any) => {
    return await db("guests").insert(guestData).returning("*");
  };

  getGuestByIdFromDB = async (id: number) => {
    return await db("guests").where({ id }).first();
  }

  updateGuestInDB = async (id: number, guestData: any) => {
    return await db("guests").where({ id }).update(guestData).returning("*");
  }

  deleteGuestFromDB = async (id: number) => {
    return await db("guests").where({ id }).delete();
  }
}

export default new GuestModel();