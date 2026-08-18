import { Skeleton } from "./ui/skeleton";

export function PageLoading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Skeleton className="h-9 w-56" />

      <Skeleton className="mt-2 h-5 w-32" />

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map(
          (_, index) => (
            <div
              key={index}
              className="rounded-xl border p-4"
            >
              <Skeleton className="mx-auto h-32 w-32 rounded-lg" />

              <Skeleton className="mx-auto mt-3 h-4 w-16" />

              <Skeleton className="mx-auto mt-2 h-5 w-24" />
            </div>
          ),
        )}
      </div>
    </main>
  )
}