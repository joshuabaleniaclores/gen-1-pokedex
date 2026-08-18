import { getPokemonImageUrl } from '@/features/pokemon/api/pokemon-image'

interface PokemonDetailsHeaderProps {
  id: number
  name: string
}

export function PokemonDetailsHeader({
  id,
  name,
}: PokemonDetailsHeaderProps) {
  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground">
        #{String(id).padStart(3, "0")}
      </p>

      <h1 className="mt-1 text-2xl font-bold capitalize sm:text-3xl">
        {name}
      </h1>

      <img
        src={getPokemonImageUrl(id)}
        alt={name}
        className="mx-auto mt-6 h-40 w-40 object-contain sm:h-48 sm:w-48"
      />
    </div>
  )
}