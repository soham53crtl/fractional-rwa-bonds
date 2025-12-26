import React, { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { ExternalLink, Loader2 } from 'lucide-react';
import { BOND_CONTRACT_ADDRESS, BOND_ABI, STABLECOIN_ADDRESS, STABLECOIN_ABI } from '../constants';

const InvestForm = () => {
  const [amount, setAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [isSuccess]);

  const dailyYield = (parseFloat(amount || 0) * 0.052) / 365;

  const handleAction = (fn, addr, abi) => {
    writeContract({
      address: addr, abi: abi, functionName: fn,
      args: [fn === 'approve' ? BOND_CONTRACT_ADDRESS : parseUnits(amount, 18), parseUnits(amount, 18)]
    });
  };

  return (
    <div className="glass-card p-8 rounded-[32px] border border-white/5 space-y-4">
      <h2 className="text-xl font-bold">Manage Position</h2>
      <div className="relative">
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00"
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-xl font-mono outline-none focus:border-blue-500 transition-all" />
      </div>

      {amount > 0 && (
        <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
          <p className="text-xs text-blue-300 font-bold uppercase mb-1">Growth Projection</p>
          <p className="text-lg font-bold">+${dailyYield.toFixed(4)} <span className="text-xs text-slate-500 font-normal">/ day</span></p>
        </div>
      )}

      <div className="space-y-2">
        <button onClick={() => handleAction('approve', STABLECOIN_ADDRESS, STABLECOIN_ABI)} className="w-full py-3 bg-white/5 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">1. Approve mUSDC</button>
        <button onClick={() => handleAction('invest', BOND_CONTRACT_ADDRESS, BOND_ABI)} className="w-full py-4 bg-blue-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-500 transition-all">
          {(isPending || isConfirming) ? <Loader2 className="animate-spin" /> : "2. Invest Now"}
        </button>
      </div>

      {showSuccess && (
        <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-xl flex justify-between items-center animate-in zoom-in">
          <span className="text-xs font-bold text-green-400">Success!</span>
          <a href={`https://amoy.polygonscan.com/tx/${hash}`} target="_blank" className="text-[10px] text-slate-400 underline">Explorer <ExternalLink size={10} className="inline"/></a>
        </div>
      )}
    </div>
  );
};

export default InvestForm;