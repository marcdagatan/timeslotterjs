"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchedule = exports.addTime = exports.IncrementUnit = void 0;
var IncrementUnit;
(function (IncrementUnit) {
    IncrementUnit["Hours"] = "hours";
    IncrementUnit["Minutes"] = "minutes";
    IncrementUnit["Seconds"] = "seconds";
})(IncrementUnit || (exports.IncrementUnit = IncrementUnit = {}));
const addTime = (date, increment, unit) => {
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
exports.addTime = addTime;
const createSchedule = (options) => {
    const { start, end, increment, incrementUnit, bookings = [], maxBookings = 1 } = options;
    const schedule = [];
    let currentTime = new Date(start);
    while (true) {
        const endTime = (0, exports.addTime)(currentTime, increment, incrementUnit);
        if (endTime > end)
            break;
        const overlappingBookings = bookings.filter(booking => booking.startTime < endTime && currentTime < booking.endTime).length;
        const isBooked = overlappingBookings >= maxBookings;
        schedule.push({ startTime: new Date(currentTime), endTime, isBooked });
        currentTime = endTime;
    }
    return schedule;
};
exports.createSchedule = createSchedule;
