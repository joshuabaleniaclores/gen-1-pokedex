import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { useCapturedPokemon } from '@/features/pokemon/hooks/use-captured-pokemon'

interface CaptureFormProps {
  pokemonId: number
}

function formatDate(date: Date): string {
  const month = String(
    date.getMonth() + 1,
  ).padStart(2, "0")

  const day = String(
    date.getDate(),
  ).padStart(2, "0")

  const year = date.getFullYear()

  return `${month}/${day}/${year}`
}

export function CaptureForm({
  pokemonId,
}: CaptureFormProps) {
  const [nickname, setNickname] =
    useState("")

  const [capturedAt, setCapturedAt] =
    useState<Date | undefined>()

  const {
    capturePokemon,
    isCaptured,
    getCapturedDetails,
  } = useCapturedPokemon()

  const captured = isCaptured(pokemonId)

  const capturedDetails =
    getCapturedDetails(pokemonId)

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (!capturedAt) {
      return
    }

    capturePokemon({
      pokemonId,
      nickname: nickname.trim(),
      capturedAt: formatDate(capturedAt),
    })
  }

  return (
    <div className="mt-6 rounded-xl border p-4 sm:mt-8 sm:p-6">
      <h2 className="text-lg font-semibold sm:text-xl">
        {captured
          ? "Captured Pokémon"
          : "Tag as Captured"}
      </h2>

      {captured ? (
        <div className="mt-4 space-y-2 text-sm sm:text-base">
          <p>
            <span className="font-medium">
              Nickname:
            </span>{" "}
            {capturedDetails?.nickname}
          </p>

          <p>
            <span className="font-medium">
              Date:
            </span>{" "}
            {capturedDetails?.capturedAt}
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-4 space-y-4"
        >
          {/* Nickname */}
          <div>
            <label
              htmlFor="nickname"
              className="mb-1 block text-sm font-medium"
            >
              Nickname
            </label>

            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(event) =>
                setNickname(event.target.value)
              }
              placeholder="Enter nickname"
              className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Date */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Date
            </label>

            <Popover>
              <PopoverTrigger
                type="button"
                className={`inline-flex h-10 w-full items-center justify-start rounded-md border bg-background px-3 text-sm font-normal ${
                  !capturedAt
                    ? "text-muted-foreground"
                    : ""
                }`}
              >
                {capturedAt
                  ? formatDate(capturedAt)
                  : "Select date"}
              </PopoverTrigger>

              <PopoverContent
                className="w-auto p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={capturedAt}
                  onSelect={setCapturedAt}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={!capturedAt}
            className="w-full sm:w-auto"
          >
            Tag as Captured
          </Button>
        </form>
      )}
    </div>
  )
}