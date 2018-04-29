import Day from "./day.model";

export default class Schedule {
    classroom: string;
    week: number;
    quarter: number;
    department: string;
    days: Day[];

    constructor(classroom: string, week: number, quarter: number, department: string) {
        this.classroom = classroom;
        this.week = week;
        this.quarter = quarter;
        this.department = department;
        this.days = [];
    }
}
