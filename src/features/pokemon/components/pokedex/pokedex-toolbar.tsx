import {
  Grid2X2,
  List,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface PokedexToolbarProps {
  search: string
  view: "grid" | "list"
  onSearchChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void
  onViewChange: (
    view: "grid" | "list",
  ) => void
}

export function PokedexToolbar({
  search,
  view,
  onSearchChange,
  onViewChange,
}: PokedexToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="w-full sm:max-w-sm">
        <label
          htmlFor="pokemon-search"
          className="sr-only"
        >
          Search Pokemon
        </label>

        <Input
          id="pokemon-search"
          type="search"
          value={search}
          onChange={onSearchChange}
          placeholder="Search Pokemon..."
          aria-label="Search Pokemon"
        />
      </div>

      <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto">
        <Button
          variant={
            view === "grid"
              ? "default"
              : "outline"
          }
          onClick={() => onViewChange("grid")}
          aria-label="Grid view"
        >
          <Grid2X2 className="h-4 w-4" />
          <span className="sr-only">
            Grid View
          </span>
        </Button>

        <Button
          variant={
            view === "list"
              ? "default"
              : "outline"
          }
          onClick={() => onViewChange("list")}
          aria-label="List view"
        >
          <List className="h-4 w-4" />
          <span className="sr-only">
            List View
          </span>
        </Button>
      </div>
    </div>
  )
}