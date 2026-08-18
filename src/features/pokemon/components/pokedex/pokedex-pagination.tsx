import { Button } from "@/components/ui/button"

interface PokedexPaginationProps {
  page: number
  totalPages: number
  disabled?: boolean
  onPrevious: () => void
  onNext: () => void
}

export function PokedexPagination({
  page,
  totalPages,
  disabled,
  onPrevious,
  onNext,
}: PokedexPaginationProps) {
  if (totalPages <= 0) {
    return null
  }

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Button
        variant="outline"
        disabled={page === 1 || disabled}
        onClick={onPrevious}
        className="w-full sm:w-auto"
      >
        Previous
      </Button>

      <span className="text-sm">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={
          page === totalPages || disabled
        }
        onClick={onNext}
        className="w-full sm:w-auto"
      >
        Next
      </Button>
    </div>
  )
}
