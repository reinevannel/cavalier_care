import { lazy, Suspense, useEffect, useState } from 'react'
import Nav from './components/Nav'
import HomePage from './pages/HomePage'

/**
 * CavalierCare
 * Une seule appli React. `page` choisit l'écran affiché.
 * L'accueil est chargé tout de suite. Les autres pages arrivent
 * seulement quand on clique : le premier affichage est plus léger.
 */
const NyxPage = lazy(() => import('./pages/NyxPage'))
const FoodCalculatorPage = lazy(() => import('./pages/FoodCalculatorPage'))
const RecipesPage = lazy(() => import('./pages/RecipesPage'))
const WalkPlannerPage = lazy(() => import('./pages/WalkPlannerPage'))
const HealthTipsPage = lazy(() => import('./pages/HealthTipsPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'))

export type Page = 'home' | 'nyx' | 'calculator' | 'recipes' | 'walks' | 'health' | 'about' | 'casestudy'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [darkMode, setDarkMode] = useState(() => {
    try { return localStorage.getItem('cavaliercare-theme') === 'dark' } catch { return false }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    try { localStorage.setItem('cavaliercare-theme', darkMode ? 'dark' : 'light') } catch {}
  }, [darkMode])

  const navigate = (p: Page) => {
    setPage(p)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <div className="page-bg" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-app)' }}>
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <Nav page={page} navigate={navigate} darkMode={darkMode} toggleDark={() => setDarkMode((d) => !d)} />
      <main id="contenu" style={{ paddingTop: '72px' }}>
        <Suspense fallback={<p className="page-loading">Chargement…</p>}>
          {page === 'home' && <HomePage navigate={navigate} />}
          {page === 'nyx' && <NyxPage />}
          {page === 'calculator' && <FoodCalculatorPage />}
          {page === 'recipes' && <RecipesPage />}
          {page === 'walks' && <WalkPlannerPage />}
          {page === 'health' && <HealthTipsPage />}
          {page === 'about' && <AboutPage navigate={navigate} />}
          {page === 'casestudy' && <CaseStudyPage navigate={navigate} />}
        </Suspense>
      </main>
    </div>
  )
}
