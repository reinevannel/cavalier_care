/**
 * Barre du haut. Sur grand écran : les liens.
 * Sur téléphone : deux boutons ronds, thème et menu.
 */
import { useEffect, useState } from 'react'
import { Page } from '../App'

interface NavProps {
  page: Page
  navigate: (p: Page) => void
  darkMode: boolean
  toggleDark: () => void
}

const links: { label: string; page: Page }[] = [
  { label: 'Nyx', page: 'nyx' },
  { label: 'Nourriture', page: 'calculator' },
  { label: 'Recettes', page: 'recipes' },
  { label: 'Promenades', page: 'walks' },
  { label: 'Santé', page: 'health' },
  { label: 'À propos', page: 'about' },
  { label: 'Case Study', page: 'casestudy' },
]

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export default function Nav({ page, navigate, darkMode, toggleDark }: NavProps) {
  const [open, setOpen] = useState(false)

  function go(next: Page) {
    setOpen(false)
    navigate(next)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="topbar">
      <nav className="topnav" aria-label="Navigation principale">
        <button type="button" className="logo" onClick={() => go('home')}>
          <span aria-hidden="true">🐾</span>
          CavalierCare
        </button>

        <div className="desktop-nav nav-links">
          {links.map((link) => (
            <button
              key={link.page}
              type="button"
              className={page === link.page ? 'nav-link on' : 'nav-link'}
              aria-current={page === link.page ? 'page' : undefined}
              onClick={() => go(link.page)}
            >
              {link.label}
            </button>
          ))}
        </div>

        <button type="button" className="icon-btn desktop-nav" onClick={toggleDark} aria-pressed={darkMode} aria-label={darkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}>
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>

        <button type="button" className="btn-primary desktop-nav nav-cta" onClick={() => go('calculator')}>
          Calculer la ration
        </button>

        <div className="mobile-nav mobile-tools">
          <button type="button" className="icon-btn" onClick={toggleDark} aria-pressed={darkMode} aria-label={darkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}>
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            className="icon-btn"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="menu-mobile" className="mobile-menu">
          {links.map((link) => (
            <button
              key={link.page}
              type="button"
              className={page === link.page ? 'menu-link on' : 'menu-link'}
              aria-current={page === link.page ? 'page' : undefined}
              onClick={() => go(link.page)}
            >
              {link.label}
            </button>
          ))}
          <button type="button" className="btn-primary" onClick={() => go('calculator')}>
            Calculer la ration
          </button>
        </div>
      )}
    </header>
  )
}
