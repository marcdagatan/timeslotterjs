# TimeSlotterJS 🕒✨

TimeSlotterJS: A simple yet powerful tool for effortless time slot management. Perfect for scheduling appointments or organizing your day with ease!

## Installation

```bash
npm install timeslotterjs
```

## Usage

TimeSlotterJS is as intuitive as it gets. Here's how to use it:

```js
import { createSchedule, IncrementUnit } from "timeslotterjs";

// Planning a simple day
const dailySchedule = createSchedule({
  start: new Date("2024-01-01T08:00:00"),
  end: new Date("2024-01-01T17:00:00"),
  increment: 1,
  incrementUnit: IncrementUnit.Hours,
});

console.log("Available Time Slots:", dailySchedule);

// OUTPUT:
// [
//   { "startTime": "2024-01-01T08:00:00.000Z", "endTime": "2024-01-01T09:00:00.000Z", "isBooked": false },
//   { "startTime": "2024-01-01T09:00:00.000Z", "endTime": "2024-01-01T10:00:00.000Z", "isBooked": false },
//   // More time slots...
// ]
```

## Options Overview

Here's a breakdown of the options you can use with TimeSlotterJS:

| Option          | Type                         | Description                                                                                                               |
| --------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `start`         | `Date`                       | The start time of your schedule.                                                                                          |
| `end`           | `Date`                       | The end time of your schedule.                                                                                            |
| `increment`     | `number`                     | The duration of each time slot.                                                                                           |
| `incrementUnit` | `IncrementUnit` (enum)       | The unit for the increment (Hours, Minutes, Seconds).                                                                     |
| `bookings`      | `Array<Interval>` (optional) | An array of existing bookings/appointments. Each booking is an object with `startTime` and `endTime` (both `Date` types). |
| `maxBookings`   | `number` (optional)          | The maximum number of bookings allowed per slot (defaults to 1).                                                          |

## Output

Here's what a typical output looks like:

| Property    | Type      | Description                      |
| ----------- | --------- | -------------------------------- |
| `startTime` | `Date`    | Start time of the time slot.     |
| `endTime`   | `Date`    | End time of the time slot.       |
| `isBooked`  | `boolean` | Whether the time slot is booked. |

## More Examples

Handling Appointments

```js
import { createSchedule, IncrementUnit } from "timeslotterjs";

const appointments = [
  { startTime: new Date("2024-01-01T09:00:00"), endTime: new Date("2024-01-01T10:00:00") },
  // More appointments here...
];

// Schedule with existing appointments
const mySchedule = createSchedule({
  start: new Date("2024-01-01T08:00:00"),
  end: new Date("2024-01-01T17:00:00"),
  increment: 1,
  incrementUnit: IncrementUnit.Hours,
  bookings: appointments, // Your pre-booked appointments
});

console.log("My Scheduled Day:", mySchedule);
```

Customizing Maximum Bookings

```js
import { createSchedule, IncrementUnit } from "timeslotterjs";

// A busy day scenario
const busyDay = createSchedule({
  // ...your start, end, increment settings
  maxBookings: 3, // Allowing up to 3 bookings per slot
});

console.log("My Busy Day Schedule:", busyDay);
```

## Contributing

Got a cool idea to enhance TimeSlotterJS? Fork, branch, and pull request to contribute!

## License

TimeSlotterJS is released under the MIT License. Feel free to use and modify it as you like.

---

Here's to making bookings, appointments, and time management fun and efficient! 🎉⏱️
