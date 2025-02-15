"use client";
import { useAccount } from "wagmi";
import '@reown/appkit/react';

export default function Wallet() {
  const { isConnected } = useAccount();
  return (
    <div className="flex items-center gap-2">
      {/* @ts-ignore */}
      <appkit-button />
      {/* @ts-ignore */}
      {isConnected && <appkit-network-button />}
    </div>
  );
}