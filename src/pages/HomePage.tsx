/**
 * Accueil : présentation, photos de Nyx, et liens vers les outils.
 */
import { Page } from '../App'
const nyxAutumn = `${import.meta.env.BASE_URL}photos/autumn.jpg`
const nyxWalk = `${import.meta.env.BASE_URL}photos/walk.jpg`
const nyxClover = `${import.meta.env.BASE_URL}photos/clover.jpg`

interface HomePageProps {
  navigate: (p: Page) => void
}

const features = [
  {
    icon: '🥩',
    title: 'Nourriture intelligente',
    desc: "Calcule la ration journalière idéale selon le poids, l'âge et les besoins spécifiques de ton Cavalier.",
    color: '#F8D7C4',
    page: 'calculator' as Page,
  },
  {
    icon: '🦮',
    title: 'Promenade adaptée',
    desc: "Génère un programme sur-mesure selon la météo, l'énergie de ton chien et ton temps disponible.",
    color: '#D4E0D4',
    page: 'walks' as Page,
  },
  {
    icon: '❤️',
    title: 'Santé de la race',
    desc: 'Conseils spécifiques au Cavalier : cœur, oreilles, yeux, anxiété. Bienveillants et concrets.',
    color: '#F5D5D5',
    page: 'health' as Page,
  },
  {
    icon: '✨',
    title: 'Assistant Nyx',
    desc: "Nyx te guide et change d'expression selon les données. Une expérience émotionnelle unique.",
    color: '#FFFBF7',
    page: 'nyx' as Page,
  },
]

const stats = [
  { value: '8 recettes', label: 'maison saines' },
  { value: '270 g', label: 'ration moyenne' },
  { value: '6 conseils', label: 'santé spécifiques' },
  { value: '100%', label: 'fait avec amour' },
]

