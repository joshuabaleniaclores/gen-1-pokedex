interface PokemonDetailsInfoProps {
  types: {
    type: {
      name: string
    }
  }[]
  abilities: {
    ability: {
      name: string
    }
  }[]
}

export function PokemonDetailsInfo({
  types,
  abilities,
}: PokemonDetailsInfoProps) {
  return (
    <>
      <div className="mt-6">
        <h2 className="font-semibold">
          Types
        </h2>

        <div className="mt-2 flex flex-wrap gap-2">
          {types.map(({ type }) => (
            <span
              key={type.name}
              className="rounded-full border px-3 py-1 text-sm capitalize"
            >
              {type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold">
          Abilities
        </h2>

        <ul className="mt-2 space-y-2">
          {abilities.map(({ ability }) => (
            <li
              key={ability.name}
              className="capitalize"
            >
              {ability.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}