import { useForm, type SubmitHandler } from 'react-hook-form';
import type { FormInputs } from '../types';
import { DatePicker } from './DatePicker';
import { SelectField } from './SelectField';


interface VoucherFormProps {
  onSubmit: SubmitHandler<FormInputs>;
  loading: boolean;
}

export function VoucherForm({ onSubmit, loading }: VoucherFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormInputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Crew Name</label>
        <input
          {...register("name", { required: "Crew Name is required" })}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
          placeholder="Enter crew name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1.5 ml-1 font-medium">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Crew ID</label>
        <input
          {...register("id", { required: "Crew ID is required" })}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
          placeholder="Enter crew ID"
        />
        {errors.id && <p className="text-red-500 text-sm mt-1.5 ml-1 font-medium">{errors.id.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Flight Number</label>
        <input
          {...register("flightNumber", { required: "Flight Number is required" })}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all uppercase"
          placeholder="e.g. GA102"
        />
        {errors.flightNumber && <p className="text-red-500 text-sm mt-1.5 ml-1 font-medium">{errors.flightNumber.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Flight Date</label>
        <input type="hidden" {...register("date", { required: "Flight Date is required" })} />
        <DatePicker setValue={setValue} watch={watch} error={errors.date?.message} />
        {errors.date && <p className="text-red-500 text-sm mt-1.5 ml-1 font-medium">{errors.date.message}</p>}
      </div>

      <div>
        <input type="hidden" {...register("aircraft", { required: "Aircraft Type is required" })} />
        <SelectField
          label="Aircraft Type"
          options={[
            { value: 'ATR', label: 'ATR (72 seats)' },
            { value: 'Airbus 320', label: 'Airbus 320 (180 seats)' },
            { value: 'Boeing 737 Max', label: 'Boeing 737 Max (200 seats)' }
          ]}
          value={watch('aircraft')}
          onChange={(val) => setValue('aircraft', val as any, { shouldValidate: true })}
          error={errors.aircraft?.message}
          placeholder="Select aircraft type..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="relative w-full mt-8 group overflow-hidden bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center shadow-[0_8px_20px_rgba(220,38,38,0.3)] hover:shadow-[0_8px_25px_rgba(220,38,38,0.4)] hover:-translate-y-0.5"
      >
        <span className="relative z-10 flex items-center gap-2 tracking-wide uppercase text-sm">
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Generate Vouchers'
          )}
        </span>
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
      </button>
    </form>
  );
}
