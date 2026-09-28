/**
 * Page de Nyx des Prés : portrait, humeur, et routine du jour.
 */
import { useState } from 'react'
import NyxDog, { Expression } from '../components/NyxDog'
const nyxLeaves = `${import.meta.env.BASE_URL}photos/leaves.jpg`

const gallery = [
  { src: `${import.meta.env.BASE_URL}photos/lake.jpg`, alt: "Nyx au bord du lac, au soleil" },
  { src: `${import.meta.env.BASE_URL}photos/church.jpg`, alt: "Nyx devant l'église, en promenade" },
  { src: `${import.meta.env.BASE_URL}photos/sit.jpg`, alt: "Nyx assise dans l'herbe" },
  { src: `${import.meta.env.BASE_URL}photos/runfield.jpg`, alt: "Nyx qui court dans le pré" },
  { src: `${import.meta.env.BASE_URL}photos/toy.jpg`, alt: "Nyx avec son doudou" },
  { src: `${import.meta.env.BASE_URL}photos/sleep.jpg`, alt: "Nyx endormie" },
]

const moods: { id: Expression; label: string; icon: string; bubble: string }[] = [
  { id: 'happy', label: 'Content', icon: '😊', bubble: "Je me sens vraiment bien aujourd'hui ! Tout est parfait !" },
  { id: 'excited', label: 'Excité', icon: '🎉', bubble: "Promenade ?! PROMENADE ?! Allons-y vite !" },
  { id: 'content', label: 'Calme', icon: '😌', bubble: "Mmmh… Je suis bien au chaud et bien nourri." },
  { id: 'tired', label: 'Fatigué', icon: '😴', bubble: "Grosse journée… Je vais juste faire un petit somme." },
  { id: 'sad', label: 'Triste', icon: '🥺', bubble: "Tu n'as pas eu le temps pour ma promenade aujourd'hui ?" },
  { id: 'toofull', label: 'Trop plein', icon: '🤢', bubble: "J'ai un peu trop mangé… Reposons-nous un moment." },
]

const moodActions: Record<Expression, { icon: string; text: string }[]> = {
  happy: [
    { icon: '🦮', text: 'Promenade classique 40 min' },
    { icon: '🧩', text: 'Jeu de flair avec son jouet favori' },
  ],
  excited: [
    { icon: '🏃', text: 'Grande promenade + jeux de rappel' },
    { icon: '🎾', text: 'Séance de balle au parc' },
  ],
  content: [
    { icon: '🛋️', text: 'Câlins et repos sur le canapé' },
    { icon: '🚶', text: 'Balade tranquille dans le quartier' },
  ],
  tired: [
    { icon: '🦮', text: 'Courte sortie 15 min seulement' },
    { icon: '🍲', text: 'Cubes bouillon réconfortants ce soir' },
  ],
  sad: [
    { icon: '🤗', text: 'Extra câlins et présence maintenant' },
    { icon: '🦮', text: 'Petite balade calme rien que vous deux' },
  ],
  toofull: [
    { icon: '⏸️', text: 'Pause digestive 2h, pas de croquettes' },
    { icon: '🚶', text: 'Marche très douce 10 min après repas' },
  ],
}

const needsList = [
  { id: 'morning', icon: '🥩', label: 'Repas du matin', value: '135 g', color: '#D4E0D4' },
  { id: 'walk', icon: '🦮', label: 'Promenade', value: '45 min', color: '#F8D7C4' },
  { id: 'omega3', icon: '💊', label: 'Complément oméga-3', value: '1 capsule', color: '#F5D5D5' },
  { id: 'evening', icon: '🥩', label: 'Repas du soir', value: '135 g', color: '#FDF8F3' },
  { id: 'water', icon: '💧', label: 'Hydratation', value: '400 ml', color: '#D4E0D4' },
  { id: 'play', icon: '🧸', label: 'Temps de jeu', value: '20 min', color: '#F5D5D5' },
]

const milestoneMessages: Record<number, string> = {
  4: "Déjà 4/6 ! Je me sens de mieux en mieux 🌟",
  5: "Presque parfait ! Plus qu'un besoin… tu y es presque !",
  6: "WOW ! Tout coché ! C'est la meilleure journée ever ! 🎉",
}

