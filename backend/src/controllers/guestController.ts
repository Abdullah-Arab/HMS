import { Request, Response } from "express";
import { getAllGuests, addGuest } from "../services/guestService";

export const getGuests = async (req: Request, res: Response) => {
  const guests = await getAllGuests();
  res.status(200).json(guests);
};

export const createGuest = async (req: Request, res: Response) => {
  const guest = await addGuest(req.body);
  res.status(201).json(guest);
};
