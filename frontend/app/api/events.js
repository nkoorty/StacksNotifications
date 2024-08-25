import { getEventsByType, getEventsBySender, getEventsByTypeAndSender } from '../../lib/blockchain';

export default async function handler(req, res) {
  const { type, sender } = req.query;

  let events = [];

  if (type && sender) {
    events = await getEventsByTypeAndSender(type, sender);
  } else if (type) {
    events = await getEventsByType(type);
  } else if (sender) {
    events = await getEventsBySender(sender);
  } else {
    events = await getAllEvents(); // fallback if no filter is provided
  }

  res.status(200).json(events);
}
