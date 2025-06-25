import { test, expect, request } from '@playwright/test';
// import { queryDB } from '../db/query';
import dataCreate from "../data-test/createOrderTestData.json";
import data from "../data-test/orderFailedTestData.json";

test("TC_DIME_001: Validate that a valid order is processed successfully when all required fields are correct.", async ({
  request,
}) => {
  const headers = structuredClone(dataCreate.headers);
  const body = structuredClone(dataCreate.body);
  const responseReust = dataCreate.data;

  const response = await request.post("/qa-exam/create-order", {
    headers: headers,
    data: body,
  });

  const res = await response.json();

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

test("TC_DIME_004: Validate that the api returns an error when the userId does not exist in the system.", async ({
  request,
}) => {
  const baseHeaders = structuredClone(data.headers);
  const body = structuredClone(data.body);
  const responseReust = data.failedCasesUserIdNotFound;
  const headers = { ...baseHeaders, userId: "123" };

  const response = await request.post("/qa-exam/create-order", {
    headers: headers,
    data: body,
  });

  const res = await response.json();

  expect(response.status()).toBe(responseReust.status);
  expect(res.error).toBeDefined();
  expect(res.error.code).toBe(responseReust.error.code);
  expect(res.error.message).toBe(responseReust.error.message);
});

test("TC_DIME_012: Validate that the API returns an error when an invalid request format is used. ", async ({
  request,
}) => {
  const baseHeaders = structuredClone(data.headers);
  const baseBody = structuredClone(data.body);
  const responseReust = data.failedCasesInvalidRequestFormat;
  const body = { ...baseBody, price: null };
  const headers = { ...baseHeaders, userId: "e6060427-5618-4a58-945d-b0a060478337" };

  const response = await request.post("/qa-exam/create-order", {
    headers: headers,
    data: body,
  });

  const res = await response.json();

  expect(response.status()).toBe(responseReust.status);
  expect(res.error).toBeDefined();
  expect(res.error.code).toBe(responseReust.error.code);
  expect(res.error.message).toBe(responseReust.error.message);
});