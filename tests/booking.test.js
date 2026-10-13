import test from 'node:test';
import assert from 'node:assert/strict';
import { initialSalons } from '../src/data.js';
import { availableStaff, getSlots, totals } from '../src/booking.js';
const salon = initialSalons[0];
const base = { salon, date: '2030-06-03', serviceIds: ['cut'], staffId: 'mia', bookings: [], now: new Date('2030-06-01T10:00:00') };
test('combined services sum duration and price', () => assert.deepEqual(totals(salon, ['cut', 'wash', 'style']), { duration: 60, price: 60 }));
test('60-minute service is rejected when only 30 minutes remain before a booking', () => {
  const bookings = [{ salonId: salon.id, staffId: 'mia', date: base.date, start: 660, duration: 30, status: 'confirmed' }];
  assert.equal(availableStaff({ ...base, bookings, start: 630 }).length, 1);
  assert.equal(availableStaff({ ...base, bookings, start: 630, serviceIds: ['cut', 'wash', 'style'] }).length, 0);
});
test('appointments ending exactly at another appointment start are allowed', () => {
  const bookings = [{ salonId: salon.id, staffId: 'mia', date: base.date, start: 660, duration: 30, status: 'confirmed' }];
  assert.equal(availableStaff({ ...base, bookings, start: 630 }).length, 1);
  assert.equal(availableStaff({ ...base, bookings, start: 645 }).length, 0);
  assert.equal(availableStaff({ ...base, bookings, start: 690 }).length, 1);
});
test('any staff finds one person available for the entire duration', () => {
  const staff = availableStaff({ ...base, staffId: 'any', start: 600, serviceIds: ['cut', 'wash', 'style'] });
  assert.deepEqual(staff.map(p => p.id), ['mia', 'nora']);
});
test('employee must offer every selected service', () => {
  assert.equal(availableStaff({ ...base, staffId: 'nora', start: 540, serviceIds: ['color'] }).length, 0);
  assert.ok(availableStaff({ ...base, staffId: 'any', start: 540, serviceIds: ['color'] }).every(p => p.id !== 'nora'));
});
test('pause blocks any overlapping service', () => {
  assert.equal(availableStaff({ ...base, start: 705 }).length, 0);
  assert.equal(availableStaff({ ...base, start: 765 }).length, 1);
});
test('closing time, Sundays, past days and empty selection reject booking', () => {
  assert.equal(availableStaff({ ...base, start: 1065 }).length, 0);
  assert.equal(availableStaff({ ...base, date: '2030-06-02', start: 600 }).length, 0);
  assert.equal(availableStaff({ ...base, date: '2030-05-31', start: 600 }).length, 0);
  assert.equal(availableStaff({ ...base, serviceIds: [], start: 600 }).length, 0);
});
test('cancellation frees the reserved time', () => {
  const booking = { salonId: salon.id, staffId: 'mia', date: base.date, start: 540, duration: 60, status: 'confirmed' };
  assert.equal(availableStaff({ ...base, start: 540, bookings: [booking] }).length, 0);
  assert.equal(availableStaff({ ...base, start: 540, bookings: [{ ...booking, status: 'cancelled' }] }).length, 1);
});
test('current day only offers future starts', () => {
  const options = { ...base, date: '2030-06-03', now: new Date('2030-06-03T09:10:00') };
  assert.equal(availableStaff({ ...options, start: 540 }).length, 0);
  assert.equal(getSlots(options)[0].start, 555);
});
test('unknown service cannot produce a valid booking', () => assert.equal(availableStaff({ ...base, start: 540, serviceIds: ['cut', 'unknown'] }).length, 0));
