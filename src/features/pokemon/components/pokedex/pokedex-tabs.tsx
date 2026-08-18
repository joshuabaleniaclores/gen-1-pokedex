interface PokedexTabsProps {
  tab: "all" | "captured"
  capturedCount: number
  onChange: (tab: "all" | "captured") => void
}

export function PokedexTabs({
  tab,
  capturedCount,
  onChange,
}: PokedexTabsProps) {
  return (
    <div className="mb-6 overflow-x-auto">
      <div className="flex min-w-max gap-2 border-b">
        <button
          type="button"
          onClick={() => onChange("all")}
          className={`border-b-2 px-3 py-2 text-sm font-medium sm:px-4 ${
            tab === "all"
              ? "border-primary"
              : "border-transparent text-muted-foreground"
          }`}
        >
          All
        </button>

        <button
          type="button"
          onClick={() => onChange("captured")}
          className={`border-b-2 px-3 py-2 text-sm font-medium sm:px-4 ${
            tab === "captured"
              ? "border-primary"
              : "border-transparent text-muted-foreground"
          }`}
        >
          Captured ({capturedCount})
        </button>
      </div>
    </div>
  )
}