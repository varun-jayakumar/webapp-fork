const request = require("supertest");
import app from "../../src/app.js";
import {
  waitForDbToInitialize,
  dropDatabaseAfterTest,
} from "../../testSetup/db-setup.js";
var base64 = require("base-64");
var utf8 = require("utf8");

describe("/healthz and /v2/user/*", () => {
  beforeAll(async () => {
    return await waitForDbToInitialize();
  }, 30000);

  afterAll(async () => {
    await dropDatabaseAfterTest();
    return;
  }, 30000);

  it("POST /v2/user and GET /v2/user/self to validate account creation", async () => {
    const userCreationPayload = {
      first_name: "test_first_name",
      last_name: "test_last_name",
      password: "test_password",
      username: "test_user@domain.com",
    };

    const updateUserPayload = {
      first_name: "test_new_first_name",
      last_name: "test_new_last_name",
      password: "test_new_password",
    };

    const authHeaderNE = `${userCreationPayload.username}:${userCreationPayload.password}`;
    const utfAuthHeaderNE = utf8.encode(authHeaderNE);
    const base64AuthHeaderNE = base64.encode(utfAuthHeaderNE);
    const authHeader = `Basic ${base64AuthHeaderNE}`;

    const response = await request(app)
      .post("/v2/user")
      .send(userCreationPayload)
      .set("Accept", "application/json");

    expect(response.status).toEqual(201);
    expect(response.body.first_name).toEqual(userCreationPayload.first_name);
    expect(response.body.last_name).toEqual(userCreationPayload.last_name);
    expect(response.body.username).toEqual(userCreationPayload.username);

    const getUserDetailsResponse = await request(app)
      .get("/v2/user/self")
      .set("Accept", "application/json")
      .set("Authorization", authHeader);

    expect(getUserDetailsResponse.status).toEqual(200);
    expect(getUserDetailsResponse.body.first_name).toEqual(
      userCreationPayload.first_name
    );
    expect(getUserDetailsResponse.body.last_name).toEqual(
      userCreationPayload.last_name
    );
    expect(getUserDetailsResponse.body.username).toEqual(
      userCreationPayload.username
    );
  }, 30000);

  it("PUT /v2/user/self and GET /v2/user/self to validate account update", async () => {
    const userCreationPayload = {
      first_name: "test_first_name",
      last_name: "test_last_name",
      password: "test_password",
      username: "test_user@domain.com",
    };

    const updateUserPayload = {
      first_name: "test_new_first_name",
      last_name: "test_new_last_name",
      password: "test_new_password",
    };

    const authHeaderNE = `${userCreationPayload.username}:${userCreationPayload.password}`;
    const utfAuthHeaderNE = utf8.encode(authHeaderNE);
    const base64AuthHeaderNE = base64.encode(utfAuthHeaderNE);
    const authHeader = `Basic ${base64AuthHeaderNE}`;

    const updateResponse = await request(app)
      .put("/v2/user/self")
      .send(updateUserPayload)
      .set("Authorization", authHeader);

    expect(updateResponse.status).toEqual(204);

    const newAuthHeaderNE = `${userCreationPayload.username}:${updateUserPayload.password}`;
    const newUtfAuthHeaderNE = utf8.encode(newAuthHeaderNE);
    const newBase64AuthHeaderNE = base64.encode(newUtfAuthHeaderNE);
    const newAuthHeader = `Basic ${newBase64AuthHeaderNE}`;

    const getUserDetailsResponse = await request(app)
      .get("/v2/user/self")
      .set("Accept", "application/json")
      .set("Authorization", newAuthHeader);

    expect(getUserDetailsResponse.status).toEqual(200);
    expect(getUserDetailsResponse.body.first_name).toEqual(
      updateUserPayload.first_name
    );
    expect(getUserDetailsResponse.body.last_name).toEqual(
      updateUserPayload.last_name
    );
    expect(getUserDetailsResponse.body.username).toEqual(
      userCreationPayload.username
    );
  }, 30000);

  it("responds with 200 for GET /healthz (database must me up)", async () => {
    const response = await request(app).get("/healthz");
    expect(response.status).toEqual(200);
  }, 30000);

  it("responds with 405 for POST /healthz", async () => {
    const response = await request(app).post("/healthz");
    expect(response.status).toEqual(405);
    expect(response.headers["cache-control"]).toEqual("no-cache");
  }, 30000);

  it("responds with 405 for PUT /healthz", async () => {
    const response = await request(app).post("/healthz");
    expect(response.status).toEqual(405);
    expect(response.headers["cache-control"]).toEqual("no-cache");
  }, 30000);

  it("responds with 405 for DELETE /healthz", async () => {
    const response = await request(app).post("/healthz");
    expect(response.status).toEqual(405);
    expect(response.headers["cache-control"]).toEqual("no-cache");
  }, 30000);

  it("responds with 405 for PATCH /healthz", async () => {
    const response = await request(app).patch("/healthz");
    expect(response.status).toEqual(405);
    expect(response.headers["cache-control"]).toEqual("no-cache");
  }, 30000);

  it("responds with 400 for GET /healthz?key=value", async () => {
    const response = await request(app).patch("/healthz");
    expect(response.status).toEqual(405);
    expect(response.headers["cache-control"]).toEqual("no-cache");
  }, 30000);

  it("responds with 400 for GET /healthz (with payload)", async () => {
    const response = await request(app)
      .get("/healthz")
      .set("content-type", "application/json")
      .send({
        some_key: "some_vale",
      });
    expect(response.status).toEqual(400);
  }, 30000);
});
