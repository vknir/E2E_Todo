import express from "express";
import { secret } from "../config";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const authRouter = express.Router();

const prisma = new PrismaClient();
const credValidator = z.object({
  username: z.string().min(3),
  password: z.string().min(3).max(10),
});

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    credValidator.parse({ username, password });
    const response = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (response) {
      bcrypt.compare(password, response.password, (err, passwordMatch) => {
        if (err) {
          throw err;
        }
        if (passwordMatch) {
          const token = jwt.sign({ id: response.id }, secret);
          res.status(200).json({ token: token, id:response.id });
        } else {
          res.status(400).json({message:"hello"})
        }
      });
    } else {
      throw "User not found";
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Invalid types" });
  }
});

authRouter.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    credValidator.parse({ username, password });

    bcrypt.hash(password, 5, async (err, hashedPassword) => {
      if (err) {
        throw "Error while salting";
      } else {
        const response = await prisma.user.create({
          data: {
            username: username,
            password: hashedPassword,
          },
        });

        if (response) {
          const token = jwt.sign({ id: response.id }, secret);
          res.status(200).json({ token: token , id:response.id});
        } else {
          throw "Error while updating";
        }
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Invalid credential types" });
  }
});

export default authRouter;
