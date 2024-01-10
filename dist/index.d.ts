export declare enum IncrementUnit {
    Hours = "hours",
    Minutes = "minutes",
    Seconds = "seconds"
}
export interface Interval {
    startTime: Date;
    endTime: Date;
}
export interface ScheduleItem {
    startTime: Date;
    endTime: Date;
    isBooked: boolean;
}
export interface SchedulerOptions {
    start: Date;
    end: Date;
    increment: number;
    incrementUnit: IncrementUnit;
    bookings?: Interval[];
    maxBookings?: number;
}
export declare const addTime: (date: Date, increment: number, unit: IncrementUnit) => Date;
export declare const createSchedule: (options: SchedulerOptions) => ScheduleItem[];
