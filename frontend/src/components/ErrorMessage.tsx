import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="w-full bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-start gap-3">
      <AlertCircle className="shrink-0 mt-0.5" size={20} />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
