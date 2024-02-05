const request = require("supertest");
import app from "../../src/app.js";

describe("/healthz", () => {
  it("responds with 200 for GET /healthz (database must me up)", async () => {
    const response = await request(app).get("/healthz");
    expect(response.status).toEqual(200);
  });

  it("responds with 405 for POST /healthz", async () => {
    const response = await request(app).post("/healthz");
    expect(response.status).toEqual(405);
    expect(response.headers["cache-control"]).toEqual("no-cache");
  });

  it("responds with 405 for PUT /healthz", async () => {
    const response = await request(app).post("/healthz");
    expect(response.status).toEqual(405);
    expect(response.headers["cache-control"]).toEqual("no-cache");
  });

  it("responds with 405 for DELETE /healthz", async () => {
    const response = await request(app).post("/healthz");
    expect(response.status).toEqual(405);
    expect(response.headers["cache-control"]).toEqual("no-cache");
  });

  it("responds with 405 for PATCH /healthz", async () => {
    const response = await request(app).patch("/healthz");
    expect(response.status).toEqual(405);
    expect(response.headers["cache-control"]).toEqual("no-cache");
  });

  it("responds with 400 for GET /healthz?key=value", async () => {
    const response = await request(app).patch("/healthz");
    expect(response.status).toEqual(405);
    expect(response.headers["cache-control"]).toEqual("no-cache");
  });

  it("responds with 400 for GET /healthz (with payload)", async () => {
    const response = await request(app)
      .get("/healthz")
      .set("content-type", "application/json")
      .send({
        some_key: "some_vale",
      });
    expect(response.status).toEqual(400);
  });
});
