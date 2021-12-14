const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path')
const XlsxPopulate = require('xlsx-populate');
const xlsx = require('xlsx');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

const createLessons = (array, weeks, groups) => {
    let newWeeks = weeks;

    array.map((lesson, lessonRow) => {
        if (typeof lesson[0] === "string") {
            lesson[lesson.length] = lesson.join('/n');
            newWeeks.map((week, weekIndex) => {
                Object.keys(week).map((dayName, dayIndex) => {
                    const day = week[dayName];
                    if (lessonRow >= day.rowStart && lessonRow <= day.rowEnd) {
                        Object.keys(day).map((lessonHours) => {
                            const _lessons = day[lessonHours]
                            if (typeof _lessons !== "number") {
                                if (lessonRow >= _lessons.rowStart && lessonRow <= _lessons.rowEnd) {
                                    newWeeks[weekIndex][dayName][lessonHours].lessons.push({
                                        name: lesson[lesson.length - 1],
                                        groups
                                    })
                                }
                            }
                        })
                    }
                })
            })
        }
    })

    return newWeeks;
}

const createHours = (array) => {
    let lastKnownObject = {}
    let hours = [];

    array.map((cellValue, index) => {
        if (cellValue[0] === "sobota") {
            if (Object.keys(lastKnownObject).length > 0) {
                lastKnownObject = {
                    sobota: lastKnownObject.sobota,
                    niedziela: {
                        ...lastKnownObject.niedziela,
                        rowEnd: index - 2
                    }
                }
                hours.push(lastKnownObject);
            }

            lastKnownObject = {
                sobota: {
                    rowStart: index
                }
            }
        } else if (cellValue[0] === "niedziela") {
            lastKnownObject = {
                sobota: {
                    ...lastKnownObject.sobota,
                    rowEnd: index - 2
                },
                niedziela: {
                    rowStart: index
                }
            }
        } else {
            if (cellValue[0]) {
                Object.keys(lastKnownObject).map((key, _index) => {
                    if (_index === Object.keys(lastKnownObject).length - 1) {
                        lastKnownObject[key][cellValue[0]] = {
                            rowStart: index - 1,
                            lessons: [],
                            rowEnd: index + 1
                        }
                    }
                })
            }
        }
    })

    return hours;
}

const createDates = (array) => {
    let lastKnownDate = '00.00.0000';
    let newArray = []
    array.map((date, index) => {
        if (typeof date[0] !== "undefined") {
            if (typeof date[0] === "number") {
                const _date = XlsxPopulate.numberToDate(date[0]);

                lastKnownDate = `${_date.getDate()}.${_date.getUTCMonth() + 1}.${_date.getFullYear()}`
            } else {
                newArray.push(date[0]);
                lastKnownDate = date[0];
            }
        } else {
            newArray.push(lastKnownDate)
        }
    })

    return newArray;
}

const createArrayFromY1Workbook = (workbook) => {

    const dates = createDates(workbook.sheet('2021_2022').range('A8:A474').value());
    let array = createHours(workbook.sheet('2021_2022').range('B7:B474').value());
    dates.map((date, index) => {
        array.map((week, weekIndex) => {
            Object.keys(week).map(weekDay => {
                const dayValue = week[weekDay];

                if (dayValue.rowStart < index && dayValue.rowEnd > index) {
                    array[weekIndex][weekDay].date = date;
                }
            })
        })
    })

    array = createLessons(workbook.sheet('2021_2022').range('J8:J474').value(), array, { w: 1, c: 1, l: 1 });
    array = createLessons(workbook.sheet('2021_2022').range('K8:K474').value(), array, { w: 1, c: 1, l: 2 });
    array = createLessons(workbook.sheet('2021_2022').range('L8:L474').value(), array, { w: 1, c: 2, l: 3 });
    array = createLessons(workbook.sheet('2021_2022').range('M8:M474').value(), array, { w: 1, c: 2, l: 4 });
    array = createLessons(workbook.sheet('2021_2022').range('N8:N474').value(), array, { w: 1, c: 3, l: 5 });
    array = createLessons(workbook.sheet('2021_2022').range('N8:N474').value(), array, { w: 1, c: 3, l: 6 });
    array = new Object(array);
    return array;
}

const newLessons = []

const data = xlsx.readFile("./plan-2.xls");

const groups = [
    {
        column: "J",
        w: 1,
        c: 1,
        l: 1
    },
    {
        column: "K",
        w: 1,
        c: 1,
        l: 2
    },
    {
        column: "L",
        w: 1,
        c: 2,
        l: 3
    },
    {
        column: "M",
        w: 1,
        c: 2,
        l: 4
    },
    {
        column: "N",
        w: 1,
        c: 3,
        l: 5
    },
]

const startIndex = 8;
const endIndex = 474;

for (let i = startIndex; i <= endIndex; i++) {
    const day = data.Sheets["2021_2022"][`A${i}`];

    if (day) {
        const dayDate = XlsxPopulate.numberToDate(day.v);

        newLessons.push({
            sobota: {
                date: `${dayDate.getDate()}.${dayDate.getMonth() + 1}.${dayDate.getFullYear()}`,
                '8:00-10:30': { lessons: [] },
                '10:45-13:15': { lessons: [] },
                '14:00-16:30': { lessons: [] },
                '16:45-19:15': { lessons: [] },
                rowStart: i,
                rowEnd: i + 12
            }
        })
    }
}

groups.map(group => {
    let lastHour = "8:00-10:30";
    for (let i = startIndex; i <= endIndex; i++) {
        const hour = data.Sheets["2021_2022"][`B${i}`];
        const field = data.Sheets["2021_2022"][`${group.column}${i}`];

        if (hour && lastHour !== hour.v) {
            lastHour = hour.v;
        }

        // field && console.log("row", i)
        field && typeof field.v !== "number" && hour && console.log(field.v, hour.v);

        if (field && typeof field.v !== "number") {
            newLessons.map((newLesson, j) => {
                if (newLesson.sobota.rowStart <= i && newLesson.sobota.rowEnd >= i) {
                    newLessons[j].sobota[lastHour].lessons.push({
                        name: field.v,
                        groups: {
                            w: group.w,
                            c: group.c,
                            l: group.l
                        }
                    })
                }
            })
        }
    }
})

// console.log(newLessons)

// XlsxPopulate.fromFileAsync('./plan-2.xlsx')
//     .then(workbook => {
//         let lessons = createArrayFromY1Workbook(workbook)

//         console.log(lessons)
//     })
//     .catch(err => console.log(err))

app.get('/lessons', (req, res) => {
    // XlsxPopulate.fromFileAsync('./plan-2.xlsx')
    //     .then(workbook => {
    //         let lessons = createArrayFromY1Workbook(workbook)

    //         res.status(200).json(lessons)
    //     })
    //     .catch(err => console.log(err))

    res.status(200).json(newLessons)
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Server listening on port 8080');
})