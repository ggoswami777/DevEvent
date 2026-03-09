if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Database models exports
export { default as Event } from './event.model';
export { default as Booking } from './booking.model';

// TypeScript interfaces exports
export type { IEvent } from './event.model';
export type { IBooking } from './booking.model';