export function ProductSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="rounded-2xl border border-brand-warmGray/30 bg-brand-surface/70 p-3 shadow-soft sm:p-4"
    >
      <div className="aspect-square animate-pulse rounded-xl bg-brand-warmGray/25" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-4/5 animate-pulse rounded bg-brand-warmGray/25" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-brand-warmGray/20" />
      </div>
    </article>
  )
}
