const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const XlsxPopulate = require("xlsx-populate");
const xlsx = require("xlsx");
const https = require("https");
const puppeteer = require("puppeteer");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));

let lastScrape = Date.now();

const readLessons = () => {
  const newLessons = [];

  const data = xlsx.readFile("./plan.xls");

  const groups = [
    {
      column: "J",
      w: 1,
      c: 1,
      l: 1,
    },
    {
      column: "K",
      w: 1,
      c: 1,
      l: 2,
    },
    {
      column: "L",
      w: 1,
      c: 2,
      l: 3,
    },
    {
      column: "M",
      w: 1,
      c: 2,
      l: 4,
    },
  ];

  const startIndex = 7;
  const endIndex = 395;

  for (let i = startIndex; i <= endIndex; i++) {
    const day = data.Sheets["2021_2022"][`A${i}`];

    if (day !== undefined) {
      let dayDate;
      if (typeof day.v === "number") {
        const _date = XlsxPopulate.numberToDate(day.v);
        dayDate = `${_date.getDate()}.${
          _date.getMonth() + 1
        }.${_date.getFullYear()}`;
      } else {
        dayDate = day.v;
      }

      newLessons.push({
        date: dayDate,
        "8.00-10.30": { lessons: [] },
        "10.45-13.15": { lessons: [] },
        "14.00-16.30": { lessons: [] },
        "16.45-19.15": { lessons: [] },
        rowStart: i,
        rowEnd: i + 12,
      });
    }
  }

  groups.map((group) => {
    let lastHour = "8.00-10.30";
    for (let i = startIndex; i <= endIndex; i++) {
      const hour = data.Sheets["2021_2022"][`B${i}`];
      const field = data.Sheets["2021_2022"][`${group.column}${i}`];

      if (hour && lastHour !== hour.v) {
        lastHour = hour.v;
      }

      // field && console.log("row", i)
      // field && typeof field.v !== "number" && hour && console.log(field.v, hour.v);

      if (field && typeof field.v !== "number") {
        newLessons.map((newLesson, j) => {
          if (newLesson.rowStart <= i && newLesson.rowEnd >= i) {
            newLessons[j][lastHour] !== undefined &&
              newLessons[j][lastHour].lessons.push({
                name: field.v,
                groups: {
                  w: group.w,
                  c: group.c,
                  l: group.l,
                },
              });
          }
        });
      }
    }
  });

  return { lessons: newLessons, lastScrape };
};

app.get("/lessons", (req, res) => {
  res.status(200).json(readLessons());
});

app.get("/scrape-classes", (req, res) => {
  scrapeClasses().then(() => {
    res.status(200).json(readLessons());
  });
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server listening on port 8080");
});

const scrapeClasses = async () => {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();

  await page.goto("https://it.pk.edu.pl/?page=rz");
  const anchor = await page.waitForSelector(
    ".alert.readmetxt.alert-light > ol > li:nth-child(1) > a"
  );
  const anchorHref = await page.evaluate((anchor) => anchor.href, anchor);

  const file = fs.createWriteStream("./plan.xls");
  https
    .get(anchorHref, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
      });
      lastScrape = Date.now();
    })
    .on("error", function (err) {
      fs.unlink("./plan.xls");
      console.log(err);
    });

  console.log(`${new Date(Date.now()).toUTCString()} - Scraped classes`);
};

scrapeClasses();
