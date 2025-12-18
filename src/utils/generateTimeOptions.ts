export function generateTimeOptions(
  start = "09:00",
  end = "18:00",
  stepMinutes = 30
): string[] {
  const result: string[] = [];

  const [startH, startM] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);

  let current = startH * 60 + startM;
  const endTime = endH * 60 + endM;

  while (current <= endTime) {
    const hours = String(Math.floor(current / 60)).padStart(2, "0");
    const minutes = String(current % 60).padStart(2, "0");
    result.push(`${hours}:${minutes}`);
    current += stepMinutes;
  }

  return result;
}