import cron from 'node-cron';

export default function handler(req, res) {
    // Schedule a cron job to run every day at midnight
    cron.schedule('0 0 * * *', () => {
        console.log('Running scheduled task: Cleaning up expired events');
        
    });

    res.status(200).json({ success: true, message: 'Event scheduling initialized' });
}
