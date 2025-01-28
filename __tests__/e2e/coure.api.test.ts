import request from "supertest";
import {app} from "../../src";

describe('/course', () => {
    beforeEach(async () => {
        await request(app).delete("/__test__/data").expect(204);
    })

    it('should return 404 for empty courses', async () => {
        await request(app)
            .get('/courses')
            .expect(404)
    })

    it('should return 404 for not existing course', async () => {
        await request(app)
            .get('/courses/1')
            .expect(404)
    });
})
