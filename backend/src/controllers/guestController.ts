import { Request, Response } from "express";
import guestService from "../services/guestService";
import asyncHandler from "express-async-handler";
import { formatResponse } from "../utils/fromatResponse";

class GuestController {
  getGuests = asyncHandler(async (req: Request, res: Response) => {
    // Extract query parameters, with defaults
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const { data, pagination } = await guestService.getAllGuests(page, limit);

    res
      .status(200)
      .json(
        formatResponse(
          "success",
          "Guests retrieved successfully",
          data,
          pagination
        )
      );
  });

  createGuest = asyncHandler(async (req: Request, res: Response) => {
    const guest = await guestService.addGuest(req.body);
  res
    .status(201)
    .json(formatResponse("success", "Guest created successfully", guest));
  });

  getGuestById = asyncHandler(async (req: Request, res: Response) => {
    const guest = await guestService.getGuestById(req.params.id);
    res.status(200).json(formatResponse("success", "Guest retrieved successfully", guest));
  });

  updateGuest = asyncHandler(async (req: Request, res: Response) => {
    const guest = await guestService.updateGuest(req.params.id, req.body);
    res.status(200).json(formatResponse("success", "Guest updated successfully", guest));
  });

  deleteGuest = asyncHandler(async (req: Request, res: Response) => {
    await guestService.deleteGuest(req.params.id);
    res.status(200).json(formatResponse("success", "Guest deleted successfully"));
  });
}

export default new GuestController();
