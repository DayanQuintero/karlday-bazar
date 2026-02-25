const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

beforeAll(async () => {
  // ya conecta server.js, pero Jest a veces necesita estabilizar
});

afterAll(async () => {
  await mongoose.disconnect();
});

test("Health OK", async () => {
  const res = await request(app).get("/api/health");
  expect(res.statusCode).toBe(200);
  expect(res.body.ok).toBe(true);
});