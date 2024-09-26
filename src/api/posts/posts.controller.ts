import fs from "fs";
import { NotFoundError } from "../../errors/not-found";
import { BadRequestError } from "../../errors/bad-request";
import { Post } from "./posts.model";
import isMongoId from 'validator/lib/isMongoId';

export async function getPosts(req, res, next) {
  try {
    const search = req.query.search;
    const posts = await Post.find(
      search
        ? {
            content: {
              $regexp: new RegExp(search, "i"),
            },
          }
        : {}
    );
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

export async function getPost(req, res, next) {
  try {
    const id = req.params.postId;
    if (isMongoId(id)) {
      const post = await Post.findById(id)
      if (!post) {
        throw new NotFoundError('Post')
      }
      res.json(post);
      return
    }
    throw new BadRequestError()
  } catch (err) {
    next(err)
  }
}

export async function createPost(req, res, next) {
  try {
    const { title, content } = req.body;
    const post = new Post({
      title,
      content,
      userId: '66f513a415f3bdfd1b86658b'
    });
    const postCreated = await post.save();
    res.status(201).json(postCreated);
  }
  catch (err) {
     next(err)
  }
}