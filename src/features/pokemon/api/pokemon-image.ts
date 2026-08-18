const POKEMON_IMAGE_BASE_URL = 
  import.meta.env.VITE_POKEMON_IMAGE_BASE_URL

export const getPokemonImageUrl = (
  pokedexNo: number
) => `${POKEMON_IMAGE_BASE_URL}/${pokedexNo}.png`