import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Landmark, ShieldCheck, ArrowUpRight, Activity, TrendingUp } from 'lucide-react';
import BondCard from './components/BondCard';
import InvestForm from './components/InvestForm';
import ProofOfReserve from './components/ProofOfReserve';

function App() {
  const [isPoROpen, setIsPoROpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-6 sm:p-12 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />

      <nav className="max-w-6xl mx-auto flex justify-between items-center mb-16">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Landmark size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase">Treasury<span className="text-blue-500">Go</span></span>
        </div>
        <ConnectButton showBalance={false} chainStatus="icon" />
      </nav>

      <main className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <BondCard />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-3xl border border-white/5">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-2">
                <Activity size={14} /> Network Status
              </div>
              <p className="text-lg font-semibold">Polygon Amoy</p>
              <div className="flex items-center gap-2 mt-1 text-green-400 text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Fully Operational
              </div>
            </div>
            <div className="glass-card p-6 rounded-3xl border border-white/5">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-2">
                <TrendingUp size={14} /> Transparency
              </div>
              <button onClick={() => setIsPoROpen(true)} className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors">
                Proof of Reserve <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <InvestForm />
        </div>
      </main>

      <ProofOfReserve isOpen={isPoROpen} onClose={() => setIsPoROpen(false)} />
    </div>
  );
}

export default App;