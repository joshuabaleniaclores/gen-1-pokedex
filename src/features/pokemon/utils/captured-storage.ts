import type { CapturedPokemon } from '@/features/pokemon/types/captured-pokemon'

const STORAGE_KEY = "pokedex-captured-pokemon"

export const getCapturedPokemon = (): CapturedPokemon[] => {
  const stored = localStorage.getItem(STORAGE_KEY)

  if (!stored) {
    return []
  }

  try {
    return JSON.parse(stored) as CapturedPokemon[]
  } catch {
    return []
  }
}

export const saveCapturedPokemon = (
  capturedPokemon: CapturedPokemon,
): void => {
  const current = getCapturedPokemon()

  const updated = [
    ...current.filter(
      (pokemon) =>
        pokemon.pokemonId !== capturedPokemon.pokemonId,
    ),
    capturedPokemon,
  ]

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated),
  )
}

export const removeCapturedPokemon = (
  pokemonId: number,
): void => {
  const current = getCapturedPokemon()

  const updated = current.filter(
    (pokemon) => pokemon.pokemonId !== pokemonId,
  )

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated),
  )
}