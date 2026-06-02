type ComingSoonProps = {
  title?: string
}

export function ComingSoon({ title = 'Page' }: ComingSoonProps) {
  return (
    <div className="grid min-h-[calc(100vh-140px)] place-items-center px-4">
      <div className="w-full max-w-md rounded-lg border bg-card p-8 text-center admin-card-shadow">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Coming Soon</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-normal text-foreground">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          This admin shell is ready. Feature pages and data workflows can be added next.
        </p>
      </div>
    </div>
  )
}
