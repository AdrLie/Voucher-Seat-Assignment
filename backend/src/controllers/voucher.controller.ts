import { Request, Response } from 'express';
import { z } from 'zod';
import { checkSchema, generateSchema } from '../schemas/voucher.schema';
import { checkVouchersExist, insertVoucher } from '../models/voucher.model';
import { generateSeats, AircraftType } from '../seatGenerator';

export const checkVoucherController = (req: Request, res: Response): void => {
  try {
    const validatedData = checkSchema.parse(req.body);
    const exists = checkVouchersExist(validatedData.flightNumber, validatedData.date);
    res.json({ exists });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

export const generateVoucherController = (req: Request, res: Response): void => {
  try {
    const validatedData = generateSchema.parse(req.body);

    const exists = checkVouchersExist(validatedData.flightNumber, validatedData.date);
    if (exists) {
      res.status(409).json({
        success: false,
        error: 'Vouchers have already been generated for this flight and date.'
      });
      return;
    }

    const seats = generateSeats(validatedData.aircraft as AircraftType);

    insertVoucher(
      validatedData.name,
      validatedData.id,
      validatedData.flightNumber,
      validatedData.date,
      validatedData.aircraft,
      seats[0],
      seats[1],
      seats[2]
    );

    res.json({ success: true, seats });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
