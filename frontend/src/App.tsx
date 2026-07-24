import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Plane } from 'lucide-react';
import { VoucherForm } from './components/VoucherForm';
import { ErrorMessage } from './components/ErrorMessage';
import { VoucherResult } from './components/VoucherResult';
import type { FormInputs } from './types';
import type { SubmitHandler } from 'react-hook-form';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

function App() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [generatedSeats, setGeneratedSeats] = useState<string[] | null>(null);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setLoading(true);
    setErrorMsg(null);
    setGeneratedSeats(null);
    
    try {
      const checkRes = await axios.post(`${API_BASE}/check`, {
        flightNumber: data.flightNumber,
        date: data.date
      });
      
      if (checkRes.data.exists) {
        setErrorMsg('Vouchers have already been generated for this flight and date.');
        setLoading(false);
        return;
      }

      const generateRes = await axios.post(`${API_BASE}/generate`, data);
      
      if (generateRes.data.success) {
        setGeneratedSeats(generateRes.data.seats);
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data?.error) {
        setErrorMsg(err.response.data.error);
      } else {
        setErrorMsg('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans text-slate-900 selection:bg-red-500/30 relative z-0">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-200/40 via-red-100/10 to-transparent -z-10" />

      <div className="relative max-w-4xl w-full group">
        <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500 to-orange-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-700" />
        
        <div className="relative bg-white border border-slate-100/50 rounded-3xl shadow-2xl">
          <div className="h-2 w-full rounded-t-3xl bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]" />
          
          <div className="p-5 sm:p-8 pb-5 sm:pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-red-600 to-orange-500 rounded-xl shadow-lg shadow-red-500/30">
                <Plane size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Voucher Seats</h1>
                <p className="text-xs text-red-600 font-bold tracking-widest uppercase mt-1">Airlines</p>
              </div>
            </div>
          </div>
          
          <div className="p-5 sm:p-8 flex flex-col md:flex-row gap-8 md:gap-16 justify-between">
            <div className="flex-1">
              <VoucherForm onSubmit={onSubmit} loading={loading} />
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-start border-t md:border-t-0 md:border-l border-slate-100 pt-8 md:pt-0 md:pl-16">
              {errorMsg ? (
                <ErrorMessage message={errorMsg} />
              ) : generatedSeats ? (
                <VoucherResult seats={generatedSeats} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-8 w-full">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 border border-slate-100 mx-auto">
                    <Plane size={24} className="text-slate-300 opacity-50" />
                  </div>
                  <p className="font-medium text-sm">Submit the form to generate<br/>voucher seats</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
