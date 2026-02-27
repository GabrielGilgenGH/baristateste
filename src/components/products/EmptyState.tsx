import { Card } from '../ui/Card'

type EmptyStateProps = {
  message?: string
}

export function EmptyState({ message = 'Nenhum produto encontrado no momento.' }: EmptyStateProps) {
  return (
    <Card className="rounded-2xl border border-brand-warmGray/30 bg-brand-surface/75 p-8 text-center">
      <p className="text-base font-medium text-brand-charcoal">{message}</p>
      <p className="mt-2 text-sm text-brand-charcoal/75">Tente novamente em alguns minutos.</p>
    </Card>
  )
}
