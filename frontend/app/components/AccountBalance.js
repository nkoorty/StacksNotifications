import { useEffect, useState } from 'react';
import { StacksMainnet } from '@stacks/network';
import { createStacksBlockchainApiClient } from '@stacks/blockchain-api-client';

const AccountBalance = ({ accountAddress }) => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const network = new StacksMainnet();
        const client = createStacksBlockchainApiClient(network);

        const accountInfo = await client.accountsApi.getAccountBalance({
          principal: accountAddress,
        });

        setBalance(accountInfo.balance);
      } catch (e) {
        setError('Failed to fetch account balance');
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [accountAddress]);

  if (loading) return <div>Loading account balance...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Account Balance</h2>
      <p>Address: {accountAddress}</p>
      <p>Balance: {balance} microStacks</p>
    </div>
  );
};

export default AccountBalance;
