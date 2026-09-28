/**
 * Programme de promenade selon la météo, l'âge et le temps disponible.
 */
import { useState, useMemo } from 'react'
import NyxDog from '../components/NyxDog'
import NyxBubble from '../components/NyxBubble'
import ChoiceButtons from '../components/ChoiceButtons'
const nyxForest = `${import.meta.env.BASE_URL}photos/forest.jpg'
const nyxRunning = `${import.meta.env.BASE_URL}photos/running.jpg'
const nyxLake = `${import.meta.env.BASE_URL}photos/lake.jpg'
const nyxField = `${import.meta.env.BASE_URL}photos/runfield.jpg'

interface WalkForm {
  weather: string
  dogAge: string
  energy: string
  timeAvailable: string
}

interface WalkResult {
  duration: number
  intensity: number
  intensityLabel: string
  tips: string[]
  nyxSays: string
}

function calcWalk(f: WalkForm): WalkResult {
  let duration = 35
  let intensity = 50

  if (f.dogAge === 'puppy') { duration -= 10; intensity -= 20 }
  else if (f.dogAge === 'senior') { duration -= 8; intensity -= 15 }

  if (f.energy === 'high') { duration += 15; intensity += 20 }
  else if (f.energy === 'low') { duration -= 12; intensity -= 20 }

  if (f.weather === 'hot') { duration -= 15; intensity -= 25 }
  else if (f.weather === 'rainy') { duration -= 5 }
  else if (f.weather === 'cold') { intensity -= 5 }
  else if (f.weather === 'sunny') { intensity += 10 }

  const maxMap: Record<string, number> = { '15': 15, '30': 30, '45': 45, '60': 60, 'more': 120 }
  duration = Math.min(duration, maxMap[f.timeAvailable])
  duration = Math.max(duration, 10)
  intensity = Math.min(Math.max(intensity, 15), 95)

  const tips: string[] = []
  if (f.weather === 'hot') tips.push("🌡️ Chaleur : promenez tôt le matin ou tard le soir. Évitez l'asphalte brûlant.")
  if (f.weather === 'hot') tips.push("💧 Apportez de l'eau fraîche et proposez-en toutes les 10 minutes.")
  if (f.weather === 'rainy') tips.push("☔ Séchez bien les oreilles après la promenade pour éviter les infections.")
  if (f.weather === 'cold') tips.push("🧥 En dessous de 5°C, raccourcissez les pauses et évitez les zones humides.")
  if (f.dogAge === 'puppy') tips.push("🐶 Chiot : plusieurs courtes sorties valent mieux qu'une longue pour protéger les articulations.")
  if (f.dogAge === 'senior') tips.push("🐕 Senior : prévoyez des pauses régulières et surveillez les signes de fatigue.")
  if (f.energy === 'high') tips.push("🏃 Haute énergie : profitez pour pratiquer le rappel et les jeux de flair !")
  if (f.energy === 'low') tips.push("😌 Basse énergie : marchée tranquille, beaucoup d'olfaction libre, pauses fréquentes.")
  if (duration > 45) tips.push("⏸️ Prévoyez une pause hydratation à mi-parcours.")
  tips.push("🐾 Les Cavaliers adorent renifler – laissez-lui le temps d'explorer à son rythme.")

  let intensityLabel = 'Modérée'
  if (intensity < 35) intensityLabel = 'Douce'
  else if (intensity > 65) intensityLabel = 'Soutenue'

  const bubbles: Record<string, string> = {
    hot: "Il fait très chaud… N'oublie pas mon eau ! La promenade courte me convient parfaitement.",
    rainy: "La pluie ne me dérange pas, mais j'adore qu'on me sèche les oreilles après !",
    cold: "Le froid réveille mes instincts ! Mais pas trop long quand même…",
    sunny: "Quelle belle journée ! Je pourrais marcher des heures comme ça !",
    overcast: "Temps doux, parfait pour explorer ! Allons-y !",
  }

  return {
    duration,
    intensity,
    intensityLabel,
    tips: tips.slice(0, 4),
    nyxSays: bubbles[f.weather] || "Prêt pour l'aventure !",
  }
}

