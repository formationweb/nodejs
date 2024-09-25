import { BadRequestError } from "./../../errors/bad-request";
import { NotFoundError } from "./../../errors/not-found";
import fs from "fs";
import { z, ZodError } from "zod";
import { Follow, followSchema, userSchema, User } from "./users.schema";
import { UserModel } from "./users.model";

const follows: Follow[] = [];

/**
 * UserModel.find()
 * UserModel.findById(id)
 * UserModel.findOne({ email: 'test@test.com' })
 */

export async function getUsers(req, res, next) {
  try {
    const users = await UserModel.find({
        name: {
            $eq: 'ana'
        }
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export function getUser(req, res, next) {
  const testValue = req.query.test;
  console.log(testValue);
  const id = req.params.userId;
  res.json({
    id, // équivalent à id: id
    name: "ana",
    email: "ana@gmail.com",
  });
}

export function getUserPosts(req, res, next) {
  const id = req.params.userId;
  const userPosts = data.filter((post) => post.userId == id);
  if (userPosts.length == 0) {
    next(new NotFoundError("not user"));
    return;
  }
  res.json(userPosts);
}

export async function createUser(req, res, next) {
 try {
    const { success, error, data } = userSchema.safeParse(req.body);
    if (success) {
      const { name, email } = data;
      const user = new UserModel({
        name,
        email,
      });
      const userCreated = await user.save();
      res.status(201).json(userCreated);
    } else {
      throw new BadRequestError()
    }
 }
 catch (err) {
    next(err)
 }
}

export async function updateUser(req, res, next) {
  try {
    const id = req.params.userId;
    const { name, email } = req.body;
    // const user = await UserModel.findById(id)
    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
      },
      {
        new: true,
      }
    );
    if (!user) {
      throw new NotFoundError("User");
    }
    // user.name = name
    // await user.save()
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const id = req.params.userId;
    const userIdDeleted = await UserModel.findByIdAndDelete(id);
    if (!userIdDeleted) {
      throw new NotFoundError("User");
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export function followUser(req, res, next) {
  try {
    const followData = followSchema.parse(req.body);
    const { followerId, followeeId } = followData;

    if (!users.find((user) => user.id == followerId)) {
      throw new NotFoundError("User Id");
    }
    if (!users.find((user) => user.id == followeeId)) {
      throw new NotFoundError("User Id");
    }

    follows.push(followData);
    res.status(204).send();
  } catch (err) {
    if (err instanceof ZodError) {
      next(new BadRequestError(err.message));
      return;
    }
    next(err);
  }
}
