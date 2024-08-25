import { connectToStacksBlockchain } from './stacks';

export const getHistoricalEvents = async (contractAddress) => {
  const client = connectToStacksBlockchain();
  const events = await client.getEventsByContractAddress(contractAddress);

  return events.map(event => ({
    eventType: event.type,
    sender: event.sender,
    timestamp: event.timestamp,
  }));
};
