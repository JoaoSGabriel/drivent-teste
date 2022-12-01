import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import bookingService from "@/services/booking-service";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingService.showBookingByUser(userId);
    res.status(httpStatus.OK).send({
      id: booking.id,
      Room: booking.Room,
    });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { roomId } = req.body;
  const { userId } = req;

  if (!roomId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try {
    const createdBooking = await bookingService.createNewReservation(Number(roomId), userId);
    res.status(httpStatus.OK).send({ bookingId: createdBooking.id });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "CannotListHotelsError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
  }
}

export async function putBooking(req: AuthenticatedRequest, res: Response) {
  const { roomId } = req.body;
  const { bookingId } = req.params;
  const { userId } = req;

  if (!roomId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const updateReservation = await bookingService.updateCurrentlyReservation(
      Number(roomId),
      userId,
      Number(bookingId),
    );
    res.status(httpStatus.OK).send({ bookingId: updateReservation.id });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "CannotListHotelsError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
  }
}
