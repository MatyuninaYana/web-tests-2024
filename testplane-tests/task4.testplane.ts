import { resolve } from "node:path";

const BASE_URL = "http://193.124.118.147:8080/";

describe("task4", () => {
  beforeEach(async ({ browser }) => {
    await browser.url(resolve("..", "web2024", "index.html"));
  });

  it("success ResultComponent should displayed after sending valid form", async ({
    browser,
  }) => {
    const tomorrowDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const mock = await browser.mock(BASE_URL + "/");

    const phoneInput = await browser.$('[data-test="phone-input"]');
    const fromInput = await browser.$('[data-test="from-input"]');
    const whereInput = await browser.$('[data-test="where-input"]');
    const dateInput = await browser.$('[data-test="date-input"]');
    const timeInput = await browser.$('[data-test="time-input"]');
    const button = await browser.$('[data-test="submit-form"]');
    const form = await browser.$('[data-test="order-form"]');
    const result = await browser.$('[data-test="form-result"]');

    const date = tomorrowDate.getDate().toString().padStart(2, "0");
    const month = (tomorrowDate.getMonth() + 1).toString().padStart(2, "0");

    await phoneInput.setValue("+7 978 77-777-77");
    await dateInput.setValue(`${date}.${month}`);
    await timeInput.setValue(`12:00`);
    await fromInput.setValue("Симферополь");
    await whereInput.setValue("Ялта");

    await button.click();

    await expect(mock).toBeRequested();
    await expect(form).not.toBeDisplayed();
    await expect(
      await result.$('[data-test="success-result-component"]')
    ).toExist();
  });

  it("success ResultComponent should pass data from 'Откуда' and 'Куда' fields", async ({
    browser,
  }) => {
    const tomorrowDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const mock = await browser.mock(BASE_URL + "/");

    const phoneInput = await browser.$('[data-test="phone-input"]');
    const fromInput = await browser.$('[data-test="from-input"]');
    const whereInput = await browser.$('[data-test="where-input"]');
    const dateInput = await browser.$('[data-test="date-input"]');
    const timeInput = await browser.$('[data-test="time-input"]');
    const button = await browser.$('[data-test="submit-form"]');
    const form = await browser.$('[data-test="order-form"]');
    const result = await browser.$('[data-test="form-result"]');

    const date = tomorrowDate.getDate().toString().padStart(2, "0");
    const month = (tomorrowDate.getMonth() + 1).toString().padStart(2, "0");

    await phoneInput.setValue("+7 978 77-777-77");
    await dateInput.setValue(`${date}.${month}`);
    await timeInput.setValue(`12:00`);
    await fromInput.setValue("Симферополь");
    await whereInput.setValue("Судак");

    await button.click();

    await expect(mock).toBeRequested();
    await expect(form).not.toBeDisplayed();
    await expect(
      await result.$('[data-test="success-result-component"]')
    ).toExist();
    await expect(
      await result.$('[data-test="direction-result-component"]')
    ).toHaveText("Симферополь — Судак");
  });

  it("error ResultComponent should displayed after 400 server response", async ({
    browser,
  }) => {
    const tomorrowDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const mock = await browser.mock(BASE_URL + "/");
    mock.abortOnce("Failed");
    mock.respondOnce(undefined, {
      statusCode: 400,
    });

    const phoneInput = await browser.$('[data-test="phone-input"]');
    const fromInput = await browser.$('[data-test="from-input"]');
    const whereInput = await browser.$('[data-test="where-input"]');
    const dateInput = await browser.$('[data-test="date-input"]');
    const timeInput = await browser.$('[data-test="time-input"]');
    const button = await browser.$('[data-test="submit-form"]');
    const form = await browser.$('[data-test="order-form"]');
    const result = await browser.$('[data-test="form-result"]');

    const date = tomorrowDate.getDate().toString().padStart(2, "0");
    const month = (tomorrowDate.getMonth() + 1).toString().padStart(2, "0");

    await phoneInput.setValue("+7 978 77-777-77");
    await dateInput.setValue(`${date}.${month}`);
    await timeInput.setValue(`12:00`);
    await fromInput.setValue("Симферополь");
    await whereInput.setValue("Ялта");

    await button.click();
    await expect(mock).toBeRequested();
    await expect(form).not.toBeDisplayed();
    await expect(
      await result.$('[data-test="error-result-component"]')
    ).toExist();
  });

  it("error ResultComponent should displayed after 500 server response", async ({
    browser,
  }) => {
    const tomorrowDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const mock = await browser.mock(BASE_URL + "/");
    mock.abortOnce("Failed");
    mock.respondOnce(undefined, {
      statusCode: 500,
    });

    const phoneInput = await browser.$('[data-test="phone-input"]');
    const fromInput = await browser.$('[data-test="from-input"]');
    const whereInput = await browser.$('[data-test="where-input"]');
    const dateInput = await browser.$('[data-test="date-input"]');
    const timeInput = await browser.$('[data-test="time-input"]');
    const button = await browser.$('[data-test="submit-form"]');
    const form = await browser.$('[data-test="order-form"]');
    const result = await browser.$('[data-test="form-result"]');

    const date = tomorrowDate.getDate().toString().padStart(2, "0");
    const month = (tomorrowDate.getMonth() + 1).toString().padStart(2, "0");

    await phoneInput.setValue("+7 978 77-777-77");
    await dateInput.setValue(`${date}.${month}`);
    await timeInput.setValue(`12:00`);
    await fromInput.setValue("Симферополь");
    await whereInput.setValue("Ялта");

    await button.click();
    await expect(mock).toBeRequested();
    await expect(form).not.toBeDisplayed();
    await expect(
      await result.$('[data-test="error-result-component"]')
    ).toExist();
  });

  // it("", async ({ browser }) => {});
});
