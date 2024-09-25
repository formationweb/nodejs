import { NotFoundError } from "../../errors/not-found";
import { BadRequestError } from "../../errors/bad-request";
import { Post } from "./posts.model";
import { User } from "../users/users.model";
import { type FindOptions } from "sequelize";

export async function getPosts(req, res, next) {
  try {
    const search = req.query.search;
    const options: FindOptions = search
    ? {
        where: {
          title: search,
        },
      }
    : {}
    options.include = [
      {
        model: User,
        as: 'user'
      }
    ]
    const posts = await Post.findAll(options);
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

export async function getPost(req, res, next) {
  try {
    const id = +req.params.postId;
    if (id > 0) {
      const post = await Post.findByPk(id, {
        include: [
          {
            model: User,
            as: 'user'
          }
        ]
      })
      if (!post) {
        throw new NotFoundError("Posts")
      }
      res.json(post);
      return
    }
    throw new BadRequestError()
  } catch (err) {
    next(err);
  }
}

export async function createPost(req, res, next) {
  try {
    const { title, content } = req.body
    if (!title || !content) {
      throw new BadRequestError()
    }
    const post = await Post.create({ title, content, userId: 2 })
    res.json(post)
  }
  catch (err) {
    next(err)
  }
}