export function rand(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export const ROUTES = {
  HOME: '/'
};