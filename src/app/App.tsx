import { AppProviders } from './providers'
import { AppRouter } from './router'
import { Toaster } from '@/components/ui/sonner'
import { ThemeToggle } from '@/components/theme-toggle'

function App() {
  return (
    <AppProviders>
      <div className="relative min-h-screen">
        <div className="absolute right-4 top-4 z-50">
          <ThemeToggle />
        </div>

        <AppRouter />
      </div>

      <Toaster />
    </AppProviders>
  )
}

export default App