export default function WalkPlannerPage() {
  const [form, setForm] = useState<WalkForm>({ weather: 'sunny', dogAge: 'adult', energy: 'medium', timeAvailable: '60' })
  const [showResult, setShowResult] = useState(false)
  const result = useMemo(() => calcWalk(form), [form])
  const update = (key: keyof WalkForm, val: string) => setForm((p) => ({ ...p, [key]: val }))

  return (
    <div style={{ minHeight: 'calc(100vh - 72px)', backgroundColor: 'var(--bg-app)' }}>
      <div className="page-pad" style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ marginBottom: '40px' }}>
          <div className="chip" style={{ backgroundColor: '#D4E0D4', color: '#5C7A5C', marginBottom: '16px' }}>🦮 Programme de promenade</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 700, color: '#3D2B1F', marginBottom: '8px' }}>
            La promenade <span style={{ color: '#C4A37A', fontStyle: 'italic' }}>idéale</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#8B6F5C' }}>
            Génère un programme adapté à la météo, à l'énergie de Nyx et à ton emploi du temps.
          </p>
        </div>

        <div className="two-col">

          {/* Form */}
          <div className="card" style={{ padding: 'clamp(24px, 3vw, 36px)' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 600, color: '#3D2B1F', marginBottom: '24px' }}>
              Situation du jour
            </h2>

            <ChoiceButtons
              label="Météo"
              value={form.weather}
              onChange={(value) => update('weather', value)}
              options={[
                { value: 'sunny', label: 'Ensoleillé' },
                { value: 'overcast', label: 'Nuageux' },
                { value: 'rainy', label: 'Pluvieux' },
                { value: 'hot', label: 'Très chaud' },
                { value: 'cold', label: 'Froid' },
                { value: 'windy', label: 'Venteux' },
              ]}
            />
            <ChoiceButtons
              label="Âge de Nyx"
              value={form.dogAge}
              onChange={(value) => update('dogAge', value)}
              options={[
                { value: 'puppy', label: 'Chiot' },
                { value: 'adult', label: 'Adulte' },
                { value: 'senior', label: 'Senior' },
              ]}
            />
            <ChoiceButtons
              label="Niveau d'énergie"
              value={form.energy}
              onChange={(value) => update('energy', value)}
              options={[
                { value: 'low', label: 'Fatigué' },
                { value: 'medium', label: 'Normal' },
                { value: 'high', label: 'Débordant' },
              ]}
            />

            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="temps" style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Temps disponible</label>
              <select id="temps" className="input-field" value={form.timeAvailable} onChange={(e) => update('timeAvailable', e.target.value)}>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 heure</option>
                <option value="more">Plus d'une heure</option>
              </select>
            </div>

            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setShowResult(true)}>
              🦮 Générer mon programme
            </button>
          </div>

          {/* Results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

            {/* Nyx + bubble */}
            <div className="card" style={{ padding: '22px', display: 'flex', alignItems: 'center', gap: '18px' }}>
              <NyxDog expression={form.energy === 'high' ? 'excited' : form.energy === 'low' ? 'tired' : 'happy'} size={88} animate />
              <NyxBubble text={result.nyxSays} />
            </div>

            {showResult && (
              <div className="card" style={{ padding: '28px', animation: 'fadeSlideUp 0.35s ease-out' }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: '#3D2B1F', marginBottom: '20px' }}>
                  Programme recommandé
                </h2>

                <div style={{ textAlign: 'center', marginBottom: '24px', padding: '20px', borderRadius: '14px', backgroundColor: '#FDF8F3' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(48px, 8vw, 64px)', fontWeight: 700, color: '#C4A37A', lineHeight: 1 }}>
                    {result.duration}
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#8B6F5C' }}>minutes</div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 500, color: '#3D2B1F' }}>Intensité</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600, color: '#C4A37A' }}>
                      {result.intensityLabel} ({result.intensity}%)
                    </span>
                  </div>
                  <div style={{ height: '10px', borderRadius: '999px', backgroundColor: 'rgba(139,111,92,0.12)', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${result.intensity}%`, borderRadius: '999px',
                      background: `linear-gradient(90deg, #D4E0D4, #C4A37A)`,
                      transition: 'width 0.6s ease',
                    }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#8B6F5C' }}>Douce</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#8B6F5C' }}>Intense</span>
                  </div>
                </div>

                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', fontWeight: 600, color: '#3D2B1F', marginBottom: '10px' }}>
                  Conseils pour cette sortie
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {result.tips.map((tip, i) => (
                    <div key={i} style={{ padding: '11px 13px', borderRadius: '10px', backgroundColor: '#FDF8F3', fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#3D2B1F', lineHeight: 1.5 }}>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photos — unique Nyx images (forest & running, not reused elsewhere) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <img src={nyxForest} alt="Nyx qui bondit dans la forêt" loading="lazy" decoding="async" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '14px', objectPosition: 'center 20%' }} />
              <img src={nyxRunning} alt="Nyx qui court" loading="lazy" decoding="async" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '14px' }} />
              <img src={nyxLake} alt="Nyx au bord de l’eau" loading="lazy" decoding="async" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '14px', objectPosition: 'center 70%' }} />
              <img src={nyxField} alt="Nyx qui file dans le pré" loading="lazy" decoding="async" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '14px', objectPosition: 'center 30%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
