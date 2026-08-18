import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAllPokemonList } from '@/features/pokemon/hooks/use-pokemon-list'
import { PokemonGrid } from '@/features/pokemon/components/pokemon-grid'
import { PokemonList } from '@/features/pokemon/components/pokemon-list'
import { useCapturedPokemon } from '@/features/pokemon/hooks/use-captured-pokemon'
import { getPokemonId } from '@/features/pokemon/utils/get-pokemon-id'
import { PokemonSkeleton } from '@/features/pokemon/components/pokemon-skeleton'
import { PokemonEmptyState } from '@/features/pokemon/components/pokemon-empty-state'
import { PokedexPagination } from '@/features/pokemon/components/pokedex/pokedex-pagination'
import { PokedexHeader } from '@/features/pokemon/components/pokedex/pokedex-header'
import { PokedexTabs } from '@/features/pokemon/components/pokedex/pokedex-tabs'
import { PokedexToolbar } from '@/features/pokemon/components/pokedex/pokedex-toolbar'

const POKEMON_PER_PAGE = 20

type Tab = "all" | "captured"

export default function PokedexPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [tab, setTab] = useState<Tab>("all")

  const {
    capturedPokemon,
    uncapturePokemon,
  } = useCapturedPokemon()

  const {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useAllPokemonList()

  const filteredPokemon = useMemo(() => {
    if (!data) {
      return []
    }

    let pokemon = data.results

    /*
     * Captured filter
     */
    if (tab === "captured") {
      const capturedIds = new Set(
        capturedPokemon.map(
          (pokemon) => pokemon.pokemonId,
        ),
      )

      pokemon = pokemon.filter((pokemon) => {
        const pokemonId = getPokemonId(pokemon.url)

        return capturedIds.has(pokemonId)
      })
    }

    /*
     * Client-side search
     */
    const searchTerm = search
      .trim()
      .toLowerCase()

    if (searchTerm) {
      pokemon = pokemon.filter((pokemon) =>
        pokemon.name
          .toLowerCase()
          .includes(searchTerm),
      )
    }

    return pokemon
  }, [
    data,
    search,
    tab,
    capturedPokemon,
  ])

  /*
   * Client-side pagination
   */
  const totalPages = Math.ceil(
    filteredPokemon.length /
      POKEMON_PER_PAGE,
  )

  const paginatedPokemon = useMemo(() => {
    const startIndex =
      (page - 1) * POKEMON_PER_PAGE

    const endIndex =
      startIndex + POKEMON_PER_PAGE

    return filteredPokemon.slice(
      startIndex,
      endIndex,
    )
  }, [filteredPokemon, page])

  const handlePrevious = () => {
    setPage((currentPage) =>
      Math.max(currentPage - 1, 1),
    )
  }

  const handleNext = () => {
    setPage((currentPage) =>
      Math.min(
        currentPage + 1,
        totalPages,
      ),
    )
  }

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearch(event.target.value)
    setPage(1)
  }

  const handleTabChange = (newTab: Tab) => {
    setTab(newTab)
    setPage(1)
  }

  /*
   * Initial loading state
   */
   if (isLoading) {
    return (
      <main className="container mx-auto w-full px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6">
          <Skeleton className="h-8 w-48 sm:h-9 sm:w-56" />

          <Skeleton className="mt-2 h-5 w-28 sm:w-32" />
        </div>

        <PokemonSkeleton />
      </main>
    )
  }

  /*
   * Error state
   */
  if (isError || !data) {
    return (
      <main className="container mx-auto w-full px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex min-h-[300px] flex-col items-center justify-center px-4 text-center">
          <h2 className="text-lg font-semibold sm:text-xl">
            Failed to load Pokemon
          </h2>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Something went wrong while
            loading the Pokedex.
          </p>

          <Button
            className="mt-4 w-full sm:w-auto"
            onClick={() => refetch()}
          >
            Try Again
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <PokedexHeader
        tab={tab}
        count={filteredPokemon.length}
      />

      <PokedexTabs
        tab={tab}
        capturedCount={capturedPokemon.length}
        onChange={handleTabChange}
      />

      <PokedexToolbar
        search={search}
        view={view}
        onSearchChange={handleSearchChange}
        onViewChange={setView}
      />

      {isFetching && (
        <p className="mb-4 text-sm text-muted-foreground">
          Loading...
        </p>
      )}

      {paginatedPokemon.length === 0 ? (
        <PokemonEmptyState
          title={
            tab === "captured"
              ? "No captured Pokemon"
              : "No Pokemon found"
          }
          description={
            tab === "captured"
              ? "Capture some Pokemon and they will appear here."
              : "Try searching for a different Pokemon."
          }
        />
      ) : view === "grid" ? (
        <PokemonGrid
          pokemon={paginatedPokemon}
          showRemove={tab === "captured"}
          onRemove={uncapturePokemon}
        />
      ) : (
        <PokemonList
          pokemon={paginatedPokemon}
          showRemove={tab === "captured"}
          onRemove={uncapturePokemon}
          capturedPokemon={tab === "captured" ? capturedPokemon : []       }
        />
      )}

      <PokedexPagination
        page={page}
        totalPages={totalPages}
        disabled={isFetching}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </main>
  )
}