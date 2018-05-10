import Day from "./day.model";

export default class Schedule {
    identifier: string;
    schedule_type: string;
    week: number;
    quarter_of_year: number;
    department: string;
    days: Day[];

    constructor(identifier: string, type: string, week: number, quarter: number, department: string) {
        this.identifier = identifier;
        this.schedule_type = type;
        this.week = week;
        this.quarter_of_year = quarter;
        this.department = department;
        this.days = [];
    }
}
