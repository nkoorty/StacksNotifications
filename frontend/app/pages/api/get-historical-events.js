import { getHistoricalEvents } from '../../lib/blockchain';

export default async function handler(req, res) {
  const { contract } = req.query;

  if (!contract) {
    return res.status(400).json({ message: 'Contract address is required.' });
  }

  try {
    const events = await getHistoricalEvents(contract);
    if (!events || events.length === 0) {
      return res.status(404).json({ message: 'No events found for this contract.' });
    }
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve events.' });
  }
}