export default function NyxPage() {
  const [expression, setExpression] = useState<Expression>('happy')
  const [clicked, setClicked] = useState(false)
  const [checked, setChecked] = useState<Set<string>>(new Set(['morning', 'omega3', 'water']))
  const [milestone, setMilestone] = useState<string | null>(null)
  const [milestoneKey, setMilestoneKey] = useState(0)

  const currentMood = moods.find((m) => m.id === expression)!
  const doneCount = checked.size
  const pct = Math.round((doneCount / needsList.length) * 100)

  const toggleNeed = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      const wasChecked = next.has(id)
      if (wasChecked) {
        next.delete(id)
      } else {
        next.add(id)
        const newCount = next.size
        if (milestoneMessages[newCount]) {
          setMilestone(milestoneMessages[newCount])
          setMilestoneKey((k) => k + 1)
          setTimeout(() => setMilestone(null), 3500)
        }
      }
      return next
    })
  }

  const handleDogClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 500)
  }

  const activeBubble = milestone ?? currentMood.bubble

  const progressColor = doneCount === 6
    ? 'linear-gradient(90deg, #C4A37A, #D4A85A)'
    : doneCount >= 4
    ? 'linear-gradient(90deg, #D4E0D4, #C4A37A)'
    : 'linear-gradient(90deg, #F8D7C4, #D4A87A)'

  return (
    <div style={{ minHeight: 'calc(100vh - 72px)', backgroundColor: 'var(--bg-app)' }}>
      <div className="page-pad" style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="chip" style={{ backgroundColor: '#F5D5D5', color: '#8B6F5C', marginBottom: '16px' }}>
            ✦ Compagnon interactif
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, color: '#3D2B1F', marginBottom: '8px' }}>
            Comment va <span style={{ color: '#C4A37A', fontStyle: 'italic' }}>Nyx</span> aujourd'hui ?
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#8B6F5C' }}>
            Nyx des Prés · blenheim, environ 9 kg. Clique sur le portrait, ou choisis l'humeur du jour.
          </p>
        </div>

        <div className="nyx-layout">

          {/* Left: Dog + mood + actions */}
          <div>
            {/* Dog stage */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>

              {/* Soft glow circle */}
              <div style={{
                position: 'absolute', width: '320px', height: '320px', borderRadius: '50%',
                background: 'radial-gradient(circle, var(--bg-card) 0%, var(--bg-app) 70%, transparent 100%)',
                boxShadow: '0 0 80px rgba(196,163,122,0.12)',
              }} />

              {/* Photo backdrop */}
              <div style={{ position: 'absolute', width: '260px', height: '260px', borderRadius: '50%', overflow: 'hidden', opacity: 0.1 }}>
                <img src={nyxLeaves} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Celebration ring for 6/6 */}
              {doneCount === 6 && (
                <div style={{
                  position: 'absolute', width: '300px', height: '300px', borderRadius: '50%',
                  border: '2px solid rgba(196,163,122,0.4)',
                  animation: 'float 3s ease-in-out infinite',
                }} />
              )}

              {/* NyxDog SVG */}
              <button
                type="button"
                className="dog-hit"
                onClick={handleDogClick}
                aria-label="Câliner Nyx"
                style={{ transform: clicked ? 'scale(0.94)' : 'scale(1)', transition: 'transform 0.15s' }}
              >
                <NyxDog expression={expression} size={250} animate tilt />
              </button>

              {/* Bubble */}
              <div
                key={`${expression}-${milestoneKey}`}
                className="nyx-bubble nyx-float-bubble"
                style={{
                  position: 'absolute', top: '20px', right: '6%', zIndex: 10, maxWidth: '220px',
                  ...(milestone ? { backgroundColor: 'var(--bg-elevated)', border: '1.5px solid rgba(196,163,122,0.4)' } : {}),
                }}
              >
                <span style={{ marginRight: '6px' }}>🐾</span>
                {activeBubble}
              </div>
            </div>

            {/* Mood selector */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' }} role="group" aria-label="Humeur de Nyx">
              {moods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={expression === m.id}
                  onClick={() => setExpression(m.id)}
                  style={{
                    minHeight: '44px',
                    padding: '9px 18px', borderRadius: '999px', transition: 'all 0.2s',
                    border: expression === m.id ? '1.5px solid #6B4423' : '1.5px solid rgba(139,111,92,0.2)',
                    backgroundColor: expression === m.id ? '#C4A37A' : 'var(--bg-card)',
                    color: '#3D2B1F',
                    fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600,
                    display: 'flex', alignItems: 'center', gap: '6px',
                  }}
                >
                  <span>{m.icon}</span>
                  {m.label}
                </button>
              ))}
            </div>

            {/* Action suggestions */}
            <div key={expression} className="card" style={{ padding: '22px', marginTop: '24px', animation: 'fadeSlideUp 0.3s ease-out' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 600, color: '#3D2B1F', marginBottom: '14px' }}>
                Actions recommandées pour ce moment
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {moodActions[expression].map((a, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px 16px', borderRadius: '12px', backgroundColor: 'var(--bg-app)',
                  }}>
                    <span style={{ fontSize: '20px', flexShrink: 0 }}>{a.icon}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#3D2B1F', fontWeight: 500 }}>
                      {a.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Needs checklist */}
          <div className="card sticky-panel" style={{ padding: '28px', position: 'sticky', top: '88px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: '#3D2B1F', marginBottom: '4px' }}>
              Besoins de Nyx aujourd'hui
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#8B6F5C', marginBottom: '20px' }}>
              Samedi 22 août 2026
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {needsList.map((n) => {
                const done = checked.has(n.id)
                return (
                  <button
                    key={n.id}
                    onClick={() => toggleNeed(n.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '12px 14px', borderRadius: '12px',
                      backgroundColor: done ? n.color : '#FFFBF7',
                      border: done ? '1.5px solid transparent' : '1.5px solid rgba(139,111,92,0.15)',
                      cursor: 'pointer', textAlign: 'left', width: '100%',
                      transition: 'all 0.25s ease',
                      opacity: done ? 1 : 0.75,
                    }}
                  >
                    <span style={{ fontSize: '18px', flexShrink: 0 }}>{n.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#3D2B1F',
                        textDecoration: done ? 'line-through' : 'none',
                        textDecorationColor: 'rgba(139,111,92,0.5)',
                      }}>
                        {n.label}
                      </div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#8B6F5C' }}>
                        {n.value}
                      </div>
                    </div>
                    <div style={{
                      width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                      backgroundColor: done ? '#C4A37A' : 'rgba(139,111,92,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', color: '#3D2B1F', fontWeight: 700,
                      transition: 'background-color 0.2s',
                    }}>
                      {done ? '✓' : ''}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Progress summary */}
            <div style={{ marginTop: '18px', padding: '16px', borderRadius: '14px', backgroundColor: 'var(--bg-app)', textAlign: 'center', transition: 'background-color 0.4s' }}>
              <div key={doneCount} style={{
                fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700, color: '#C4A37A',
                animation: 'pop-check 0.3s cubic-bezier(0.175,0.885,0.32,1.275)',
              }}>
                {doneCount}/6
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#8B6F5C', marginBottom: '10px' }}>
                {doneCount === 6 ? '🎉 Journée parfaite !' : `${6 - doneCount} besoin${6 - doneCount > 1 ? 's' : ''} restant${6 - doneCount > 1 ? 's' : ''}`}
              </div>
              <div style={{ height: '8px', borderRadius: '999px', backgroundColor: 'rgba(196,163,122,0.15)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${pct}%`, borderRadius: '999px',
                  background: progressColor,
                  transition: 'width 0.5s ease, background 0.4s ease',
                }} />
              </div>
              {doneCount === 6 && (
                <div key="celebrate" style={{
                  marginTop: '12px', padding: '8px 12px', borderRadius: '10px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid rgba(196,163,122,0.3)',
                  fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic',
                  fontSize: '13px', color: '#8B6F5C',
                  animation: 'celebrate 0.45s cubic-bezier(0.175,0.885,0.32,1.275)',
                }}>
                  "Nyx est au top aujourd'hui !" 🐾
                </div>
              )}
            </div>
          </div>
        </div>

        <section style={{ marginTop: '56px' }} aria-label="Photos de Nyx">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: '#3D2B1F', marginBottom: '8px' }}>
            Ses plus beaux moments
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#8B6F5C', marginBottom: '20px' }}>
            D’autres photos de Nyx, en plus de celles de l’accueil.
          </p>
          <div className="photo-grid">
            {gallery.map((photo) => (
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
