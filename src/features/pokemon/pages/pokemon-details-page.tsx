import { Link, useParams } from 'react-router-dom'
import { usePokemonDetails } from '@/features/pokemon/hooks/use-pokemon-details'
import { CaptureForm } from '@/features/pokemon/components/capture-form'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { PokemonDetailsHeader } from '@/features/pokemon/components/pokemon-details/pokemon-details-header'
import { PokemonDetailsStats } from '@/features/pokemon/components/pokemon-details/pokemon-details-stats'
import { PokemonDetailsInfo } from '@/features/pokemon/components/pokemon-details/pokemon-details-info'

export default function PokemonDetailsPage() {
  const { id } = useParams()

  const pokemonId = Number(id)

  const {
    data: pokemon,
    isLoading,
    isError,
    refetch,
  } = usePokemonDetails(pokemonId)

  /*
   * Loading state
   */
  if (isLoading) {
    return (
      <main className="container mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
        <Skeleton className="mb-6 h-9 w-24" />

        <div className="rounded-xl border p-4 sm:p-6">
          <div className="flex flex-col items-center">
            <Skeleton className="h-5 w-16" />

            <Skeleton className="mt-2 h-8 w-36 sm:h-9 sm:w-40" />

            <Skeleton className="mt-6 h-40 w-40 rounded-lg sm:h-48 sm:w-48" />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-lg border p-3 sm:p-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="mt-2 h-5 w-20" />
            </div>

            <div className="rounded-lg border p-3 sm:p-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="mt-2 h-5 w-20" />
            </div>
          </div>

          <div className="mt-6">
            <Skeleton className="h-5 w-16" />

            <div className="mt-2 flex flex-wrap gap-2">
              <Skeleton className="h-7 w-20" />
              <Skeleton className="h-7 w-20" />
            </div>
          </div>

          <div className="mt-6">
            <Skeleton className="h-5 w-20" />

            <div className="mt-2 space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  /*
   * Error state
   */
  if (isError || !pokemon) {
    return (
      <main className="container mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex min-h-[300px] flex-col items-center justify-center px-4 text-center">
          <h1 className="text-lg font-semibold sm:text-xl">
            Failed to load Pokemon
          </h1>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            We couldn't load this Pokemon.
          </p>

          <div className="mt-4 flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Button
              onClick={() => refetch()}
              className="w-full sm:w-auto"
            >
              Try Again
            </Button>

            <Link
              to="/"
              className="inline-flex h-9 w-full items-center justify-center rounded-md border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted sm:w-auto"
            >
              Go Back
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
      <Link
        to="/"
        className="mb-6 inline-flex h-9 items-center justify-center rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted"
      >
        ← Go Back
      </Link>

      <div className="rounded-xl border p-4 sm:p-6">
        <PokemonDetailsHeader
          id={pokemon.id}
          name={pokemon.name}
        />

        <PokemonDetailsStats
          height={pokemon.height}
          weight={pokemon.weight}
        />

        <PokemonDetailsInfo
          types={pokemon.types}
          abilities={pokemon.abilities}
        />
      </div>

      <div className="mt-6">
        <CaptureForm pokemonId={pokemon.id} />
      </div>
    </main>
  )
}