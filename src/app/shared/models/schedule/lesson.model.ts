export default class Lesson {
    teacher: string;
    classNumber: string;
    course: string;
    start_time: string;

    constructor(teacher: string, classNumber: string, course: string, start_time: string) {
        this.teacher = teacher;
        this.classNumber = classNumber;
        this.course = course;
        this.start_time = start_time;
    }
}
