export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { user, preferences } = req.body;

        // Simulate saving user preferences
        console.log(`Saving preferences for user: ${user}`);
        console.log(`Preferences: ${JSON.stringify(preferences)}`);

        res.status(200).json({ success: true, message: 'Preferences saved successfully' });
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
