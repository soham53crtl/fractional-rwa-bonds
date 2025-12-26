import React from 'react';
import { ShieldCheck, Lock, Landmark } from 'lucide-react';

export default function ProofOfReserve({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="glass-card w-full max-w-md p-8 rounded-[40px] border border-blue-500/30">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400"><ShieldCheck size={28} /></div>
          <button onClick={onClose} className="text-slate-500 hover:text-white">✕</button>
        </div>
        <h2 className="text-2xl font-bold mb-6 tracking-tight">Reserve Audit</h2>
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">On-Chain Supply</p>
            <p className="text-lg font-mono">1,250,000.00 <span className="text-sm">mUSDC</span></p>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Off-Chain Reserve</p>
            <p className="text-lg font-mono text-green-400">$1,250,450.00 <span className="text-sm">USD</span></p>
          </div>
        </div>
        <button onClick={onClose} className="w-full mt-8 py-4 bg-white text-black font-bold rounded-2xl">Verified</button>
      </div>
    </div>
  );
}