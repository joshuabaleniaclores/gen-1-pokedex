import { Skeleton } from '@/components/ui/skeleton'

interface PokemonSkeletonProps {
  count?: number
}

export function PokemonSkeleton({
  count = 20,
}: PokemonSkeletonProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {Array.from({ length: count }).map(
        (_, index) => (
          <div
            key={index}
            className="rounded-xl border p-4"
          >
            <Skeleton className="mx-auto h-32 w-32 rounded-lg" />

            <div className="mt-3 space-y-2 text-center">
              <Skeleton className="mx-auto h-4 w-16" />
              <Skeleton className="mx-auto h-5 w-24" />
            </div>
          </div>
        ),
      )}
    </div>
  )
}