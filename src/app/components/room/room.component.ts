import { Component, OnInit } from '@angular/core';

import Room from '../../shared/models/room.model';

import { RoomService } from '../../shared/services/room.service';
import { SharedService } from '../../shared/services/shared.service';

import { SelectRoomComponent } from './select-room/select-room.component';
import { ReservationService } from '../../shared/services/reservation.service';
import Schedule from '../../shared/models/schedule/schedule.model';
import { Observable } from 'rxjs/Observable';
import Lesson from '../../shared/models/schedule/lesson.model';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
    schedule: Schedule = null;
    hours: string[] = ['8:30-9:20', '9:20-10:10', '10:30-11:20', '11:20-12:10', '12:10-13:00', '13:00-13:50', '13:50-14:40', '15:00-15:50',
        '15:50-16:40', '17:00-17:50', '17:50-18:40', '18:40-19:30', '19:30-20:20', '20:20-21:10', '21:10-22:00'];

    constructor(private _roomService: RoomService, private _reservationService: ReservationService) { }

    ngOnInit() {}

    getScheduleChoice(event: any) {
        this.schedule = event;
    }

    getLesson(day: string, hour: string): string {
        let lesson = this.schedule.days.filter(f => f.weekday == day)[0].lessons.filter(f => f.start_time == hour)[0];

        return this.print(lesson);
    }

    print(lesson: Lesson): string {
        let lessonString = '';

        if (lesson != null || lesson != undefined) {

            // If all are unavailable
            if (lesson.course == '' && lesson.teacher == '' && lesson.room == '' && lesson.course_code == '' && lesson.class == '') {
                lessonString = '';
            }

            // If all are available
            if (lesson.course != '' && lesson.teacher != '' && lesson.room != '' && lesson.course_code != '' && lesson.class != '') {
                lessonString = lesson.course_code + '<br />' + lesson.room + ' - ' + lesson.teacher;
            }

            // If only course is available
            if (lesson.course != '' && lesson.teacher == '' && lesson.room == '' && lesson.course_code == '' && lesson.class == '') {
                lessonString = lesson.course;
            }

            // When schedule type is Room
            // If class, teacher and course code are available
            // If teacher and course code are available
            if (this.schedule.schedule_type == 'Room' && lesson.teacher != '' && lesson.course_code != '' && lesson.class != '') {
                lessonString = lesson.course_code + '<br />' + lesson.class + ' - ' + lesson.teacher;
            } else if (this.schedule.schedule_type == 'Room' && lesson.teacher != '' && lesson.course_code != '' && lesson.class == '') {
                lessonString = lesson.course_code + '<br />' + lesson.teacher;
            }

            // When schedule type is Class
            // If room and course are available
            // If room, teacher and course are available
            // If teacher and course code are available
            // If room, teacher and course code are available
            if (this.schedule.schedule_type == 'Class' && lesson.teacher == '' && lesson.course_code != '' && lesson.course != '' && lesson.room != '') {
                lessonString = lesson.room + ' - ' + lesson.course_code;
            } else if (this.schedule.schedule_type == 'Class' && lesson.teacher != '' && lesson.course_code == '' && lesson.course != '' && lesson.room != '') {
                lessonString = lesson.course + '<br />' + lesson.room + ' - ' + lesson.teacher;
            } else if (this.schedule.schedule_type == 'Class' && lesson.teacher != '' && lesson.course_code != '' && lesson.course != '' && lesson.room == '') {
                lessonString = lesson.course_code + '<br />' + lesson.teacher;
            } else if (this.schedule.schedule_type == 'Class' && lesson.teacher != '' && lesson.course_code != '' && lesson.course == '' && lesson.room != '') {
                lessonString = lesson.teacher + '<br />' + lesson.room + '<br />' + lesson.course_code;
            }

            // When schedule type is Teacher
            // If room and course are available
            // If class and course are available
            // If room, class and course are available
            // If room, class and course code are available
            if (this.schedule.schedule_type == 'Teacher' && lesson.course != '' && lesson.room != '' && lesson.class == '') {
                lessonString = lesson.course + '<br />' + lesson.room;
            } else if (this.schedule.schedule_type == 'Teacher' && lesson.course != '' && lesson.class != '' && lesson.room == '') {
                lessonString = lesson.course + '<br />' + lesson.class;
            } else if (this.schedule.schedule_type == 'Teacher' && lesson.course != '' && lesson.class != '' && lesson.room != '') {
                lessonString = lesson.course + '<br />' + lesson.class + '<br />' + lesson.room;
            } else if (this.schedule.schedule_type == 'Teacher' && lesson.course_code != '' && lesson.class != '' && lesson.room != '') {
                lessonString = lesson.course_code + '<br />' + lesson.class + '<br />' + lesson.room;
            }

        }

        return lessonString;
    }
}
