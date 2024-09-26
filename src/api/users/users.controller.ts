import { BadRequestError } from "./../../errors/bad-request";
import { NotFoundError } from "./../../errors/not-found";
import fs from "fs";
import { z, ZodError } from "zod";
import { Follow, followSchema, userSchema, User } from "./users.schema";
import { UserModel } from "./users.model";
import { Post } from "../posts/posts.model";

const follows: Follow[] = [];

/**
 * UserModel.find()
 * UserModel.findById(id)
 * UserModel.findOne({ email: 'test@test.com' })
 */

export async function getUsers(req, res, next) {
  try {
    const users = await UserModel.find({
      /*$or: [
        {
          name: 'ana'
        },
        {
          age: {
            $gt: 18
          }
        },
      ]*/
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUser(req, res, next) {
  try {
    const id = req.params.userId;
    const user = await UserModel.findById(id)
    if (!user) {
      throw new NotFoundError('User')
    }
    res.json(user)
  }
  catch (err) {
    next(err)
  }
}

export async function getUserPosts(req, res, next) {
  try {
    const id = req.params.userId;
    const posts = await Post.find().populate({
      path: 'userId',
      select: 'name',
      match: {
        _id: id
      }
    })
    res.json(posts)
  }
  catch (err) {
      next(err)
  }
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
