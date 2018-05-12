import { Injectable } from '@angular/core';
import Schedule from './models/schedule/schedule.model';
import Lesson from './models/schedule/lesson.model';

@Injectable()
export class ScheduleHelper {
    private schedule: Schedule;

    constructor(_schedule: Schedule) {
        this.schedule = _schedule;
    }

    public print(lesson: Lesson): string {
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
