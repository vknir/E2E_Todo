import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
const todosRouter = express.Router();
const todoValidator = z.object({
  todo: z.string().min(1),
});
todosRouter.use(authMiddleware);

todosRouter.get("/:username", async (req, res) => {
  try {
    if (req.userId) {
      const currentUser = await prisma.user.findUnique({
        where: { username: req.params.username },
      });
      if (currentUser) {
        prisma.todos
          .findMany({ where: { userId: currentUser.id } })
          .then((resolve) => {
            res
              .status(200)
              .json({ message: "todo retrieved successfully", data: resolve });
          });
      } else {
        throw "user not found";
      }
    } else {
      res.status(400).json({ message: "user id does not exist" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "error in fetching todos" });
  }
});

todosRouter.post("/add", async (req, res) => {
  const { todo } = req.body;
  try {
    todoValidator.parse({ todo });
    if (req.userId) {
      const currentUserId = parseInt(req.userId);
      const response = prisma.todos
        .create({
          data: {
            todo: todo,
            userId: currentUserId,
            done: false,
          },
        })
        .then(
          (resolve) => {
            res.status(200).json({ message: "todo added successfully" });
          },
          (reject) => {
            res.status(500).json("cannot upadte db");
          }
        );
    } else {
      res.status(500).json({ message: "userid nt fund" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ Message: "Todo of wrong type" });
  }
});

todosRouter.delete("/delete/:todoId", async (req, res) => {
  if (req.userId) {
    const currentUserId = parseInt(req.userId);
    const currentTodoId = parseInt(req.params.todoId);
    prisma.todos
      .delete({
        where: {
          id: currentTodoId,
          userId: currentUserId,
        },
      })
      .then(() => {
        res.status(200).json({ message: "deleted sucessfully" });
      });
  } else {
    res.status(400).json({ message: "user id not found" });
  }
});

export default todosRouter;
