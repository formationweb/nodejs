import { NotFoundError } from "../../errors/not-found";
import { BadRequestError } from "../../errors/bad-request";
import { Post } from "./posts.model";
import { Op } from 'sequelize'

export async function getPosts(req, res, next) {
  try {
    const search = req.query.search;
    const options = search
        ? {
            where: {
                title: {
                    [Op.like]: `%${search}%`
                }
            },
        }
        : {};
    const posts = await Post.findAll(options);
    res.json(posts);
  }
  catch (err) {
    next(err)
  }
}

export async function getPost(req, res, next) {
 try {
    const id = +req.params.postId;
    const post = await Post.findByPk(id)
    if (!post) {
        throw new NotFoundError('Posts')
    }
    res.json(post);
 }
 catch (err) {
    next(err)
 }
}

export async function createPost(req, res, next) {
    try {
        const data = req.body
        const userCreated = await Post.create({
            title: data.title,
            content: data.content,
            userId: 1
        })
        res.status(201).json(userCreated)
    }
    catch (err: any) {
        console.log(err)
        next(new BadRequestError())
    }
}
