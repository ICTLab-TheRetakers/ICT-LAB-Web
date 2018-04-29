import Lesson from "./lesson.model";

export default class Day {
    id: number;
    weekday: string;
    lessons: Lesson[];

    constructor(id: number, weekday: string) {
        this.id = id;
        this.weekday = weekday;
        this.lessons = [];
    }
}
