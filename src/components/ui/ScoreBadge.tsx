import clsx from 'clsx'
import { getScoreColor, getScoreBg } from '../../lib/scoring'

interface ScoreBadgeProps {
  score: number | null
  size?: 'sm' | 'md'
}

export function ScoreBadge({ score, size = 'md' }: ScoreBadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center rounded-full font-semibold',
        getScoreColor(score),
        getScoreBg(score),
        {
          'h-7 w-7 text-xs': size === 'sm',
          'h-9 w-9 text-sm': size === 'md',
        }
      )}
      title={score !== null ? `Creative Hook Score: ${score}/10` : 'No score'}
    >
      {score !== null ? score : '—'}
    </span>
  )
}
