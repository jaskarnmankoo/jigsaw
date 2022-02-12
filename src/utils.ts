/** Returns a random number between the given range (inclusive) */
export function rand(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export const ROUTES = {
  HOME: '/'
};
