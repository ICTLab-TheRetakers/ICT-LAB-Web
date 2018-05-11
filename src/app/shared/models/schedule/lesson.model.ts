export default class Lesson {
    teacher: string;
    room: string;
    class: string;
    course: string;
    start_time: string;

    constructor(_teacher: string, _class: string, _room:string,  _course: string, _start_time: string) {
        this.teacher = _teacher;
        this.class = _class;
        this.room = _room;
        this.course = _course;
        this.start_time = _start_time;
    }
}
