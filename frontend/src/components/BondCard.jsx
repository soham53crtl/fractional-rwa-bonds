import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { BOND_CONTRACT_ADDRESS, BOND_ABI } from '../constants';

const BondCard = () => {
  const { address, isConnected } = useAccount();
  const [liveBalance, setLiveBalance] = useState(0);

  const { data: principal } = useReadContract({
    address: BOND_CONTRACT_ADDRESS, abi: BOND_ABI,
    functionName: 'principalBalance', args: [address],
  });

  const { data: lastUpdate } = useReadContract({
    address: BOND_CONTRACT_ADDRESS, abi: BOND_ABI,
    functionName: 'lastUpdate', args: [address],
  });

  useEffect(() => {
    if (!principal || !lastUpdate || principal === 0n) {
      setLiveBalance(0); return;
    }
    const p = parseFloat(formatUnits(principal, 18));
    const t0 = Number(lastUpdate);

    const timer = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const elapsed = now - t0;
      const accrued = (p * 0.052 * elapsed) / 31536000; // 5.2% APY
      setLiveBalance(p + accrued);
    }, 50);
    return () => clearInterval(timer);
  }, [principal, lastUpdate]);

  return (
    <div className="glass-card p-10 rounded-[40px] border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl" />
      <h3 className="text-blue-400 text-xs font-black uppercase tracking-widest mb-2">Current Bond Value</h3>
      <p className="text-6xl font-mono font-bold text-white tracking-tighter">
        ${isConnected ? liveBalance.toFixed(8) : "0.00000000"}
      </p>
      <div className="mt-8 flex gap-3">
        <span className="px-3 py-1 bg-white/5 rounded-lg text-xs font-bold text-slate-400">APY: 5.2%</span>
        <span className="px-3 py-1 bg-white/5 rounded-lg text-xs font-bold text-slate-400">Backed by US-T</span>
      </div>
    </div>
  );
};

export default BondCard;