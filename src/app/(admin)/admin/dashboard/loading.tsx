export default function Loading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-64 rounded bg-gray-200" />
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-gray-200" />
        ))}
      </div>
      <div className="h-96 rounded-2xl bg-gray-200" />
    </div>
  )
}
