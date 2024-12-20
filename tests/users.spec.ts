import { beforeEach, describe, expect, test, vi } from "vitest";
import request from "supertest";
import { getUsers } from "../src/api/users/users.controller";
import { app } from "../src/server";
import mongoose from "mongoose";
import { User } from "../src/api/users/users.model";

const URL = "/api/users";

describe("Tester l'api /api/users", () => {
  let user;

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
    user = new User({
      name: "ana",
      email: "ana@gmail.com",
    });
    await user.save();
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
    const res = await request(app).put(URL + "/" + user._id).send({
      name: "test",
      email: "test@test.net",
    });
    expect(res.status).toBe(200);
    expect(res.body.email).toBe("test@test.net");
  });

  test("[DELETE] User", async () => {
    const res = await request(app).delete(URL + "/" + user._id)
    expect(res.status).toBe(204);
  });

  /*

    test('[GET] Users Posts', async () => {
        const res = await request(app).get(URL + '/1/posts')
        expect(res.status).toBe(200)
        expect(res.body.length).toBeGreaterThan(0)
    })

    test('[GET] Users Posts not found', async () => {
        const res = await request(app).get(URL + '/1000/posts')
        expect(res.status).toBe(404)
    })

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
