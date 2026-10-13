export const timeLabel = minutes => `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
export function dateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function parseDate(key) { return new Date(`${key}T12:00:00`); }
export function totals(salon, serviceIds) {
  return salon.services.filter(service => serviceIds.includes(service.id)).reduce((sum, service) => ({ duration: sum.duration + service.duration, price: sum.price + service.price }), { duration: 0, price: 0 });
}
export function demoBlocks(salon, date, staffId) {
  const index = salon.staff.findIndex(person => person.id === staffId);
  return [
    { start: 12 * 60, duration: 45, type: 'Pause' },
    { start: (index % 2 ? 10 : 14) * 60, duration: 60, type: 'Beispieltermin' },
  ];
}
export function availableStaff({ salon, date, start, serviceIds, staffId = 'any', bookings = [], now = new Date() }) {
  const { duration } = totals(salon, serviceIds);
  if (!duration || serviceIds.some(id => !salon.services.some(service => service.id === id))) return [];
  if (parseDate(date).getDay() === 0 || date < dateKey(now)) return [];
  if (start < salon.hours.start || start + duration > salon.hours.end) return [];
  if (date === dateKey(now) && start <= now.getHours() * 60 + now.getMinutes()) return [];
  return salon.staff.filter(person => {
    if (staffId !== 'any' && person.id !== staffId) return false;
    if (!serviceIds.every(id => person.services.includes(id))) return false;
    const blocks = [...demoBlocks(salon, date, person.id), ...bookings.filter(b => b.salonId === salon.id && b.staffId === person.id && b.date === date && b.status !== 'cancelled')];
    return !blocks.some(block => start < block.start + block.duration && start + duration > block.start);
  });
}
export function getSlots(options) {
  const slots = [];
  for (let start = options.salon.hours.start; start < options.salon.hours.end; start += 15) {
    const staff = availableStaff({ ...options, start });
    if (staff.length) slots.push({ start, staff });
  }
  return slots;
}
