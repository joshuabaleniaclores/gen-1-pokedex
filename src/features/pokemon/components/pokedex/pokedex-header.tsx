interface PokedexHeaderProps {
  tab: "all" | "captured"
  count: number
}

export function PokedexHeader({
  tab,
  count,
}: PokedexHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold sm:text-3xl">
        {tab === "all"
          ? "Pokedex"
          : "Captured"}
      </h1>

      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        {count} Pokemon
      </p>
    </div>
  )
}