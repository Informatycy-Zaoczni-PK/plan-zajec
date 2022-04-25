export interface ILesson {
    name: string;
    groups: {
      w: number;
      c: number;
      l: number;
    };
  }
  
  export type ILessons = {
    lessons: Array<ILesson>;
  };
  
  export interface IClassDay {
    date: string;
    rowStart: number;
    rowEnd: number;
    "8.00-10.30": ILessons;
    "10.45-13.15": ILessons;
    "14.00-16.30": ILessons;
    "16.45-19.15": ILessons;
  }
  