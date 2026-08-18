import { api } from '@/lib/axios'
import type { PokemonDetails, PokemonListResponse } from '@/features/pokemon/types/pokemon'

export const getPokemonList = async (
  limit: number, 
  offset: number
): Promise<PokemonListResponse> => {
  const response = await api.get<PokemonListResponse>("/pokemon", {
    params: {
      limit,
      offset,
    },
  })
  
  return response.data
}

export const getPokemonDetails = async (
  id: number,
): Promise<PokemonDetails> => {
  const response = await api.get<PokemonDetails>(`/pokemon/${id}`)
  
  return response.data
}