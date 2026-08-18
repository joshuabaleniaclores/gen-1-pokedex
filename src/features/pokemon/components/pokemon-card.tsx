import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { getPokemonImageUrl } from '@/features/pokemon/api/pokemon-image'
import type { PokemonListItem } from '@/features/pokemon/types/pokemon'

interface PokemonCardProps {
  pokemon: PokemonListItem
  id: number
  showRemove?: boolean
  onRemove?: (pokemonId: number) => void
  nickname?: string
  capturedAt?: string
}

export function PokemonCard({
  pokemon,
  id,
  showRemove = false,
  onRemove,
  nickname,
  capturedAt,
}: PokemonCardProps) {
  return (
    <Link
      to={`/pokemon/${id}`}
      className="relative block p-3 transition-shadow hover:bg-muted/50 sm:p-4"
    >
      {showRemove && (
        <button
          type="button"
          aria-label={`Remove ${pokemon.name} from captured`}
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

      <div className="flex items-center gap-4">
        <img
          src={getPokemonImageUrl(id)}
          alt={pokemon.name}
          className="h-20 w-20 shrink-0 object-contain sm:h-24 sm:w-24"
        />

        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground sm:text-sm">
            #{String(id).padStart(3, '0')}
          </p>

          <h2 className="truncate text-sm font-semibold capitalize sm:text-base">
            {pokemon.name}
          </h2>

          {nickname !== undefined && (
            <p className="mt-1 truncate text-sm text-muted-foreground">
              Nickname: {nickname || '—'}
            </p>
          )}

          {capturedAt !== undefined && (
            <p className="mt-1 text-sm text-muted-foreground">
              Date: {capturedAt}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}