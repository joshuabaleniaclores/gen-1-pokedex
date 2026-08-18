import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PageLoading } from '@/components/page-loading';

const PokedexPage = lazy(
  () =>
    import(
      "@/features/pokemon/pages/pokedex-page"
    ),
)

const PokemonDetailsPage = lazy(
  () =>
    import(
      "@/features/pokemon/pages/pokemon-details-page"
    ),
)

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route
            path="/"
            element={<PokedexPage />}
          />

          <Route
            path="/pokemon/:id"
            element={<PokemonDetailsPage />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}