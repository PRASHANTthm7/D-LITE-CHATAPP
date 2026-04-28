export default function Loading() {
  return (
    <div className="flex flex-col h-full animate-pulse">
      <div className="h-16 border-b border-border-default flex items-center gap-3 px-4">
        <div className="w-10 h-10 rounded-full bg-surface-3" />
        <div className="space-y-1">
          <div className="w-28 h-4 rounded bg-surface-3" />
          <div className="w-16 h-2.5 rounded bg-surface-2" />
        </div>
      </div>
      <div className="flex-1 p-4 space-y-4">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className={`rounded-2xl h-12 ${i % 2 === 0 ? "w-3/4 mr-auto bg-surface-2" : "w-2/3 ml-auto bg-surface-3"}`} />
        ))}
      </div>
    </div>
  )
}
