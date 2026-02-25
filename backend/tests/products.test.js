const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

afterAll(async () => {
  await mongoose.disconnect();
});

test("GET products paginated works", async () => {
  const res = await request(app).get("/api/products?page=1&limit=2");
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("items");
});