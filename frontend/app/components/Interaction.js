import { useEffect, useState } from 'react';
import { StacksMainnet } from '@stacks/network';
import { createStacksBlockchainApiClient } from '@stacks/blockchain-api-client';

const SmartContractInteractions = ({ contractAddress }) => {
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const network = new StacksMainnet();
        const client = createStacksBlockchainApiClient(network);

        const transactions = await client.transactionsApi.getAddressTransactions({
          principal: contractAddress,
          limit: 50,
        });

        const interactions = transactions.results.map((tx) => ({
          txId: tx.tx_id,
          timestamp: tx.burn_block_time_iso,
          sender: tx.sender_address,
        }));

        setInteractions(interactions);
      } catch (e) {
        setError('Failed to fetch interactions');
      } finally {
        setLoading(false);
      }
    };

    fetchInteractions();
  }, [contractAddress]);

  if (loading) return <div>Loading interactions...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Recent Interactions with Contract</h2>
      <ul>
        {interactions.map((interaction) => (
          <li key={interaction.txId}>
            Tx ID: {interaction.txId}, Sender: {interaction.sender}, Time: {new Date(interaction.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SmartContractInteractions;
