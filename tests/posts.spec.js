var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import request from 'supertest';
import { beforeEach, describe, expect, test } from "vitest";
import { app } from "../src/server";
import mongoose from 'mongoose';
import { Post } from '../src/api/posts/posts.model';
const URL = '/api/posts';
describe('Tester /api/posts', () => {
    let post;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose.connection.dropDatabase();
        yield Post.syncIndexes();
        post = new Post({
            title: 'titre',
            content: 'content',
            userId: '66f513a415f3bdfd1b86658b'
        });
        yield post.save();
    }));
    // test('', async () => {
    //     const indexes = await mongoose.connection.db?.collection('posts').indexes()
    //     expect(indexes).toEqual(
    //         expect.arrayContaining(
    //             expect.objectContaining({
    //                 key: { _fts: 'text',  _ftsx: 1 }
    //             })
    //         )
    //     )
    // })
    test('[GET] Posts', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app).get(URL);
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    }));
    test('[GET] Search Posts', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app).get(URL + '?search=titre');
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    }));
    test('[GET] Post Id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app).get(URL + '/' + post._id);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('title');
    }));
    test('[GET] Post not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app).get(URL + '/66f513a415f3bdfd1b86658f');
        expect(res.status).toBe(404);
    }));
    test('[GET] Post not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app).get(URL + '/dzdazzdazdaz');
        expect(res.status).toBe(400);
    }));
});
