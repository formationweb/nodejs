import jwt  from 'jsonwebtoken';
import { beforeEach, describe, expect, test, vi } from "vitest";
import request from "supertest";
import { app } from "../src/server";
import mongoose from "mongoose";
import { Role, User } from "../src/api/users/users.model";
import { Post } from "../src/api/posts/posts.model";
import { faker } from '@faker-js/faker'

const URL = "/api/users";
const HEADER_KEY_TOKEN = 'x-access-token'

describe("Tester l'api /api/users", () => {
  let user;
  let token

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
    user = new User({
      name: "ana",
      email: "ana@gmail.com",
      password: 'azertyui'
    });
    await user.save();
    process.env.JWT_SECRET_TOKEN = 'test'
    token = jwt.sign({
      userId: user._id
    }, process.env.JWT_SECRET_TOKEN)
  });

  test("[GET] User", async () => {
    const res = await request(app).get(URL);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  test("[GET] User Id", async () => {
    const res = await request(app).get(URL + "/" + user._id);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", "ana");
  });

  test("[POST] Create", async () => {
    const res = await request(app).post(URL).send({
      name: "test",
      email: "test@aa.net",
      password: 'azertyui'
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
  });

  test("[POST] Create with fake email", async () => {
    const res = await request(app).post(URL).send({
      name: "test",
      email: "test",
    });
    expect(res.status).toBe(400);
  });

  test("[PUT] User", async () => {
    user.role = Role.Admin
    await user.save()
    const res = await request(app)
      .put(URL + "/" + user._id)
      .set({
        [HEADER_KEY_TOKEN]: token
      })
      .send({
        name: "test",
        email: "test@test.net",
      })
    expect(res.status).toBe(200);
    expect(res.body.email).toBe("test@test.net");
  });

  test("[DELETE] User", async () => {
    user.role = Role.Admin
    await user.save()
    const res = await request(app).delete(URL + "/" + user._id)
      .set({
        [HEADER_KEY_TOKEN]: token
      })
    expect(res.status).toBe(204);
  });

  test("[DELETE] User without admin role", async () => {
    const res = await request(app).delete(URL + "/" + user._id)
      .set({
        [HEADER_KEY_TOKEN]: token
      })
    expect(res.status).toBe(403);
  });

  describe('Test Users Post', () => {
    let post
    let fakeMongoId = faker.database.mongodbObjectId()

    beforeEach(async () => {
      post = new Post({
          title: 'titre',
          content: 'content',
          userId: user._id
      });
      await post.save();
    })

    test("[GET] Users Posts", async () => {
      const res = await request(app).get(URL + '/' + user._id + '/posts');
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  
    test("[GET] Users Posts not found", async () => {
      const res = await request(app).get(URL + "/" + fakeMongoId + "/posts");
      expect(res.status).toBe(404);
    });
  })

  /*

    test('[GET] Follow User', async () => {
        const res = await request(app).post(URL + '/follow')
            .send({
                followerId: 1,
                followeeId: 2
            })
        expect(res.status).toBe(204)
    })

    test('[GET] Follow User with fake data', async () => {
        const res = await request(app).post(URL + '/follow')
            .send({
                followerId: 'fake',
                followeeId: 2
            })
        expect(res.status).toBe(400)
    })

    test('[GET] Follow User not found', async () => {
        const res = await request(app).post(URL + '/follow')
            .send({
                followerId: 100000,
                followeeId: 2
            })
        expect(res.status).toBe(404)
    })*/
});
