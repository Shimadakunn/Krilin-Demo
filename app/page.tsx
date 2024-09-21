"use client";
import Head from "next/head";
import HandGestureControl from "../components/HandTracking";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/config";

import { Provider } from "@/provider/Provider";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hand Gesture Control</title>
        <meta
          name="description"
          content="Control your cursor with hand gestures"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <Provider>
              <HandGestureControl />
            </Provider>
          </QueryClientProvider>
        </WagmiProvider>
      </main>
    </div>
  );
}
