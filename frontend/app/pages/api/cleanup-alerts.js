export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Simulate cleaning up expired events
        console.log('Cleaning up expired events...');

        // Dummy logic to "clean up" expired events
        const cleanedEvents = [
            { id: 1, type: 'transaction', status: 'expired' },
            { id: 2, type: 'state-change', status: 'expired' },
        ];

        res.status(200).json({ success: true, message: 'Expired events cleaned up successfully', cleanedEvents });
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
