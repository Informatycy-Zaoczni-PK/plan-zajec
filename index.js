const express = require('express');
const fs = require('fs');
const XlsxPopulate = require('xlsx-populate');

const app = express();

app.use(express.json());

const isInArray = (obj, array) => {
    console.log('obj', obj);
    console.log('array', array);
    for (let i = 0; i < array.length; i++){
        if(array[i] === obj){
            return true;
        }
    }

    return false;
}

const createLessons = (array, weeks, groups) => {
    let newWeeks = weeks;

    array.map((lesson, lessonRow) => {
        if(typeof lesson[0] === "string"){
            lesson[lesson.length] = lesson.join('/n');
            newWeeks.map((week, weekIndex) => {
                Object.keys(week).map((dayName, dayIndex) => {
                    const day = week[dayName];
                    if(lessonRow >= day.rowStart && lessonRow <= day.rowEnd){
                        Object.keys(day).map((lessonHours) => {
                            const _lessons = day[lessonHours]
                            if(typeof _lessons !== "number"){
                                if(lessonRow >= _lessons.rowStart && lessonRow <= _lessons.rowEnd){
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
        if(cellValue[0] === "sobota"){
            if(Object.keys(lastKnownObject).length > 0){
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
        }else if(cellValue[0] === "niedziela"){
            lastKnownObject = {
                sobota: {
                    ...lastKnownObject.sobota,
                    rowEnd: index - 2
                }, 
                niedziela: {
                    rowStart: index
                }
            }
        }else{
            if(cellValue[0]){
                Object.keys(lastKnownObject).map((key, _index) => {
                    if(_index === Object.keys(lastKnownObject).length - 1){
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
        if(typeof date[0] !== "undefined") {
            newArray.push(date[0]);
            lastKnownDate = date[0];
        }else{
            newArray.push(lastKnownDate)
        }
    })

    return newArray;
}

const createArrayFromY1Workbook = (workbook) => {
    let array = [];
    
    const dates = createDates(workbook.sheet('2020_2021').range('A4:A392').value());
    const hours = createHours(workbook.sheet('2020_2021').range('B3:B392').value());
    dates.map((date, index) => {
        hours.map((hour, _index) => {
            Object.keys(hour).map((key, __index) => {
                if(hour[key].rowStart === index){
                    array.push(hour)
                    array = array.filter((el) => el !== undefined && el !== null)
                }
            })
        })

        array.map((week, weekIndex) => {
            Object.keys(week).map(weekDay => {
                const dayValue = week[weekDay];

                if(dayValue.rowStart < index && dayValue.rowEnd > index){
                    array[weekIndex][weekDay].date = date;
                }
            })
        })
    })
    array = createLessons(workbook.sheet('2020_2021').range('D4:D392').value(), array, {w: 1, c: 1, l: 1});
    array = createLessons(workbook.sheet('2020_2021').range('E4:E392').value(), array, {w: 1, c: 1, l: 2});
    array = createLessons(workbook.sheet('2020_2021').range('F4:F392').value(), array, {w: 1, c: 2, l: 3});
    array = createLessons(workbook.sheet('2020_2021').range('G4:G392').value(), array, {w: 1, c: 2, l: 4});
    array = createLessons(workbook.sheet('2020_2021').range('H4:H392').value(), array, {w: 1, c: 3, l: 5});
    array = createLessons(workbook.sheet('2020_2021').range('I4:I392').value(), array, {w: 1, c: 3, l: 6});
    array = new Object(array);
    return array;
}

app.get('/lessons', (req, res) => {
    XlsxPopulate.fromFileAsync('./plan.xlsx')
    .then(workbook => {
        let lessons = createArrayFromY1Workbook(workbook)

        res.status(200).json(lessons)
    })
    .catch(err => console.log(err))
})

app.listen(process.env.PORT || 8080, () => {
    console.log('Server listening on port 8080');
})