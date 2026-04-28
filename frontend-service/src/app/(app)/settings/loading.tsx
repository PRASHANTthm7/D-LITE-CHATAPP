export default function Loading() {
  return (
    <div className="flex-1 flex flex-col gap-3 p-6 animate-pulse">
      <div className="h-8 w-48 rounded-lg bg-surface-3" />
      <div className="h-4 w-64 rounded-lg bg-surface-2" />
      <div className="mt-4 space-y-3">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="h-16 rounded-xl bg-surface-2" />
        ))}
      </div>
    </div>
  )
}
