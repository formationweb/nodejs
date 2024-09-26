import { ForbiddenError } from './../../errors/forbidden';
import { BadRequestError } from "./../../errors/bad-request";
import { NotFoundError } from "./../../errors/not-found";
import fs from "fs";
import { z, ZodError } from "zod";
import { Follow, followSchema, userSchema, User } from "./users.schema";
import { FollowModel, IUser, UserModel } from "./users.model";
import { Post } from "../posts/posts.model";
import { NotAuthorizedError } from "../../errors/not-authorized";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
    const user = await UserModel.findById(id, '-password')
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
      const { name, email, password } = data;
      const user = new UserModel({
        name,
        email,
        password
      });
      const userCreated = await user.save();
      userCreated.password = undefined as any
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
    const { name, email, password } = req.body;
    // const user = await UserModel.findById(id)
    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password
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

export async function followUser(req, res, next) {
  try {
    const user = req.user as IUser
    const followData = followSchema.parse(req.body);
    const { followeeId } = followData;
    const followerId = user._id

    const followee = await UserModel.findById(followeeId)
    if (!followee) {
      throw new NotFoundError('User to follow')
    }

    const existingFollow = await FollowModel.findOne({ followerId, followeeId })
    if (existingFollow) {
      throw new BadRequestError('Already following')
    }

    const newFollow = new FollowModel({ followerId, followeeId })
    await newFollow.save()
    
    res.status(204).send();
  } catch (err) {
    if (err instanceof ZodError) {
      next(new BadRequestError(err.message));
      return;
    }
    next(err);
  }
}

export async function login(req, res ,next) {
   try {
    const loginSchema = z.object({
      email: z.string(),
      password: z.string()
     }).strict()
     loginSchema.parse(req.body)
     const { email, password } = req.body
     const user =  await UserModel.findOne({ email })
     if (!user) {
      throw new NotAuthorizedError()
     }
     const bool = await bcrypt.compare(password, user.password)
     if (!bool) {
      throw new NotAuthorizedError()
     }
     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_TOKEN as string, {
      expiresIn: '3d'
     })
    //  res.cookie('token', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV == 'production',
    //   maxAge: 3 * 24 * 60 * 60 * 1000 // 3 jours
    //  })
     res.json({
      token,
      userId: user._id
     })
   }
   catch (err) {
    next(err)
   }
}