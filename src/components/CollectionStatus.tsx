'use client'

export default function CollectionStatus({ loading, error, retry }: {
  loading: boolean
  error: string | null
  retry: () => void
}) {
  if (loading) return <p role="status" className="py-10 text-center text-gray-500">Loading the latest content…</p>
  if (!error) return null
  return (
    <div role="alert" className="py-10 text-center text-gray-600">
      <p>{error}</p>
      <button type="button" onClick={retry} className="mt-3 font-semibold text-sky-600 hover:underline">Try again</button>
    </div>
  )
}
