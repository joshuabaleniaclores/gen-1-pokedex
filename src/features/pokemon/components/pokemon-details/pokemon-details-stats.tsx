interface PokemonDetailsStatsProps {
  height: number
  weight: number
}

export function PokemonDetailsStats({
  height,
  weight,
}: PokemonDetailsStatsProps) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
      <div className="rounded-lg border p-3 sm:p-4">
        <p className="text-sm text-muted-foreground">
          Height
        </p>

        <p className="mt-1 font-medium">
          {height / 10} m
        </p>
      </div>

      <div className="rounded-lg border p-3 sm:p-4">
        <p className="text-sm text-muted-foreground">
          Weight
        </p>

        <p className="mt-1 font-medium">
          {weight / 10} kg
        </p>
      </div>
    </div>
  )
}