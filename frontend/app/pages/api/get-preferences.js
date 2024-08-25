import { getUserPreferences } from '../../lib/preferences';

export default async function handler(req, res) {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const preferences = await getUserPreferences(email);
    if (!preferences) {
      return res.status(404).json({ message: 'Preferences not found.' });
    }
    return res.status(200).json(preferences);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve preferences.' });
  }
}
