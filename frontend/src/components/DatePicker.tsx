import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import type { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { FormInputs } from '../types';


interface DatePickerProps {
  setValue: UseFormSetValue<FormInputs>;
  watch: UseFormWatch<FormInputs>;
  error?: string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function DatePicker({ setValue, watch, error }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDateStr = watch('date');
  const selectedDate = selectedDateStr ? new Date(selectedDateStr) : null;

  const [currentMonth, setCurrentMonth] = useState(selectedDate ? selectedDate.getMonth() : new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate ? selectedDate.getFullYear() : new Date().getFullYear());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleSelectDate = (day: number) => {
    const month = String(currentMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    setValue('date', `${currentYear}-${month}-${dayStr}`, { shouldValidate: true });
    setIsOpen(false);
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const blanks = Array.from({ length: firstDay }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const displayDate = selectedDate
    ? `${selectedDate.getDate()} ${MONTH_NAMES[selectedDate.getMonth()].substring(0, 3)} ${selectedDate.getFullYear()}`
    : '';

  return (
    <div className="relative" ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 border rounded-xl flex items-center justify-between cursor-pointer transition-all bg-slate-50 ${
          error ? 'border-red-500' : isOpen ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 hover:border-red-400'
        }`}
      >
        <span className={displayDate ? 'text-slate-900' : 'text-slate-400'}>
          {displayDate || 'Select a date'}
        </span>
        <CalendarIcon size={18} className={displayDate ? 'text-red-500' : 'text-slate-400'} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 p-3 bg-white border border-slate-100 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] z-50 w-64 animate-in fade-in slide-in-from-top-2">
          <div className="flex justify-between items-center mb-3">
            <button 
              type="button" 
              onClick={handlePrevMonth}
              className="p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-red-600"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="font-bold text-sm text-slate-900 tracking-wide">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </div>
            <button 
              type="button" 
              onClick={handleNextMonth}
              className="p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-red-600"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1.5">
            {DAYS.map(day => (
              <div key={day} className="text-center text-[11px] font-bold text-slate-400 py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {blanks.map(blank => (
              <div key={`blank-${blank}`} className="p-1.5" />
            ))}
            {days.map(day => {
              const isSelected = selectedDate?.getDate() === day && 
                                 selectedDate?.getMonth() === currentMonth && 
                                 selectedDate?.getFullYear() === currentYear;
              
              const isToday = new Date().getDate() === day && 
                              new Date().getMonth() === currentMonth && 
                              new Date().getFullYear() === currentYear;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDate(day)}
                  className={`
                    w-7 h-7 flex items-center justify-center rounded-full text-xs transition-all mx-auto font-medium
                    ${isSelected 
                      ? 'bg-gradient-to-br from-red-600 to-orange-500 text-white font-bold shadow-md shadow-red-500/40' 
                      : isToday
                        ? 'bg-red-50 text-red-600 font-bold hover:bg-red-100'
                        : 'text-slate-700 hover:bg-slate-100'
                    }
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
