import { resolve } from "node:path";

const BASE_URL = "http://193.124.118.147:8080/";

describe("task5", () => {
  beforeEach(async ({ browser }) => {
    await browser.url(resolve("..", "web2024", "index.html"));
  });

  it("click on button inside ResultComponent should return to form", async ({
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

    const successResult = await result.$(
      '[data-test="success-result-component"]'
    );

    await expect(successResult).toExist();

    const successResultButton = await successResult.$("button");
    await successResultButton.click();

    await expect(form).toBeDisplayed();
    await expect(
      await result.$('[data-test="success-result-component"]')
    ).not.toExist();
  });

  it("createState return array with three function", async ({ browser }) => {
    const result: Function[] = await browser.execute(`
      () => {
        const state = createState();
        return state.length === 3 && state.every((element) => typeof element === "function");
      }
    `);

    await expect(result).toBeTruthy();
  });

  it("render(Component, container, state) put 'Component' inside 'container' after invoke", async ({
    browser,
  }) => {
    const result: boolean = await browser.execute(`
      () => {
        const container = document.createElement("div");
        const Component = document.createElement("div");
        container.dataset.test = "test-component";
        render(Component, container, {});
        const isRendered = container.querySelector('[data-test="test-component"]') !== null;
        return isRendered;
      }
    `);

    await expect(result).toBeTruthy();
  });
});
