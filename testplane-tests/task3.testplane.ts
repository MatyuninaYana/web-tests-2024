import { resolve } from "node:path";

describe("task3", () => {
  beforeEach(async ({ browser }) => {
    await browser.url(resolve("..", "web2024", "index.html"));
  });

  it("whether the 'Откуда' field accepts the value 'Симферополь'", async ({
    browser,
  }) => {
    const input = await browser.$('[data-test="from-input"]');
    const button = await browser.$('[data-test="submit-form"]');

    await input.setValue("Симферополь");
    await button.click();

    await expect(input).not.toHaveElementClassContaining("error-field");
  });

  it("whether the 'Откуда' field accepts the value 'симферополь'", async ({
    browser,
  }) => {
    const input = await browser.$('[data-test="from-input"]');
    const button = await browser.$('[data-test="submit-form"]');

    await input.setValue("симферополь");
    await button.click();

    await expect(input).not.toHaveElementClassContaining("error-field");
  });

  it("whether the 'Откуда' field NOT accepts an empty value", async ({
    browser,
  }) => {
    const input = await browser.$('[data-test="from-input"]');
    const button = await browser.$('[data-test="submit-form"]');

    await button.click();

    await expect(input).toHaveElementClassContaining("error-field");
  });

  it("whether the 'Куда' field accepts the value 'Симферополь'", async ({
    browser,
  }) => {
    const input = await browser.$('[data-test="where-input"]');
    const button = await browser.$('[data-test="submit-form"]');

    await input.setValue("Симферополь");
    await button.click();

    await expect(input).not.toHaveElementClassContaining("error-field");
  });

  it("whether the 'Куда' field accepts the value 'симферополь'", async ({
    browser,
  }) => {
    const input = await browser.$('[data-test="where-input"]');
    const button = await browser.$('[data-test="submit-form"]');

    await input.setValue("симферополь");
    await button.click();

    await expect(input).not.toHaveElementClassContaining("error-field");
  });

  it("whether the 'Куда' field NOT accepts an empty value", async ({
    browser,
  }) => {
    const input = await browser.$('[data-test="where-input"]');
    const button = await browser.$('[data-test="submit-form"]');

    await button.click();

    await expect(input).toHaveElementClassContaining("error-field");
  });

  it("same value of 'Куда' and 'Откуда' fields NOT be accepted", async ({
    browser,
  }) => {
    const fromInput = await browser.$('[data-test="from-input"]');
    const whereInput = await browser.$('[data-test="where-input"]');
    const button = await browser.$('[data-test="submit-form"]');

    await fromInput.setValue("Симферополь");
    await whereInput.setValue("Симферополь");
    await button.click();

    await expect(fromInput).toHaveElementClassContaining("error-field");
    await expect(whereInput).toHaveElementClassContaining("error-field");

    await fromInput.setValue("Ялта");
    await whereInput.setValue("Ялта");
    await button.click();

    await expect(fromInput).toHaveElementClassContaining("error-field");
    await expect(whereInput).toHaveElementClassContaining("error-field");

    await fromInput.setValue("Севастополь");
    await whereInput.setValue("Севастополь");
    await button.click();

    await expect(fromInput).toHaveElementClassContaining("error-field");
    await expect(whereInput).toHaveElementClassContaining("error-field");

    await fromInput.setValue("Феодосия");
    await whereInput.setValue("Феодосия");
    await button.click();

    await expect(fromInput).toHaveElementClassContaining("error-field");
    await expect(whereInput).toHaveElementClassContaining("error-field");

    await fromInput.setValue("Судак");
    await whereInput.setValue("Судак");
    await button.click();

    await expect(fromInput).toHaveElementClassContaining("error-field");
    await expect(whereInput).toHaveElementClassContaining("error-field");
  });

  it("time of transfer shouldn't less than current time", async ({
    browser,
  }) => {
    const dateHourPast = new Date(Date.now() - 1000 * 60 * 60);
    const dateInput = await browser.$('[data-test="date-input"]');
    const timeInput = await browser.$('[data-test="time-input"]');
    const button = await browser.$('[data-test="submit-form"]');

    const date = dateHourPast.getDate().toString().padStart(2, "0");
    const month = (dateHourPast.getMonth() + 1).toString().padStart(2, "0");
    const hours = dateHourPast.getHours().toString().padStart(2, "0");
    const mins = dateHourPast.getMinutes().toString().padStart(2, "0");

    await dateInput.setValue(`${date}.${month}.${dateHourPast.getFullYear()}`);
    await timeInput.setValue(`${hours}:${mins}`);
    await button.click();

    await expect(timeInput).toHaveElementClassContaining("error-field");
  });

  it("date of transfer shouldn't less than current date for dd.mm.yyyy format", async ({
    browser,
  }) => {
    const yesterdayDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
    const dateInput = await browser.$('[data-test="date-input"]');
    const timeInput = await browser.$('[data-test="time-input"]');
    const button = await browser.$('[data-test="submit-form"]');

    const date = yesterdayDate.getDate().toString().padStart(2, "0");
    const month = (yesterdayDate.getMonth() + 1).toString().padStart(2, "0");
    const hours = yesterdayDate.getHours().toString().padStart(2, "0");
    const mins = yesterdayDate.getMinutes().toString().padStart(2, "0");

    await dateInput.setValue(`${date}.${month}.${yesterdayDate.getFullYear()}`);
    await timeInput.setValue(`${hours}:${mins}`);
    await button.click();

    await expect(dateInput).toHaveElementClassContaining("error-field");
  });

  it("date of transfer shouldn't less than current date for dd.mm format", async ({
    browser,
  }) => {
    const yesterdayDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
    const dateInput = await browser.$('[data-test="date-input"]');
    const timeInput = await browser.$('[data-test="time-input"]');
    const button = await browser.$('[data-test="submit-form"]');

    const date = yesterdayDate.getDate().toString().padStart(2, "0");
    const month = (yesterdayDate.getMonth() + 1).toString().padStart(2, "0");
    const hours = yesterdayDate.getHours().toString().padStart(2, "0");
    const mins = yesterdayDate.getMinutes().toString().padStart(2, "0");

    await dateInput.setValue(`${date}.${month}`);
    await timeInput.setValue(`${hours}:${mins}`);
    await button.click();

    await expect(dateInput).toHaveElementClassContaining("error-field");
  });

  it("date of transfer shouldn't less than current date for dd format", async ({
    browser,
  }) => {
    const yesterdayDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
    const dateInput = await browser.$('[data-test="date-input"]');
    const timeInput = await browser.$('[data-test="time-input"]');
    const button = await browser.$('[data-test="submit-form"]');

    const date = yesterdayDate.getDate().toString().padStart(2, "0");
    const hours = yesterdayDate.getHours().toString().padStart(2, "0");
    const mins = yesterdayDate.getMinutes().toString().padStart(2, "0");

    await dateInput.setValue(`${date}`);
    await timeInput.setValue(`${hours}:${mins}`);
    await button.click();

    await expect(dateInput).toHaveElementClassContaining("error-field");
  });

  it("field 'Дата поездки' accepts format dd.mm.yyyy", async ({
    browser,
  }) => {
    const dateInput = await browser.$('[data-test="date-input"]');
    const button = await browser.$('[data-test="submit-form"]');

    await dateInput.setValue("09.06.2024");
    await button.click();

    await expect(dateInput).not.toHaveElementClassContaining("error-field");

    await dateInput.setValue("23.06.2024");
    await button.click();

    await expect(dateInput).not.toHaveElementClassContaining("error-field");

    await dateInput.setValue("30.12.2024");
    await button.click();

    await expect(dateInput).not.toHaveElementClassContaining("error-field");
  });

  it("field 'Дата поездки' accepts format dd.mm", async ({ browser }) => {
    const dateInput = await browser.$('[data-test="date-input"]');
    const button = await browser.$('[data-test="submit-form"]');

    await dateInput.setValue("09.06");
    await button.click();

    await expect(dateInput).not.toHaveElementClassContaining("error-field");

    await dateInput.setValue("23.06");
    await button.click();

    await expect(dateInput).not.toHaveElementClassContaining("error-field");

    await dateInput.setValue("30.12");
    await button.click();

    await expect(dateInput).not.toHaveElementClassContaining("error-field");
  });

  it("field 'Дата поездки' accepts format dd", async ({ browser }) => {
    const dateInput = await browser.$('[data-test="date-input"]');
    const button = await browser.$('[data-test="submit-form"]');

    await dateInput.setValue("09");
    await button.click();

    await expect(dateInput).not.toHaveElementClassContaining("error-field");

    await dateInput.setValue("23");
    await button.click();

    await expect(dateInput).not.toHaveElementClassContaining("error-field");
  });

  it("field 'Дата поездки' accepts format dd-mm-yyyy", async ({
    browser,
  }) => {
    const dateInput = await browser.$('[data-test="date-input"]');
    const button = await browser.$('[data-test="submit-form"]');

    await dateInput.setValue("09-06-2024");
    await button.click();

    await expect(dateInput).not.toHaveElementClassContaining("error-field");

    await dateInput.setValue("23-06-2024");
    await button.click();

    await expect(dateInput).not.toHaveElementClassContaining("error-field");

    await dateInput.setValue("30-12-2024");
    await button.click();

    await expect(dateInput).not.toHaveElementClassContaining("error-field");
  });

  it("field 'Дата поездки' accepts format dd-mm", async ({ browser }) => {
    const dateInput = await browser.$('[data-test="date-input"]');
    const button = await browser.$('[data-test="submit-form"]');

    await dateInput.setValue("09-06");
    await button.click();

    await expect(dateInput).not.toHaveElementClassContaining("error-field");

    await dateInput.setValue("23-06");
    await button.click();

    await expect(dateInput).not.toHaveElementClassContaining("error-field");

    await dateInput.setValue("30-12");
    await button.click();

    await expect(dateInput).not.toHaveElementClassContaining("error-field");
  });

  it("field 'Номер телефона' accepts '+7 (978) 77 777 77' value", async ({
    browser,
  }) => {
    const phoneInput = await browser.$('[data-test="phone-input"]');
    const button = await browser.$('[data-test="submit-form"]');

    await phoneInput.setValue("+7 (978) 77 777 77");
    await button.click();

    await expect(phoneInput).not.toHaveElementClassContaining("error-field");
  });

  it("field 'Номер телефона' accepts '89787777777' value", async ({
    browser,
  }) => {
    const phoneInput = await browser.$('[data-test="phone-input"]');
    const button = await browser.$('[data-test="submit-form"]');

    await phoneInput.setValue("89787777777");
    await button.click();

    await expect(phoneInput).not.toHaveElementClassContaining("error-field");
  });

  it("field 'Номер телефона' should reject value '+72412'", async ({
    browser,
  }) => {
    const phoneInput = await browser.$('[data-test="phone-input"]');
    const button = await browser.$('[data-test="submit-form"]');

    await phoneInput.setValue("+72412");
    await button.click();

    await expect(phoneInput).toHaveElementClassContaining("error-field");
  });

  it("field 'Номер телефона' should reject value 'не цифры'", async ({
    browser,
  }) => {
    const phoneInput = await browser.$('[data-test="phone-input"]');
    const button = await browser.$('[data-test="submit-form"]');

    await phoneInput.setValue("не цифры");
    await button.click();

    await expect(phoneInput).toHaveElementClassContaining("error-field");
  });

  it("check that tour can't be included if time isn't between 8:00 and 16:00", async ({
    browser,
  }) => {
    const tomorrowDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const dateInput = await browser.$('[data-test="date-input"]');
    const timeInput = await browser.$('[data-test="time-input"]');
    const tourCheckbox = await browser.$('[data-test="tour-checkbox"]');
    const button = await browser.$('[data-test="submit-form"]');

    const date = tomorrowDate.getDate().toString().padStart(2, "0");
    const month = (tomorrowDate.getMonth() + 1).toString().padStart(2, "0");

    await dateInput.setValue(`${date}.${month}`);
    await timeInput.setValue(`6:00`);
    await tourCheckbox.click();
    await button.click();

    await expect(tourCheckbox).toHaveElementClassContaining("error-field");

    await timeInput.setValue(`00:00`);
    await button.click();

    await expect(tourCheckbox).toHaveElementClassContaining("error-field");
  });

  it("check that tour can be included if time on edges of interval (8:00 and 16:00)", async ({
    browser,
  }) => {
    const tomorrowDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const dateInput = await browser.$('[data-test="date-input"]');
    const timeInput = await browser.$('[data-test="time-input"]');
    const tourCheckbox = await browser.$('[data-test="tour-checkbox"]');
    const button = await browser.$('[data-test="submit-form"]');

    const date = tomorrowDate.getDate().toString().padStart(2, "0");
    const month = (tomorrowDate.getMonth() + 1).toString().padStart(2, "0");

    await dateInput.setValue(`${date}.${month}`);
    await timeInput.setValue(`8:00`);
    await tourCheckbox.click();
    await button.click();

    await expect(tourCheckbox).not.toHaveElementClassContaining("error-field");

    await timeInput.setValue(`16:00`);
    await button.click();

    await expect(tourCheckbox).not.toHaveElementClassContaining("error-field");
  });

  it("tour can't be included if destination is Simferopol", async ({
    browser,
  }) => {
    const tomorrowDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const whereInput = await browser.$('[data-test="where-input"]');
    const dateInput = await browser.$('[data-test="date-input"]');
    const timeInput = await browser.$('[data-test="time-input"]');
    const tourCheckbox = await browser.$('[data-test="tour-checkbox"]');
    const button = await browser.$('[data-test="submit-form"]');

    const date = tomorrowDate.getDate().toString().padStart(2, "0");
    const month = (tomorrowDate.getMonth() + 1).toString().padStart(2, "0");

    await dateInput.setValue(`${date}.${month}`);
    await timeInput.setValue(`10:00`);
    await whereInput.setValue("Симферополь");
    await tourCheckbox.click();
    await button.click();

    await expect(tourCheckbox).toHaveElementClassContaining("error-field");
  });

  it("check that price computing correctly", async ({ browser }) => {
    const tomorrowDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const phoneInput = await browser.$('[data-test="phone-input"]');
    const priceContainer = await browser.$('[data-test="price"]');
    const fromInput = await browser.$('[data-test="from-input"]');
    const whereInput = await browser.$('[data-test="where-input"]');
    const dateInput = await browser.$('[data-test="date-input"]');
    const timeInput = await browser.$('[data-test="time-input"]');
    const tourCheckbox = await browser.$('[data-test="tour-checkbox"]');
    const button = await browser.$('[data-test="submit-form"]');

    const date = tomorrowDate.getDate().toString().padStart(2, "0");
    const month = (tomorrowDate.getMonth() + 1).toString().padStart(2, "0");

    await phoneInput.setValue("+7 978 77-777-77");

    const distanceTable = {
      симферополь: {
        ялта: 82,
        севастополь: 76,
        феодосия: 114,
        судак: 103,
      },
      ялта: {
        симферополь: 82,
        севастополь: 84,
        феодосия: 165,
        судак: 115,
      },
      севастополь: {
        симферополь: 76,
        ялта: 84,
        феодосия: 192,
        судак: 180,
      },
      феодосия: {
        симферополь: 114,
        ялта: 165,
        севастополь: 192,
        судак: 52,
      },
      судак: {
        симферополь: 103,
        ялта: 115,
        севастополь: 180,
        феодосия: 52,
      },
    };
    for (const from of Object.keys(distanceTable)) {
      for (const where of Object.keys(distanceTable)) {
        if (from === where) continue;

        await fromInput.setValue(from);
        await whereInput.setValue(where);

        for (const isNight of [true, false]) {
          if (isNight) {
            await dateInput.setValue(`${date}.${month}`);
            await timeInput.setValue(`00:00`);

            const computedPrice = Math.floor(
              30 * distanceTable[from][where] * 1.1
            );
            await expect(priceContainer).toHaveText(computedPrice.toString());
          } else {
            for (const _ of [true, false]) {
              await tourCheckbox.click();

              const includeTour = await tourCheckbox.isSelected();
              if (includeTour && where === "симферополь") continue;

              await dateInput.setValue(`${date}.${month}`);
              await timeInput.setValue(`12:00`);

              const computedPrice = Math.floor(
                30 * distanceTable[from][where] + (includeTour ? 700 : 0)
              );
              await expect(priceContainer).toHaveText(computedPrice.toString());
            }
          }
        }
      }
    }
  });
});
