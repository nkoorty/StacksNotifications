'use client';

import { useState, useEffect } from 'react';
import { StacksNetwork, StacksTestnet, StacksMainnet } from '@stacks/network';
import { callReadOnlyFunction, bufferCV } from '@stacks/transactions';

export function useStacks() {
  const [network, setNetwork] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const connectToStacks = async () => {
      try {
        // Choose network type: StacksTestnet or StacksMainnet
        const network = new StacksTestnet();
        setNetwork(network);
      } catch (err) {
        setError(err.message);
      }
    };

    connectToStacks();

    return () => {
      setNetwork(null);
    };
  }, []);

  const callContract = async (contractAddress, contractName, functionName, functionArgs) => {
    try {
      const result = await callReadOnlyFunction({
        contractAddress,
        contractName,
        functionName,
        functionArgs: functionArgs.map(arg => bufferCV(arg)),
        network,
      });
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { network, callContract, error };
}
