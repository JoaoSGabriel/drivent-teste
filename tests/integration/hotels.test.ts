import app, { init } from "@/app";
import { prisma } from "@/config";
// import { generateCPF, getStates } from "@brazilian-utils/brazilian-utils";
import faker from "@faker-js/faker";
// import dayjs from "dayjs";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import { createEnrollmentWithAddress, createUser, createhAddressWithCEP } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("GET /hotels", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/hotels");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("When token is valid", () => {
    it("should respond with status 401 when Ticket is not assign PAID for status", async () => {
      return;
    });

    it("should respond with status 401 when TicketType is not assign TRUE for includesHotel", async () => {
      return;
    });

    it("should respond with status 401 when TicketType is not assign FALSE for isRemote", async () => {
      return;
    });

    it("should respond with empty array when there are no hotels", async () => {
      return;
    });

    it("should respond with status 200 and with existing hotels data", async () => {
      return;
    });
  });
});

describe("GET /hotels/:hotelsId", () => {
  const hotelId = 4;
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get(`/hotels/${hotelId}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get(`/hotels/${hotelId}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get(`/hotels/${hotelId}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("When token is valid", () => {
    it("should respond with status 400 if query param hotelId is missing", async () => {
      return;
    });

    it("should respond with status 404 when given hotel doesnt exist", async () => {
      return;
    });

    it("should respond with empty array when there are no hotels rooms", async () => {
      return;
    });

    it("should respond with status 200 and hotel rooms data", async () => {
      return;
    });
  });
});
