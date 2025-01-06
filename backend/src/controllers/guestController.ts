import { Request, Response } from "express";
import guestService from "../services/guestService";
import asyncHandler from "express-async-handler";
import { formatResponse } from "../utils/fromatResponse";

class GuestController {
  getGuests = asyncHandler(async (req: Request, res: Response) => {
    try {
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
    } catch (error) {
      if (error instanceof Error) {
        // Handle known error types
        res
          .status(500)
          .json(
            formatResponse(
              "error",
              "Failed to retrieve guests",
              undefined,
              undefined,
              error.message
            )
          );
      } else {
        // Handle unknown error types
        res
          .status(500)
          .json(
            formatResponse(
              "error",
              "An unknown error occurred",
              undefined,
              undefined,
              "Unknown error"
            )
          );
      }
    }
  });
  createGuest = asyncHandler(async (req: Request, res: Response) => {
    try {
      const guest = await guestService.addGuest(req.body);
      res
        .status(201)
        .json(formatResponse("success", "Guest created successfully", guest));
    } catch (error) {
      if (error instanceof Error){
        res
          .status(400)
          .json(
            formatResponse(
              "error",
              "Failed to create guest",
              undefined,
              undefined,
              error.message
            )
          );
      } else {
        res
          .status(400)
          .json(
            formatResponse(
              "error",
              "Failed to create guest",
              undefined,
              undefined,
              "Unknown error"
            )
          );
      }
          
    }
  });

  getGuestById = asyncHandler(async (req: Request, res: Response) => {
    try {
      const guest = await guestService.getGuestById(req.params.id);

      if (!guest) {
         res.status(404).json(formatResponse("error", "Guest not found"));
      }

      res
        .status(200)
        .json(formatResponse("success", "Guest retrieved successfully", guest));
    } catch (error) {
      if (error instanceof Error){
        res
          .status(500)
          .json(
            formatResponse(
              "error",
              "Failed to retrieve guest",
              undefined,
              undefined,
              error.message
            )
          );
      } else {
        res
          .status(500)
          .json(
            formatResponse(
              "error",
              "Failed to retrieve guest",
              undefined,
              undefined,
              "Unknown error"
            )
          );
      }
    }
  });

  updateGuest = asyncHandler(async (req: Request, res: Response) => {
    try {
      const guest = await guestService.updateGuest(req.params.id, req.body);

      if (!guest) {
         res.status(404).json(formatResponse("error", "Guest not found"));
      }

      res
        .status(200)
        .json(formatResponse("success", "Guest updated successfully", guest));
    } catch (error) {
      if (error instanceof Error){
        res
          .status(400)
          .json(
            formatResponse(
              "error",
              "Failed to update guest",
              undefined,
              undefined,
              error.message
            )
          );
      }
      else {
        res
          .status(400)
          .json(
            formatResponse(
              "error",
              "Failed to update guest",
              undefined,
              undefined,
              "Unknown error"
            )
          );
      }
    }
  });

  deleteGuest = asyncHandler(async (req: Request, res: Response) => {
    try {
      const guest = await guestService.getGuestById(req.params.id);

      if (!guest) {
         res.status(404).json(formatResponse("error", "Guest not found"));
      }

      await guestService.deleteGuest(req.params.id);
      res
        .status(200)
        .json(formatResponse("success", "Guest deleted successfully"));
    } catch (error) {
      if (error instanceof Error){
        res
          .status(500)
          .json(
            formatResponse(
              "error",
              "Failed to delete guest",
              undefined,
              undefined,
              error.message
            )
          );
      }
      else {
        res
          .status(500)
          .json(
            formatResponse(
              "error",
              "Failed to delete guest",
              undefined,
              undefined,
              "Unknown error"
            )
          );
      }
    }
  });
}

export default new GuestController();
