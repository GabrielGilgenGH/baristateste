import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

type ErrorStateProps = {
  onRetry: () => void
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <Card className="rounded-2xl border border-red-400/35 bg-red-950/15 p-8 text-center">
      <p className="text-base font-semibold text-brand-espresso">Erro ao carregar os produtos.</p>
      <p className="mt-2 text-sm text-brand-charcoal/80">Verifique sua conexao e tente novamente.</p>
      <div className="mt-5 flex justify-center">
        <Button type="button" variant="secondary" onClick={onRetry} className="min-w-[180px]">
          Tentar novamente
        </Button>
      </div>
    </Card>
  )
}
