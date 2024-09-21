"use client";
import Image from "next/image";
import { useAccount } from "wagmi";
import { formatEther } from "viem";

import { useProvider } from "@/provider/Provider";
import { formatBalance } from "@/utils/formatBalance";

import ETH from "@/public/eth.jpeg";
import Illustration from "@/public/illustrations/illustration.png";
import Illustration3 from "@/public/illustrations/illustration3.png";
import Illustration4 from "@/public/illustrations/illustration4.png";

export const Stats = () => {
  const { balance, stackedBalance } = useProvider();
  const { isConnected, address } = useAccount();
  return (
    <>
      {isConnected && (
        <div className="absolute top-[10%] w-full flex flex-col items-center justify-center space-y-6">
          <div className="w-full flex items-center justify-center space-x-4">
            <div className="aspect-square bg-white rounded-[60px] h-[35vh] relative flex items-center justify-between flex-col py-8">
              <Image
                src={Illustration3}
                alt="Illustration"
                className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-[52%] w-64"
              />
              <h1 className="text-2xl font-bold italic">Balance</h1>
              <h1 className="text-4xl font-black text-secondary">
                {balance ? formatBalance(balance) : "--.--"}
                <span className="text-2xl font-bold"> ETH</span>
              </h1>
            </div>
            <div className="aspect-square bg-white rounded-[60px] h-[35vh] relative flex items-center justify-between flex-col py-8">
              <Image
                src={Illustration}
                alt="Illustration"
                className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-[52%] w-64"
              />
              <h1 className="text-2xl font-bold italic">Staked</h1>
              <h1 className="text-4xl font-black text-secondary">
                {stackedBalance
                  ? formatBalance(formatEther(stackedBalance))
                  : "--.--"}
                <span className="text-2xl font-bold"> ETH</span>
              </h1>
            </div>
            <div className="aspect-square bg-white rounded-[60px] h-[35vh] relative flex items-center justify-between flex-col py-8">
              <Image
                src={Illustration4}
                alt="Illustration"
                className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-[52%] w-64"
              />
              <h1 className="text-2xl font-bold italic">APY</h1>
              <h1 className="text-4xl font-black text-secondary">
                10
                <span className="text-2xl font-bold"> %</span>
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
