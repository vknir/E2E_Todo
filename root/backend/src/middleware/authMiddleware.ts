import express, { NextFunction, Request, Response } from "express";
import { secret } from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { string } from "zod";

const prisma = new PrismaClient();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token as string, secret);
    if (decoded) {
      if (typeof decoded === "string") {
        res.status(403).json({
          message: "You are not logged in",
        });
        return;
      }
      req.userId = (decoded as JwtPayload).id;
      next();
    } else {
      res.status(403).json({ message: " invalid token" });
    }
  } catch (e) {
    console.log(e);
    res.status(403).json({ message: " invalid token" });
  }
};
