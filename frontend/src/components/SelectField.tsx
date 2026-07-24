import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

export function SelectField({ label, options, value, onChange, error, placeholder }: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">{label}</label>
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 border rounded-xl flex items-center justify-between cursor-pointer transition-all bg-slate-50 ${
          error ? 'border-red-500' : isOpen ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 hover:border-red-400'
        }`}
      >
        <span className={selectedOption ? 'text-slate-900 font-medium' : 'text-slate-400'}>
          {selectedOption ? selectedOption.label : (placeholder || 'Select an option')}
        </span>
        <ChevronDown size={18} className={`transition-transform duration-200 text-slate-400 ${isOpen ? 'rotate-180 text-red-500' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-slate-100 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 py-1">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 cursor-pointer flex items-center justify-between transition-colors ${
                  isSelected 
                    ? 'bg-red-50 text-red-600 font-bold' 
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                {opt.label}
                {isSelected && <Check size={18} className="text-red-500" />}
              </div>
            );
          })}
        </div>
      )}
      
      {error && <p className="text-red-500 text-sm mt-1.5 ml-1 font-medium">{error}</p>}
    </div>
  );
}
