"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe("TimeSlotterJS Scheduler", () => {
    // Base date for all tests - January 1, 2024, 08:00 AM
    const baseDate = new Date(2024, 0, 1, 8);
    // Helper function to create SchedulerOptions for tests
    const createTestOptions = (increment, unit, duration, bookings = [], maxBookings = 1) => ({
        start: baseDate,
        end: new Date(baseDate.getTime() +
            duration * (unit === index_1.IncrementUnit.Hours ? 3600000 : unit === index_1.IncrementUnit.Minutes ? 60000 : 1000)),
        increment,
        incrementUnit: unit,
        bookings,
        maxBookings,
    });
    test("creates a schedule with hourly increments", () => {
        const schedule = (0, index_1.createSchedule)(createTestOptions(1, index_1.IncrementUnit.Hours, 4));
        expect(schedule.length).toBe(4); // Expect 4 slots for 4 hours
    });
    test("creates a schedule with minute increments", () => {
        const schedule = (0, index_1.createSchedule)(createTestOptions(30, index_1.IncrementUnit.Minutes, 120));
        expect(schedule.length).toBe(4); // Expect 4 slots for 2 hours with 30 minutes each
    });
    test("creates a schedule with second increments", () => {
        const schedule = (0, index_1.createSchedule)(createTestOptions(30, index_1.IncrementUnit.Seconds, 120));
        expect(schedule.length).toBe(4); // Expect 4 slots for 120 seconds with 30 seconds each
    });
    test("marks times as booked based on single booking", () => {
        const bookings = [{ startTime: baseDate, endTime: new Date(baseDate.getTime() + 3600000) }];
        const schedule = (0, index_1.createSchedule)(createTestOptions(1, index_1.IncrementUnit.Hours, 2, bookings));
        expect(schedule[0].isBooked).toBeTruthy(); // First slot should be booked
        expect(schedule[1].isBooked).toBeFalsy(); // Second slot should be free
    });
    test("identifies overlapping appointments correctly", () => {
        const bookings = [
            { startTime: new Date(baseDate.getTime() + 3600000), endTime: new Date(baseDate.getTime() + 7200000) },
            { startTime: new Date(baseDate.getTime() + 3600000), endTime: new Date(baseDate.getTime() + 10800000) },
        ];
        const schedule = (0, index_1.createSchedule)(createTestOptions(1, index_1.IncrementUnit.Hours, 3, bookings));
        expect(schedule[1].isBooked).toBeTruthy(); // Second slot overlaps and should be booked
        expect(schedule[2].isBooked).toBeTruthy(); // Third slot overlaps and should be booked
    });
    test("respects single booking per slot when maxBookings is 1", () => {
        const bookings = [
            { startTime: baseDate, endTime: new Date(baseDate.getTime() + 3600000) },
            { startTime: baseDate, endTime: new Date(baseDate.getTime() + 3600000) },
        ];
        const schedule = (0, index_1.createSchedule)(createTestOptions(1, index_1.IncrementUnit.Hours, 2, bookings, 1));
        expect(schedule[0].isBooked).toBeTruthy(); // First slot should be booked as it overlaps with two bookings
        expect(schedule[1].isBooked).toBeFalsy(); // Second slot should be free as it has no bookings
    });
    test("allows multiple bookings per slot when maxBookings is greater than 1", () => {
        const bookings = [
            { startTime: baseDate, endTime: new Date(baseDate.getTime() + 3600000) },
            { startTime: baseDate, endTime: new Date(baseDate.getTime() + 3600000) },
        ];
        const schedule = (0, index_1.createSchedule)(createTestOptions(1, index_1.IncrementUnit.Hours, 2, bookings, 2));
        expect(schedule[0].isBooked).toBeTruthy(); // First slot should be booked as it only allows up to 2 bookings
        expect(schedule[1].isBooked).toBeFalsy(); // Second slot should be free as it has no bookings
    });
});
