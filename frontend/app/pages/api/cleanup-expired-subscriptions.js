import { callPublicFunction } from '@stacks/transactions';
import { StacksTestnet } from '@stacks/network';

export default async function handler(req, res) {
  const { contractAddress } = req.body;
  const network = new StacksTestnet();

  const options = {
    contractAddress,
    contractName: 'EventSubscription',
    functionName: 'cleanup-expired-subscriptions',
    network,
  };

  try {
    await callPublicFunction(options);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error cleaning up expired subscriptions:', error);
    res.status(500).json({ error: 'Error cleaning up expired subscriptions' });
  }
}
