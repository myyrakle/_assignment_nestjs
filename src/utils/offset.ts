export function makePaginationOffset(page: number, limit: number): number {
  return (page - 1) * limit;
}
