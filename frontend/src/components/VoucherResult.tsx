import { CheckCircle2 } from 'lucide-react';

interface VoucherResultProps {
  seats: string[];
}

export function VoucherResult({ seats }: VoucherResultProps) {
  return (
    <div className="w-full bg-white border border-emerald-200/60 p-6 rounded-2xl flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 shadow-[0_10px_40px_rgba(16,185,129,0.1)] relative overflow-hidden">
      <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-500" />
      <CheckCircle2 className="text-emerald-500 mt-2" size={36} />
      <p className="font-bold text-slate-800 text-lg">Vouchers successfully generated!</p>
      <div className="flex flex-wrap justify-center gap-3 mt-1">
        {seats.map((seat, idx) => (
          <div key={idx} className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 text-slate-800 font-extrabold text-2xl py-3 px-6 rounded-xl shadow-sm">
            {seat}
          </div>
        ))}
      </div>
    </div>
  );
}
