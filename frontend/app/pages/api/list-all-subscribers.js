import { callReadOnlyFunction } from '@stacks/transactions';
import { StacksTestnet } from '@stacks/network';
import { stringAsciiCV } from '@stacks/transactions';

export default async function handler(req, res) {
  const { contractAddress, eventType } = req.query;
  const network = new StacksTestnet();

  const options = {
    contractAddress,
    contractName: 'EventSubscription',
    functionName: 'list-subscribers',
    functionArgs: [stringAsciiCV(eventType)],
    network,
  };

  try {
    const response = await callReadOnlyFunction(options);
    res.status(200).json({ subscriptions: response });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ error: 'Error fetching subscriptions' });
  }
}
