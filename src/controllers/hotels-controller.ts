import { AuthenticatedRequest } from "@/middlewares";
import hotelService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotels = await hotelService.showAllHotels(userId);
    res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === "RequestError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
  }
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;

  try {
    const hotelRooms = await hotelService.showAllHotelRooms(Number(hotelId));
    res.status(httpStatus.OK).send(hotelRooms);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}
