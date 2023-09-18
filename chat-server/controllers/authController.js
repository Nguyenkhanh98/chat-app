import getPrismaInstance from "../utils/prismaClient.js";
import { generateToken04 } from "../utils/tokenGenerator.js";
import  { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const checkUser = async (request, response, next) => {
  try {
    const { email } = request.body;
    if (!email) {
      return response.error({  msg: "Email is required"}, StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);
    }
    const prisma = getPrismaInstance();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return response.error({  msg: "User not found"}, StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);
    } else
    return response.success({  msg: "User Found", data: user}, StatusCodes.OK, ReasonPhrases.OK);
  } catch (error) {
    next(error);
  }
};

export const onBoardUser = async (request, response, next) => {
  try {
    const {
      email,
      name,
      about = "Available",
      image: profilePicture,
    } = request.body;
    if (!email || !name || !profilePicture) {
      return response.error({  msg: "Email, Name and Image are required"}, StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);
    } else {
      const prisma = getPrismaInstance();
      await prisma.user.create({
        data: { email, name, about, profilePicture },
      });
        return response.success({  msg: "Success"}, StatusCodes.OK, ReasonPhrases.OK);
    }
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const users = await prisma.user.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        email: true,
        name: true,
        profilePicture: true,
        about: true,
      },
    });
    const usersGroupedByInitialLetter = {};
    users.forEach((user) => {
      const initialLetter = user.name.charAt(0).toUpperCase();
      if (!usersGroupedByInitialLetter[initialLetter]) {
        usersGroupedByInitialLetter[initialLetter] = [];
      }
      usersGroupedByInitialLetter[initialLetter].push(user);
    });

    return res.status(200).send({ users: usersGroupedByInitialLetter });
  } catch (error) {
    next(error);
  }
};