export default function HomePage({ navigate }: HomePageProps) {
  return (
    <div style={{ backgroundColor: 'var(--bg-app)' }}>

      {/* Hero */}
      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 64px)', maxWidth: '1360px', margin: '0 auto' }}>
        <div className="two-col" style={{ alignItems: 'center' }}>

          {/* Text side */}
          <div>
            <div className="chip" style={{ backgroundColor: '#F5D5D5', color: '#8B6F5C', marginBottom: '24px' }}>
              ✦ Compagnon digital pour Cavaliers King Charles
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#3D2B1F',
              marginBottom: '20px',
              letterSpacing: '-0.02em',
            }}>
              Le compagnon digital de ton{' '}
              <span style={{ color: '#C4A37A', fontStyle: 'italic' }}>Cavalier</span>
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              lineHeight: 1.7,
              color: '#8B6F5C',
              marginBottom: '36px',
              fontWeight: 300,
              maxWidth: '480px',
            }}>
              Conçu avec amour pour Nyx… et pour le tien. Nourris, promène et prends soin de ton Cavalier King Charles avec des outils pensés pour cette race d'exception.
            </p>
            <div className="hero-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => navigate('calculator')}>
                🥩 Calculer la ration
              </button>
              <button className="btn-secondary" onClick={() => navigate('nyx')}>
                Découvrir Nyx
              </button>
            </div>

            <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 40px)', marginTop: '48px', flexWrap: 'wrap' }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 700, color: '#C4A37A' }}>{s.value}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#8B6F5C', marginTop: '2px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image side */}
          <div className="hero-photo">
            <div className="hero-photo-glow" aria-hidden="true" />
            <img
              src={nyxAutumn}
              alt="Nyx le Cavalier King Charles dans les feuilles d'automne"
              fetchPriority="high"
              decoding="async"
            />
            <div className="nyx-bubble hero-bubble">
              <span aria-hidden="true">🐾</span>
              Prêt pour ma ration du jour !
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 40px)', background: 'var(--bg-card)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 700, color: '#3D2B1F', marginBottom: '12px' }}>
              Ce que CavalierCare t'apporte
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#8B6F5C', maxWidth: '440px', margin: '0 auto' }}>
              Tout ce dont tu as besoin pour prendre soin de ton compagnon au quotidien.
            </p>
          </div>
          <div className="four-col">
            {features.map((f) => (
              <button
                key={f.title}
                className="card"
                onClick={() => navigate(f.page)}
                style={{ padding: '28px', textAlign: 'left', border: 'none', cursor: 'pointer', width: '100%' }}
              >
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  backgroundColor: f.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', marginBottom: '18px',
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 600, color: '#3D2B1F', marginBottom: '8px' }}>
                  {f.title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', lineHeight: 1.6, color: '#8B6F5C', margin: '0 0 16px' }}>
                  {f.desc}
                </p>
                <div style={{ color: '#C4A37A', fontSize: '13px', fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
                  Découvrir →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* About Nyx */}
      <section style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 40px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div className="two-col" style={{ alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <img
                src={nyxWalk}
                alt="Nyx en promenade sur les pavés"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '20px', boxShadow: '0 12px 40px rgba(61,43,31,0.12)', marginTop: '32px' }}
              />
              <img
                src={nyxClover}
                alt="Nyx qui renifle"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '20px', boxShadow: '0 12px 40px rgba(61,43,31,0.12)' }}
              />
            </div>
            <div>
              <div className="chip" style={{ backgroundColor: '#D4E0D4', color: '#5C7A5C', marginBottom: '20px' }}>✦ Rencontre Nyx</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: '#3D2B1F', marginBottom: '20px', lineHeight: 1.2 }}>
                Tout a commencé avec un petit blenheim
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: 1.7, color: '#8B6F5C', marginBottom: '16px' }}>
                Nyx est un Cavalier King Charles Spaniel blenheim – cette race royale au cœur grand et à la santé fragile. Pour mieux la nourrir, la promener et l'accompagner, CavalierCare est né.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: 1.7, color: '#8B6F5C', marginBottom: '32px' }}>
                Parce que chaque gramme dans sa gamelle compte, et chaque promenade mérite d'être parfaite.
              </p>
              <button className="btn-secondary" onClick={() => navigate('about')}>
                Notre histoire →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '0 clamp(20px, 5vw, 40px)', marginBottom: 'clamp(48px, 6vw, 80px)' }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          padding: 'clamp(40px, 5vw, 64px) clamp(24px, 4vw, 48px)',
          borderRadius: '28px',
          background: 'linear-gradient(135deg, #C4A37A 0%, #B08F68 100%)',
          textAlign: 'center',
        }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, color: '#3D2B1F', marginBottom: '12px' }}>
            Prêt à offrir le meilleur à ton Cavalier ?
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#3D2B1F', marginBottom: '28px' }}>
            Commence par calculer la ration journalière idéale de ton chien.
          </p>
          <button
            type="button"
            onClick={() => navigate('calculator')}
            style={{
              backgroundColor: '#FFFBF7', color: '#3D2B1F', borderRadius: '999px',
              padding: '14px 32px', fontFamily: "'Inter', sans-serif",
              fontSize: '15px', fontWeight: 700, border: 'none', cursor: 'pointer',
            }}
          >
            Calculer maintenant →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px clamp(20px, 5vw, 40px)', borderTop: '1px solid rgba(196,163,122,0.15)', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 700, color: '#3D2B1F', marginBottom: '8px' }}>
          🐾 CavalierCare
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic', fontSize: '15px', color: '#8B6F5C', marginBottom: '16px' }}>
          "Conçu avec amour, pour chaque Cavalier au monde."
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#8B6F5C', opacity: 0.6, marginBottom: '20px' }}>
          © 2026 CavalierCare — Fait avec ❤️ pour Nyx
        </p>
        <a
          href="/CavalierCare-case-study.pdf"
          download="CavalierCare-case-study.pdf"
          className="btn-secondary"
          style={{ textDecoration: 'none' }}
        >
          Télécharger le case study
        </a>
      </footer>
    </div>
  )
}
