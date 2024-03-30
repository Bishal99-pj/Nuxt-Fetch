export default (x: unknown, y: unknown): boolean => {
  return JSON.stringify(x) === JSON.stringify(y);
};
