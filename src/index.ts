export enum IncrementUnit {
  Hours = "hours",
  Minutes = "minutes",
  Seconds = "seconds",
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

export const addTime = (date: Date, increment: number, unit: IncrementUnit): Date => {
  const result = new Date(date);
  switch (unit) {
    case IncrementUnit.Hours:
      result.setHours(result.getHours() + increment);
      break;
    case IncrementUnit.Minutes:
      result.setMinutes(result.getMinutes() + increment);
      break;
    case IncrementUnit.Seconds:
      result.setSeconds(result.getSeconds() + increment);
      break;
  }
  return result;
};

export const createSchedule = (options: SchedulerOptions): ScheduleItem[] => {
  const { start, end, increment, incrementUnit, bookings = [], maxBookings = 1 } = options;
  const schedule: ScheduleItem[] = [];
  let currentTime = new Date(start);

  while (true) {
    const endTime = addTime(currentTime, increment, incrementUnit);
    if (endTime > end) break;

    const overlappingBookings = bookings.filter(
      booking => booking.startTime < endTime && currentTime < booking.endTime
    ).length;
    const isBooked = overlappingBookings >= maxBookings;

    schedule.push({ startTime: new Date(currentTime), endTime, isBooked });

    currentTime = endTime;
  }

  return schedule;
};
