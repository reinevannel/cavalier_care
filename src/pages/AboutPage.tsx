/**
 * Histoire du projet et portrait de Nyx des Prés.
 */
import { Page } from '../App'
import NyxDog from '../components/NyxDog'

const nyxLeaves = '/photos/leaves.jpg'
const nyxChurch = '/photos/church.jpg'
const nyxSit = '/photos/sit.jpg'

interface AboutPageProps {
  navigate: (p: Page) => void
}

const values = [
  { icon: '❤️', title: 'Amour avant tout', desc: "CavalierCare est né d'un amour profond pour une race unique. Chaque fonctionnalité est pensée avec tendresse." },
  { icon: '🔬', title: 'Basé sur la science', desc: 'Les recommandations nutritionnelles et de santé sont issues des dernières recherches en médecine vétérinaire.' },
  { icon: '🛡️', title: 'Bienveillant toujours', desc: "Jamais alarmiste. Chaque conseil est formulé pour rassurer et accompagner, pas pour inquiéter." },
  { icon: '🐾', title: 'Centré sur le chien', desc: "Nyx est au centre de tout. L'expérience crée un lien émotionnel fort entre toi et ton compagnon." },
]

export default function AboutPage({ navigate }: AboutPageProps) {
  return (
    <div style={{ backgroundColor: 'var(--bg-app)' }}>

      {/* Hero — Nyx in autumn leaves, looking up adoringly */}
      <section style={{ position: 'relative', minHeight: 'clamp(420px, 65vh, 680px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <img
          src={nyxLeaves}
          alt="Nyx le Cavalier King Charles sur un tapis de feuilles dorées"
          fetchPriority="high"
          decoding="async"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 45%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(61,43,31,0.78) 0%, rgba(61,43,31,0.15) 65%, transparent 100%)' }} />
        <div style={{ position: 'relative', padding: 'clamp(32px, 5vw, 64px)', maxWidth: '700px' }}>
          <div className="chip" style={{ backgroundColor: 'rgba(255,251,247,0.9)', color: '#8B6F5C', marginBottom: '20px' }}>
            ✦ L'histoire de CavalierCare
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px, 5vw, 62px)',
            fontWeight: 700, color: 'white', lineHeight: 1.1, marginBottom: '20px',
          }}>
            Né de l'amour pour{' '}
            <span style={{ color: '#F5D5D5', fontStyle: 'italic' }}>Nyx</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(14px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, maxWidth: '520px' }}>
            Un Cavalier King Charles. Une race magnifique et fragile. Une obsession douce de prendre soin d'elle du mieux possible.
          </p>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 40px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="two-col" style={{ alignItems: 'center' }}>

            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: '#3D2B1F', marginBottom: '24px', lineHeight: 1.2 }}>
                Pourquoi CavalierCare existe
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: 1.8, color: '#8B6F5C', marginBottom: '18px' }}>
                Quand Nyx est arrivé dans notre vie, j'ai réalisé très vite que les Cavaliers King Charles ne sont pas comme les autres chiens. Leur cœur fragile, leur digestion sensible, leur besoin absolu de compagnie… Tout ça demande une attention particulière. À la maison, le petit nom plus personnel est <em>Nyx des Prés</em> — pour les prés, les feuilles et les longues promenades.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: 1.8, color: '#8B6F5C', marginBottom: '18px' }}>
                Combien de grammes lui donner ? Quelle recette pour soutenir son cœur ? Combien de temps de promenade quand il fait chaud ? Les réponses étaient éparpillées, techniques, parfois contradictoires.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: 1.8, color: '#8B6F5C', marginBottom: '32px' }}>
                CavalierCare est né de ce manque. Un outil pensé avec amour, ancré dans la science vétérinaire, centré sur une seule chose : le bien-être de ton Cavalier.
              </p>

              <div className="nyx-bubble" style={{ maxWidth: '100%', marginBottom: '32px' }}>
                <span style={{ marginRight: '6px' }}>🐾</span>
                <em>"Je valide tout ce qui est dans cette application. J'ai goûté les recettes moi-même."</em>
              </div>

              <button className="btn-primary" onClick={() => navigate('home')}>
                ← Retour à l'accueil
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <img
                src={nyxChurch}
                alt="Nyx en promenade devant l’église"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '20px', boxShadow: '0 8px 32px rgba(61,43,31,0.12)' }}
              />
              <img
                src={nyxSit}
                alt="Nyx assise dans l’herbe"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '20px', boxShadow: '0 8px 32px rgba(61,43,31,0.12)', marginTop: '28px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 40px)', background: 'var(--bg-card)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3vw, 38px)', fontWeight: 700, color: '#3D2B1F', marginBottom: '12px' }}>
              La mission de CavalierCare
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#8B6F5C', maxWidth: '460px', margin: '0 auto' }}>
              Quatre piliers qui guident chaque décision de design et de contenu.
            </p>
          </div>
          <div className="four-col">
            {values.map((v) => (
              <div key={v.title} className="card" style={{ padding: '28px' }}>
                <div style={{ fontSize: '30px', marginBottom: '14px' }}>{v.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', fontWeight: 600, color: '#3D2B1F', marginBottom: '8px' }}>
                  {v.title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', lineHeight: 1.6, color: '#8B6F5C', margin: 0 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future */}
      <section style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 40px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            padding: 'clamp(36px, 5vw, 56px)', borderRadius: '28px',
            background: 'linear-gradient(135deg, #FFFBF7 0%, #FDF8F3 100%)',
            border: '1px solid rgba(196,163,122,0.2)', textAlign: 'center',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🐕🦴🐩🐶</div>
            <div className="chip" style={{ backgroundColor: '#F5D5D5', color: '#8B6F5C', marginBottom: '16px' }}>Bientôt</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 3vw, 34px)', fontWeight: 700, color: '#3D2B1F', marginBottom: '12px' }}>
              Et bientôt d'autres races…
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#8B6F5C', maxWidth: '500px', margin: '0 auto 28px' }}>
              CavalierCare deviendra PetCare — un compagnon digital pour toutes les races aux besoins particuliers. Cocker, Bichon, Carlin… Chaque race mérite sa propre attention.
            </p>
            <button className="btn-secondary">✉️ Me tenir informé(e)</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(32px, 5vw, 64px) clamp(20px, 5vw, 40px)', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
          <NyxDog expression="happy" size={110} animate />
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#3D2B1F', margin: '24px 0 12px' }}>
          Rejoins la communauté des Cavaliers
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#8B6F5C', marginBottom: '28px', maxWidth: '440px', margin: '0 auto 28px' }}>
          Des propriétaires passionnés, unis par leur amour pour ces petits cœurs à fourrure.
        </p>
        <button className="btn-primary" onClick={() => navigate('home')}>
          🐾 Commencer avec Nyx
        </button>
      </section>

      <footer style={{ padding: '36px clamp(20px, 5vw, 40px)', borderTop: '1px solid rgba(196,163,122,0.15)', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: '#3D2B1F', marginBottom: '8px' }}>
          🐾 CavalierCare
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic', fontSize: '14px', color: '#8B6F5C', marginBottom: '12px' }}>
          "Conçu avec amour, pour chaque Cavalier au monde."
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#8B6F5C', opacity: 0.6 }}>
          © 2026 CavalierCare — Fait avec ❤️ pour Nyx
        </p>
      </footer>
    </div>
  )
}
