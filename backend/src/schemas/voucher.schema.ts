import { z } from 'zod';

export const checkSchema = z.object({
  flightNumber: z.string().min(1, 'Flight number is required'),
  date: z.string().min(1, 'Date is required')
});

export const generateSchema = checkSchema.extend({
  name: z.string().min(1, 'Name is required'),
  id: z.string().min(1, 'ID is required'),
  aircraft: z.enum(['ATR', 'Airbus 320', 'Boeing 737 Max'] as const)
});
