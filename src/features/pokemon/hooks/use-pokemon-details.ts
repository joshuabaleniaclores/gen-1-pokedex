import { useQuery } from '@tanstack/react-query'
import { getPokemonDetails } from '@/features/pokemon/api/pokemon-api'

export function usePokemonDetails(
  id: number
) {
  return useQuery({
    queryKey: ["pokemon", "details", id],
    queryFn: () => getPokemonDetails(id),
  })
}