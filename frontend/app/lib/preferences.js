import { connectToDatabase } from './mongodb';

export const saveUserPreferences = async (preferences) => {
  const db = await connectToDatabase();
  const collection = db.collection('userPreferences');

  const { email, frequency, eventType } = preferences;

  try {
    await collection.updateOne(
      { email: email },
      {
        $set: {
          frequency: frequency,
          eventType: eventType,
        },
      },
      { upsert: true }
    );
    return true;
  } catch (error) {
    console.error('Error saving preferences:', error);
    throw new Error('Database error');
  }
};
