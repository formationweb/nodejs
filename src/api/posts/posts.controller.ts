import { NotFoundError } from "../../errors/not-found";
import { BadRequestError } from "../../errors/bad-request";
import { Post } from "./posts.model";
import { FindOptions, Op } from 'sequelize'
import { User } from "../users/users.model";

export async function getPosts(req, res, next) {
  try {
    const search = req.query.search;
    const options: FindOptions = search
        ? {
            where: {
                title: {
                    [Op.like]: `%${search}%`
                }
            },
        }
        : {};
    options.include = [
        {
            model: User,
            as: 'user'
        }
    ]
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
    const post = await Post.findByPk(id, {
        attributes: {
            exclude: ['createdAt']
        },
        include: [
            {
                model: User,
                as: 'user',
                attributes: {
                    exclude: ['email']
                }
            }
        ]
    })
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
