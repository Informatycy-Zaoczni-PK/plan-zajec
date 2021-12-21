import { ILesson, ILessons } from "../../types";

export interface IClassCard {
    lesson: ILesson,
    groups: {
        c: number,
        l: number
    }
}

export interface ICard {
    cardColor: "1" | "2" | "3" | "4"
}