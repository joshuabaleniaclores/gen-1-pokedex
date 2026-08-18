import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import {
  getCapturedPokemon,
  removeCapturedPokemon,
  saveCapturedPokemon,
} from '@/features/pokemon/utils/captured-storage'
import type { CapturedPokemon } from '@/features/pokemon/types/captured-pokemon'

export function useCapturedPokemon() {
  const [capturedPokemon, setCapturedPokemon] =
    useState<CapturedPokemon[]>(() => getCapturedPokemon())

  const capturePokemon = useCallback(
    (pokemon: CapturedPokemon) => {
      const alreadyCaptured = capturedPokemon.some(
        (captured) =>
          captured.pokemonId === pokemon.pokemonId,
      )

      if (alreadyCaptured) {
        toast.error("Already Captured")
        return
      }

      saveCapturedPokemon(pokemon)

      setCapturedPokemon(getCapturedPokemon())

      toast.success("Pokemon Captured")
    },
    [capturedPokemon],
  )

  const uncapturePokemon = useCallback(
    (pokemonId: number) => {
      removeCapturedPokemon(pokemonId)

      setCapturedPokemon(getCapturedPokemon())

      toast.success("Removed from Captured")

    },
    [],
  )

  const isCaptured = useCallback(
    (pokemonId: number) => {
      return capturedPokemon.some(
        (pokemon) => pokemon.pokemonId === pokemonId,
      )
    },
    [capturedPokemon],
  )

  const getCapturedDetails = useCallback(
    (pokemonId: number) => {
      return capturedPokemon.find(
        (pokemon) => pokemon.pokemonId === pokemonId,
      )
    },
    [capturedPokemon],
  )

  return {
    capturedPokemon,
    capturePokemon,
    uncapturePokemon,
    isCaptured,
    getCapturedDetails,
  }
}