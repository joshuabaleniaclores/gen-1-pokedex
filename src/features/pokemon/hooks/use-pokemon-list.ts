import { useQuery } from '@tanstack/react-query'
import { getPokemonList } from '@/features/pokemon/api/pokemon-api'

export const GEN_1_POKEMON_COUNT = 151

export function useAllPokemonList(){
  return useQuery({
    queryKey: ["pokemon", "list", "all"],
    queryFn: () => getPokemonList(GEN_1_POKEMON_COUNT, 0),
  })
}