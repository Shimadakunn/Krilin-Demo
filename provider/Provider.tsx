"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  useConnect,
  useAccount,
  useReadContract,
  useDisconnect,
  useSendTransaction,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { getBalance } from "@wagmi/core";
import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  ERC20_ABI,
  STAKED_ETH_ADDRESS,
  config,
} from "@/config";

function useProviderHook() {
  const { isConnected, address } = useAccount();

  const [increment, setIncrement] = useState<number>(0);
  const [balance, setBalance] = useState<any>(null);
  const [stackedBalance, setStackedBalance] = useState<any>(null);
  const [rate, setRate] = useState<any>(null);

  const refreshBalance = useCallback(() => {
    setIncrement((prev) => prev + 1);
  }, []);

  const { data: stackedB, refetch: refetchStackedBalance } = useReadContract({
    address: STAKED_ETH_ADDRESS,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [address!],
  });

  const fetchRate = useCallback(async () => {
    try {
      const price = await fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD`
      );
      if (!price.ok) {
        throw new Error(`HTTP error! status: ${price.status}`);
      }
      const priceData = await price.json();
      setRate(priceData.USD);
      console.log("rate", priceData.USD);
    } catch (error) {
      console.error("Failed to fetch rate:", error);
    }
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      getBalance(config, {
        address: address!,
      }).then((balance) => {
        setBalance(balance.formatted);
      });

      if (stackedB) {
        setStackedBalance(stackedB);
        console.log("stacked", stackedB);
      }
      fetchRate();
    }
  }, [isConnected, address, stackedB, fetchRate, increment]);

  useEffect(() => {
    if (isConnected && address) {
      refetchStackedBalance();
    }
  }, [isConnected, address, increment, refetchStackedBalance]);

  return {
    balance,
    stackedBalance,
    rate,
    refreshBalance,
  };
}

type useProviderHook = ReturnType<typeof useProviderHook>;
const ProviderContext = createContext<useProviderHook | null>(null);

export const useProvider = (): useProviderHook => {
  const context = useContext(ProviderContext);
  if (!context) {
    throw new Error("useProviderHook must be used within a ProviderContext");
  }
  return context;
};

export function Provider({ children }: { children: React.ReactNode }) {
  const hook = useProviderHook();
  return (
    <ProviderContext.Provider value={hook}>{children}</ProviderContext.Provider>
  );
}
