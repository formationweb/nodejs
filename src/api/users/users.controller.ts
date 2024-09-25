import { BadRequestError } from "./../../errors/bad-request";
import { NotFoundError } from "./../../errors/not-found";
import fs from "fs";
import { z, ZodError } from "zod";
import { Follow, followSchema, userSchema } from "./users.schema";
import { User } from "./users.model";

const data = JSON.parse(fs.readFileSync("src/data/posts.json", "utf-8"));
const follows: Follow[] = [];

export async function getUsers(req, res, next) {
  try {
    const users = await User.findAll({
        // where: {
        //     name: ''
        // }
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUser(req, res, next) {
  try {
    const id = req.params.userId;
    const user = await User.findByPk(id)
    if (!user) {
        throw new NotFoundError('Not User')
    }
    res.json(user)
  }
  catch (err) {
    next(err)
  }
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
  const { success, error, data } = userSchema.safeParse(req.body);
  if (success) {
    const { name, email } = data;
    const userCreated = await User.create({ name, email })
    res.status(201).json(userCreated);
  } else {
    console.log(error.errors);
    next(new BadRequestError());
  }
}

export async function updateUser(req, res, next) {
  try {
    const id = req.params.userId;
    const [userId] = await User.update(req.body, {
        where: {
            id
        }
    })
    if (!userId) {
        throw new NotFoundError('Not User')
    }
    res.json(await User.findByPk(userId))
  }
  catch (err) {
    next(err)
  }
}

export async function deleteUser(req, res, next) {
 try {
    const id = req.params.userId;
    const rowsDeleted = await User.destroy({
        where: {
            id
        }
    })
    if (!rowsDeleted) {
        throw new NotFoundError('Not User')
    }
    res.status(204).send();
 }
 catch (err) {
    next(err)
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
