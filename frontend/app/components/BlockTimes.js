import { useEffect, useState } from 'react';
import { StacksMainnet } from '@stacks/network';
import { createStacksBlockchainApiClient } from '@stacks/blockchain-api-client';

const BlockTime = () => {
  const [blockTimes, setBlockTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlockTimes = async () => {
      try {
        const network = new StacksMainnet();
        const client = createStacksBlockchainApiClient(network);

        const { results } = await client.blocksApi.getBlockList();
        const times = results.map((block) => ({
          block: block.height,
          time: block.burn_block_time_iso,
        }));

        setBlockTimes(times);
      } catch (e) {
        setError('Failed to fetch block times');
      } finally {
        setLoading(false);
      }
    };

    fetchBlockTimes();
  }, []);

  if (loading) return <div>Loading block times...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Recent Block Times</h2>
      <ul>
        {blockTimes.map((block) => (
          <li key={block.block}>
            Block {block.block}: {new Date(block.time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlockTime;
