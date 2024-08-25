import { callReadOnlyFunction } from '@stacks/transactions';
import { StacksTestnet } from '@stacks/network';

export default async function handler(req, res) {
  const { contractAddress } = req.query;

  const network = new StacksTestnet();
  const options = {
    contractAddress,
    contractName: 'EventNotifier',
    functionName: 'get-event-log',
    functionArgs: [],
    network,
    senderAddress: contractAddress,
  };

  try {
    const response = await callReadOnlyFunction(options);
    const eventLog = JSON.parse(response.result);

    res.status(200).json({ eventLog });
  } catch (error) {
    console.error('Error fetching event log:', error);
    res.status(500).json({ error: 'Error fetching event log' });
  }
}
