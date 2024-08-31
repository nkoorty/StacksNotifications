export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Simulate fetching events from the blockchain
        const events = [
            { id: 1, type: 'transaction', description: 'New transaction detected' },
            { id: 2, type: 'state-change', description: 'Contract state has changed' },
        ];
        res.status(200).json({ success: true, events });
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
