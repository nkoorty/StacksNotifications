export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Simulate fetching historical events
        const historicalEvents = [
            { id: 1, timestamp: '2024-08-01T10:00:00Z', type: 'transaction', description: 'Transaction processed' },
            { id: 2, timestamp: '2024-08-02T14:00:00Z', type: 'state-change', description: 'Contract updated' },
        ];
        res.status(200).json({ success: true, historicalEvents });
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
