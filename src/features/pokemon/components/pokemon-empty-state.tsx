interface PokemonEmptyStateProps {
  title: string
  description?: string
}

export function PokemonEmptyState({
  title,
  description,
}: PokemonEmptyStateProps) {
  return (
    <div className="flex min-h-[250px] flex-col items-center justify-center rounded-xl border border-dashed text-center">
      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      {description && (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}