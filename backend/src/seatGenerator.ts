export type AircraftType = 'ATR' | 'Airbus 320' | 'Boeing 737 Max';

const SEAT_MAP = {
  'ATR': { rows: 18, seats: ['A', 'C', 'D', 'F'] },
  'Airbus 320': { rows: 32, seats: ['A', 'B', 'C', 'D', 'E', 'F'] },
  'Boeing 737 Max': { rows: 32, seats: ['A', 'B', 'C', 'D', 'E', 'F'] },
};

export function generateSeats(aircraftType: AircraftType): string[] {
  const map = SEAT_MAP[aircraftType];
  if (!map) {
    throw new Error(`Invalid aircraft type: ${aircraftType}`);
  }

  const generatedSeats = new Set<string>();

  while (generatedSeats.size < 3) {
    const randomRow = Math.floor(Math.random() * map.rows) + 1;
    const randomSeatLetter = map.seats[Math.floor(Math.random() * map.seats.length)];
    const seatString = `${randomRow}${randomSeatLetter}`;
    generatedSeats.add(seatString);
  }

  return Array.from(generatedSeats);
}
