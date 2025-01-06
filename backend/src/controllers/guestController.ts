import { Request, Response } from "express";
import guestService from "../services/guestService";

//todo: handle responses
class GuestController {
  getGuests = async (req: Request, res: Response) => {
    const guests = await guestService.getAllGuests();
    res.status(200).json(guests);
  };

  createGuest = async (req: Request, res: Response) => {
    const guest = await guestService.addGuest(req.body);
    res.status(201).json(guest);
  };

  getGuestById = async (req: Request, res: Response) => {
    const guest = await guestService.getGuestById(req.params.id);
    res.status(200).json(guest);
  }


  updateGuest = async (req: Request, res: Response) => {
    const guest = await guestService.updateGuest(req.params.id, req.body);
    res.status(200).json(guest);
  }

  deleteGuest = async (req: Request, res: Response) => {
    await guestService.deleteGuest(req.params.id);
    res.status(204).send();
  }
}

export default new GuestController();