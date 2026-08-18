import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import type { PokemonListItem } from '@/features/pokemon/types/pokemon'
import { getPokemonImageUrl } from '@/features/pokemon/api/pokemon-image'
import { getPokemonId } from '@/features/pokemon/utils/get-pokemon-id'

interface PokemonGridProps {
  pokemon: PokemonListItem[]
  showRemove?: boolean
  onRemove?: (pokemonId: number) => void
}

export function PokemonGrid({
  pokemon,
  showRemove = false,
  onRemove,
}: PokemonGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
      {pokemon.map((item) => {
        const id = getPokemonId(item.url)

        return (
          <Link
            key={id}
            to={`/pokemon/${id}`}
            className="relative block min-w-0 rounded-xl border p-3 transition-shadow hover:shadow-md sm:p-4"
          >
            {showRemove && (
              <button
                type="button"
                aria-label={`Remove ${item.name} from captured`}
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  onRemove?.(id)
                }}
                className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <img
              src={getPokemonImageUrl(id)}
              alt={item.name}
              className="mx-auto h-24 w-24 object-contain sm:h-28 sm:w-28 md:h-32 md:w-32"
            />

            <div className="mt-2 min-w-0 text-center sm:mt-3">
              <p className="text-xs text-muted-foreground sm:text-sm">
                #{String(id).padStart(3, '0')}
              </p>

              <h2 className="mt-1 truncate text-sm font-semibold capitalize sm:text-base">
                {item.name}
              </h2>
            </div>
          </Link>
        )
      })}
    </div>
  )
}