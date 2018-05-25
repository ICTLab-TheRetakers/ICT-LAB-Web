export default class Room {
    room_code: string;
    has_smartboard: boolean;
    has_computer: boolean;
    has_windows: boolean;
    student_capacity: number;
    location: string;
    department: string;

    constructor(room_code: string, has_smartboard: boolean, has_computer: boolean,
        has_windows: boolean, student_capacity: number, location: string, department: string) {

        this.room_code = room_code;
        this.has_smartboard = has_smartboard;
        this.has_computer = has_computer;
        this.has_windows = has_windows;
        this.student_capacity = student_capacity;
        this.location = location;
        this.department = department;
    }
}
