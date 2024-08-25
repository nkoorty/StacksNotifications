import { saveUserPreferences } from '../../lib/preferences';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, frequency, eventType } = req.body;

    if (!email || !frequency || !eventType) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      await saveUserPreferences(req.body);
      return res.status(200).json({ message: 'Preferences saved successfully.' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to save preferences.' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed.' });
  }
}
