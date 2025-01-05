import db from "../db";

export const getGuestsFromDB = async () => {
  return await db("guests").select("*");
};

export const createGuestInDB = async (guestData: any) => {
  return await db("guests").insert(guestData).returning("*");
};
