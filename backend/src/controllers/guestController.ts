import { Request, Response } from "express";
import guestService from "../services/guestService";

class GuestController {
  getGuests = async (req: Request, res: Response) => {
    const guests = await guestService.getAllGuests();
    res.status(200).json(guests);
  };

  createGuest = async (req: Request, res: Response) => {
    const guest = await guestService.addGuest(req.body);
    res.status(201).json(guest);
  };
}

export default new GuestController();