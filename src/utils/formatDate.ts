export function getAge(date: string) {
  return Math.floor(
    (Date.now() - new Date(date).getTime()) /
      (1000 * 60 * 60 * 24 * 365)
  );
}