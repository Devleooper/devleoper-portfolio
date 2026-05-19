export default function SkeletonCard() {
  return (
    <div className="bg-brand-light-bg dark:bg-brand-dark-surface border border-brand-light-muted/60 dark:border-brand-dark-muted rounded-2xl p-7 flex flex-col gap-5 shadow-sm animate-pulse">
      <div className="h-3 w-1/3 bg-brand-light-muted/40 dark:bg-brand-dark-muted/60 rounded" />
      <div className="space-y-2 flex-1">
        <div className="h-2 w-full bg-brand-light-muted/40 dark:bg-brand-dark-muted/60 rounded" />
        <div className="h-2 w-5/6 bg-brand-light-muted/40 dark:bg-brand-dark-muted/60 rounded" />
        <div className="h-2 w-3/4 bg-brand-light-muted/40 dark:bg-brand-dark-muted/60 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="w-8 h-8 rounded-lg bg-brand-light-muted/40 dark:bg-brand-dark-muted/60" />
        <div className="w-8 h-8 rounded-lg bg-brand-light-muted/40 dark:bg-brand-dark-muted/60" />
      </div>
    </div>
  )
}
