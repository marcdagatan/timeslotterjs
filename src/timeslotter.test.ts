import { createSchedule, IncrementUnit, SchedulerOptions, Interval } from './index';

describe('TimeSlotterJS Scheduler', () => {
  const baseDate = new Date(2024, 0, 1, 8); // January 1, 2024, 08:00 AM

  const createTestOptions = (
    increment: number, 
    unit: IncrementUnit, 
    duration: number, 
    bookings: Interval[] = [], 
    maxBookings: number = 1
  ): SchedulerOptions => ({
    start: baseDate,
    end: new Date(baseDate.getTime() + duration * (unit === IncrementUnit.Hours ? 3600000 : unit === IncrementUnit.Minutes ? 60000 : 1000)),
    increment,
    incrementUnit: unit,
    bookings,
    maxBookings
  });

  test('creates a schedule with hourly increments', () => {
    const schedule = createSchedule(createTestOptions(1, IncrementUnit.Hours, 4));
    expect(schedule.length).toBe(4);
  });

  test('creates a schedule with minute increments', () => {
    const schedule = createSchedule(createTestOptions(30, IncrementUnit.Minutes, 120));
    expect(schedule.length).toBe(4);
  });

  test('creates a schedule with second increments', () => {
    const schedule = createSchedule(createTestOptions(30, IncrementUnit.Seconds, 120));
    expect(schedule.length).toBe(4);
  });

  test('marks times as booked based on single booking', () => {
    const bookings = [{ startTime: baseDate, endTime: new Date(baseDate.getTime() + 3600000) }];
    const schedule = createSchedule(createTestOptions(1, IncrementUnit.Hours, 2, bookings));
    expect(schedule[0].isBooked).toBeTruthy();
    expect(schedule[1].isBooked).toBeFalsy();
  });

  test('identifies overlapping appointments correctly', () => {
    const bookings = [
      { startTime: new Date(baseDate.getTime() + 3600000), endTime: new Date(baseDate.getTime() + 7200000) },
      { startTime: new Date(baseDate.getTime() + 3600000), endTime: new Date(baseDate.getTime() + 10800000) }
    ];
    const schedule = createSchedule(createTestOptions(1, IncrementUnit.Hours, 3, bookings));
    expect(schedule[1].isBooked).toBeTruthy();
    expect(schedule[2].isBooked).toBeTruthy();
  });

  test('respects maximum bookings per slot', () => {
    const bookings = [
      { startTime: baseDate, endTime: new Date(baseDate.getTime() + 3600000) }, // Overlaps with first slot
      { startTime: new Date(baseDate.getTime() + 7200000), endTime: new Date(baseDate.getTime() + 10800000) } // Does not overlap with second slot
    ];
    const schedule = createSchedule(createTestOptions(1, IncrementUnit.Hours, 2, bookings, 1));
    expect(schedule[0].isBooked).toBeTruthy();
    expect(schedule[1].isBooked).toBeFalsy();
  });
});