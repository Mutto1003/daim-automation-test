import { test, expect, request } from "@playwright/test";
import dataCreate from "../data-test/createOrderTestData.json";
import data from "../data-test/orderFailedTestData.json";

test("TC_DAIM_001: Validate that a valid order is processed successfully when all required fields are correct.", async ({
  request,
}) => {
  // const apiContext = await request.newContext();
  const headers = structuredClone(dataCreate.headers);
  const body = structuredClone(dataCreate.body);
  const responseReust = dataCreate.data;
  console.log(responseReust);

  const response = await request.post("/qa-exam/create-order", {
    headers: headers,
    data: body,
  });

  const res = await response.json();

  console.log(res);
  expect(response.status()).toBe(200);
  expect(res.data).toBeDefined();
  expect(res.data.orderId).toBe(responseReust.orderId);
  expect(res.data.orderType).toBe(responseReust.orderType);
  expect(res.data.price).toBe(responseReust.price);
  expect(res.data.qty).toBe(responseReust.qty);
  expect(res.data.commission).toBe(responseReust.commission);
  expect(res.data.vat).toBe(responseReust.vat);
  expect(res.data.symbol).toBe(responseReust.symbol);
  expect(res.data.stockId).toBe(responseReust.stockId);
});

test("TC_DAIM_004: Validate that the api returns an error when the userId does not exist in the system.", async ({
  request,
}) => {
  // const apiContext = await request.newContext();
  const baseHeaders = structuredClone(data.headers);
  const body = structuredClone(data.body);
  const responseReust = data.failedCasesUserIdNotFound;
  const headers = { ...baseHeaders, userId: "123" };
  console.log(responseReust.error.message);

  const response = await request.post("/qa-exam/create-order", {
    headers: headers,
    data: body,
  });

  const res = await response.json();

  console.log(res);
  expect(response.status()).toBe(responseReust.status);
  expect(res.error).toBeDefined();
  expect(res.error.code).toBe(responseReust.error.code);
  expect(res.error.message).toBe(responseReust.error.message);
});

test("TC_DAIM_013: Validate that the API returns an error when an invalid request format is used. ", async ({
  request,
}) => {
  // const apiContext = await request.newContext();
  const headers = data.headers;
  const body = data.body;

  console.log(body);

  const response = await request.post("/qa-exam/create-order", {
    headers: headers,
    data: body,
  });

  const res = await response.json();

  console.log(res);
  expect(response.status()).toBe(400);
  expect(res.error).toBeDefined();
  expect(res.error.code).toBe("USER_NOT_FOUND");
  expect(res.error.message).toBe("invalid user id / not found");
});
