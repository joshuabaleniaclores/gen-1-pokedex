import type { PokemonListItem } from '@/features/pokemon/types/pokemon'
import { PokemonCard } from './pokemon-card'
import { getPokemonId } from '@/features/pokemon/utils/get-pokemon-id'

interface CapturedDetails {
  pokemonId: number
  nickname: string
  capturedAt: string
}

interface PokemonListProps {
  pokemon: PokemonListItem[]
  showRemove?: boolean
  onRemove?: (pokemonId: number) => void
  capturedPokemon?: CapturedDetails[]
}

export function PokemonList({
  pokemon,
  showRemove,
  onRemove,
  capturedPokemon = [],
}: PokemonListProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg border">
      <div className="divide-y">
        {pokemon.map((item) => {
          const id = getPokemonId(item.url)

          const capturedDetails =
            capturedPokemon.find(
              (pokemon) => pokemon.pokemonId === id,
            )

          return (
            <PokemonCard
              key={id}
              pokemon={item}
              id={id}
              showRemove={showRemove}
              onRemove={onRemove}
              nickname={capturedDetails?.nickname}
              capturedAt={capturedDetails?.capturedAt}
            />
          )
        })}
      </div>
    </div>
  )
}