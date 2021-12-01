import { EVENTS_URL } from "../firebase-config";

export async function getAllEvents() {
  const events = await fetch(EVENTS_URL).then((resp) => resp.json());
  return Object.keys(events || {}).map((eventId) => ({
    id: eventId,
    ...events[eventId],
  }));
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => !!event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
}
