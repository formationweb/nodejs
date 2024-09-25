import fs from "fs";
import { NotFoundError } from "../../errors/not-found";
import { BadRequestError } from "../../errors/bad-request";
import { Post } from "./posts.model";

export async function getPosts(req, res, next) {
  try {
    const search = req.query.search;
    const posts = await Post.findAll(
      search
        ? {
            where: {
              title: search,
            },
          }
        : undefined
    );
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

export async function getPost(req, res, next) {
  try {
    const id = +req.params.postId;
    if (id > 0) {
      const post = await Post.findByPk(id)
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
    const post = await Post.create({ title, content, userId: 3 })
    res.json(post)
  }
  catch (err) {
    next(err)
  }
}