export function isValidRating(rating: number) {
  if (rating > 0 && rating <= 5) return true;

  return false;
}
