type ProductNameProps = {
  name: string
}

export function ProductName({ name }: ProductNameProps) {
  return (
    <div className="relative mt-4">
      <h3
        title={name}
        className="line-clamp-2 min-h-[3.5rem] text-sm font-semibold leading-snug text-brand-espresso sm:text-base"
      >
        {name}
      </h3>
      <span
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-20 mt-1 max-w-[18rem] rounded-md border border-brand-warmGray/50 bg-brand-base px-2 py-1 text-xs text-brand-charcoal opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {name}
      </span>
    </div>
  )
}
