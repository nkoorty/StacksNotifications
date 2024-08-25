import { connectToDatabase } from './mongodb';

export const saveUserPreferences = async (preferences) => {
  const db = await connectToDatabase();
  const collection = db.collection('userPreferences');

  const { email, frequency, eventType } = preferences;

  return await collection.updateOne(
    { email: email },
    {
      $set: {
        frequency: frequency,
        eventType: eventType,
      },
    },
    { upsert: true }
  );
};

export const getUserPreferences = async (email) => {
  const db = await connectToDatabase();
  const collection = db.collection('userPreferences');

  return await collection.findOne({ email: email });
};
