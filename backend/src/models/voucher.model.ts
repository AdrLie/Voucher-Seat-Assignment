import db from '../database';

export const checkVouchersExist = (flightNumber: string, date: string): boolean => {
  const stmt = db.prepare(`
    SELECT COUNT(*) as count FROM vouchers
    WHERE flight_number = ? AND flight_date = ?
  `);
  const result = stmt.get(flightNumber, date) as { count: number };
  return result.count > 0;
};

export const insertVoucher = (
  crewName: string,
  crewId: string,
  flightNumber: string,
  flightDate: string,
  aircraftType: string,
  seat1: string,
  seat2: string,
  seat3: string
) => {
  const insertStmt = db.prepare(`
    INSERT INTO vouchers (
      crew_name, crew_id, flight_number, flight_date, aircraft_type,
      seat1, seat2, seat3, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertStmt.run(
    crewName,
    crewId,
    flightNumber,
    flightDate,
    aircraftType,
    seat1,
    seat2,
    seat3,
    new Date().toISOString()
  );
};
