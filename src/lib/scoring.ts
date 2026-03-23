export function getScoreColor(score: number | null): string {
  if (score === null) return 'text-gray-400'
  if (score <= 3) return 'text-red-500'
  if (score <= 6) return 'text-amber-500'
  return 'text-green-500'
}

export function getScoreBg(score: number | null): string {
  if (score === null) return 'bg-gray-100'
  if (score <= 3) return 'bg-red-50'
  if (score <= 6) return 'bg-amber-50'
  return 'bg-green-50'
}
