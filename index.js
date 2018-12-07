const puppeteer = require("puppeteer");
const db = require("./sites_db.json");
const moment = require("moment");
const chalk = require("chalk");

const currentDay = moment().date();

console.log("Making auto shit for day: " + currentDay);

(async () => {
  // await computerbild();
  await lidl();
})();

async function computerbild() {
  const doorMap = {
    1: 10,
    2: 32,
    3: 13,
    4: 26,
    5: 20,
    6: 31,
    7: 21,
    8: 33,
    9: 5,
    10: 27,
    11: 14,
    12: 28,
    13: 12,
    14: 35,
    15: 7,
    16: 18,
    17: 34,
    18: 4,
    19: 24,
    20: 17,
    21: 6,
    22: 25,
    23: 11,
    24: 19
  };

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(db.sites.computerbild.link);

  await page.click(`#kalender > div.door.door${doorMap[currentDay]} > a > span`);
  const content = await page.title();
  await page.screenshot({ path: "screens/computerbild.png" });
  console.info(chalk.green("Computer Bild"));
  console.info(chalk.green("There is " + content + " today @\n " + page.url()));
  console.info(chalk.green("--------------"));
  await browser.close();
}

async function lidl() {
  const browser = await puppeteer.launch({ defaultViewport: { width: 1920, height: 1080 } });
  const page = await browser.newPage();
  await page.goto(list[1]);
  const firstSelector = `div[data\-doornum="${currentDay}"]`;
  await page.click(firstSelector);
  await page.waitFor(`.btn.cta.styled\-btn`);
  await page.click(`.btn.cta.styled\-btn`);
  await page.screenshot({ path: "screens/lidl.png" });

  const content = await page.$(".modal-header h2");
  console.info(chalk.green("Lidl"));
  console.info(chalk.green("There is " + content + " today @\n " + (await page.url())));
  console.info(chalk.green("--------------"));
}
