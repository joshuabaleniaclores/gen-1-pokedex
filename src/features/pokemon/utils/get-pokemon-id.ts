export const getPokemonId = (url: string): number => {
  const segments = url.split("/").filter(Boolean)

  return Number(segments.at(-1))
}