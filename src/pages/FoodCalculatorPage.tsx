/**
 * Calculateur de ration. Chaque choix relance le calcul tout de suite.
 * Le profil est gardé dans le navigateur pour la prochaine visite.
 */
import { useState, useMemo, useEffect } from 'react'
import NyxDog, { Expression } from '../components/NyxDog'
import NyxBubble from '../components/NyxBubble'
import ChoiceButtons from '../components/ChoiceButtons'
import { readTodayRecipe, RATION_EVENT, type TodayRecipe } from '../ration'
const nyxCrown = `${import.meta.env.BASE_URL}photos/crown.jpg'

interface FormState {
  weight: number
  age: string
  activity: string
  sensitivity: string
  goal: string
  season: string
}

const STORAGE_KEY = 'cavaliercare-profile'

const activityFactors: Record<string, number> = { low: 0.85, medium: 1.0, high: 1.2 }
const goalFactors: Record<string, number> = { loss: 0.85, maintain: 1.0, gain: 1.15 }
const ageFactors: Record<string, number> = { puppy: 1.25, junior: 1.1, adult: 1.0, senior: 0.88 }
const seasonFactors: Record<string, number> = { normal: 1.0, hot: 0.9, cold: 1.1 }

function calcRation(f: FormState) {
  const base = f.weight * 30
  const total = Math.round(base * activityFactors[f.activity] * goalFactors[f.goal] * ageFactors[f.age] * seasonFactors[f.season])
  return {
    total,
    viande: Math.round(total * 0.55),
    legumes: Math.round(total * 0.30),
    feculents: Math.round(total * 0.15),
    perMeal: Math.round(total / 2),
  }
}

function getNyxExpression(f: FormState, total: number): { expr: Expression; bubble: string } {
  if (f.goal === 'gain') return { expr: 'excited', bubble: "Super ! Je vais prendre des forces !" }
  if (f.goal === 'loss') return { expr: 'sad', bubble: "Régime… mais c'est pour mon bien !" }
  if (total > 400) return { expr: 'toofull', bubble: "Houla… c'est beaucoup ! Surveille mes portions." }
  if (total < 150) return { expr: 'sad', bubble: "C'est un peu léger pour moi..." }
  if (f.activity === 'high') return { expr: 'excited', bubble: "J'adore les journées actives !" }
  return { expr: 'happy', bubble: "Parfait ! C'est exactement ce qu'il me faut !" }
}

function deltaLabel(factor: number): string {
  const diff = Math.round((factor - 1.0) * 100)
  if (diff === 0) return 'référence'
  return diff > 0 ? `+${diff}%` : `${diff}%`
}

const defaultForm: FormState = {
  weight: 9, age: 'adult', activity: 'medium', sensitivity: 'normal', goal: 'maintain', season: 'normal',
}

export default function FoodCalculatorPage() {
  const [form, setForm] = useState<FormState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? { ...defaultForm, ...JSON.parse(saved) } : defaultForm
    } catch {
      return defaultForm
    }
  })
  const [savedFlash, setSavedFlash] = useState(false)
  const [today, setToday] = useState<TodayRecipe | null>(null)

  useEffect(() => {
    const sync = () => setToday(readTodayRecipe())
    sync()
    window.addEventListener(RATION_EVENT, sync)
    return () => window.removeEventListener(RATION_EVENT, sync)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
    setSavedFlash(true)
    const t = setTimeout(() => setSavedFlash(false), 1800)
    return () => clearTimeout(t)
  }, [form])

  const result = useMemo(() => calcRation(form), [form])
  const { expr, bubble } = useMemo(() => getNyxExpression(form, result.total), [form, result.total])
  const shownExpr: Expression = today && (expr === 'happy' || expr === 'content') ? 'excited' : expr
  const shownBubble = today ? `Aujourd'hui : ${today.title}. ${bubble}` : bubble
  const update = (key: keyof FormState, value: string | number) => setForm((prev) => ({ ...prev, [key]: value }))

  const neutralTotal = Math.round(form.weight * 30)
  const diff = result.total - neutralTotal
  const diffLabel = diff === 0 ? null : diff > 0 ? `+${diff} g vs base neutre` : `${diff} g vs base neutre`

  const bars = [
    { label: 'Viande & protéines', value: result.viande, color: '#C4A37A', pct: 55 },
    { label: 'Légumes', value: result.legumes, color: '#D4E0D4', pct: 30 },
    { label: 'Féculents', value: result.feculents, color: '#F8D7C4', pct: 15 },
  ]

  return (
    <div style={{ minHeight: 'calc(100vh - 72px)', backgroundColor: 'var(--bg-app)' }}>
      <div className="page-pad" style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="chip" style={{ backgroundColor: '#F8D7C4', color: '#8B6F5C', marginBottom: '16px' }}>🥩 Calculateur de ration</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 700, color: '#3D2B1F', marginBottom: '8px' }}>
              La ration parfaite pour ton <span style={{ color: '#C4A37A', fontStyle: 'italic' }}>Cavalier</span>
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#8B6F5C' }}>
              Résultats en temps réel · Profil sauvegardé localement
            </p>
          </div>
          {savedFlash && (
            <p role="status" style={{
              padding: '8px 16px', borderRadius: '999px', backgroundColor: '#D4E0D4',
              fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#2F4A32', fontWeight: 600,
            }}>
              Profil sauvegardé
            </p>
          )}
        </div>

        <div className="two-col">

          {/* Form */}
          <div className="card" style={{ padding: 'clamp(24px, 3vw, 36px)' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 600, color: '#3D2B1F', marginBottom: '24px' }}>
              Profil de ton Cavalier
            </h2>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label htmlFor="poids" style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Poids</label>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700, color: '#6B4423' }}>{form.weight} kg</span>
              </div>
              <input
                id="poids"
                type="range"
                min={3}
                max={15}
                step={0.5}
                value={form.weight}
                aria-valuemin={3}
                aria-valuemax={15}
                aria-valuenow={form.weight}
                aria-valuetext={`${form.weight} kilogrammes`}
                onChange={(e) => update('weight', parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#6B4423', height: '28px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#5C4638' }}>3 kg</span>
                <span style={{ fontSize: '12px', color: '#5C4638' }}>15 kg</span>
              </div>
            </div>

            <ChoiceButtons
              label="Âge"
              value={form.age}
              columns={2}
              onChange={(value) => update('age', value)}
              options={[
                { value: 'puppy', label: 'Chiot', hint: `< 6 mois · ${deltaLabel(ageFactors.puppy)}` },
                { value: 'junior', label: 'Junior', hint: `6–18 mois · ${deltaLabel(ageFactors.junior)}` },
                { value: 'adult', label: 'Adulte', hint: `1,5–8 ans · ${deltaLabel(ageFactors.adult)}` },
                { value: 'senior', label: 'Senior', hint: `> 8 ans · ${deltaLabel(ageFactors.senior)}` },
              ]}
            />
            <ChoiceButtons
              label="Niveau d'activité"
              value={form.activity}
              onChange={(value) => update('activity', value)}
              options={[
                { value: 'low', label: 'Faible', hint: deltaLabel(activityFactors.low) },
                { value: 'medium', label: 'Moyen', hint: deltaLabel(activityFactors.medium) },
                { value: 'high', label: 'Élevé', hint: deltaLabel(activityFactors.high) },
              ]}
            />
            <ChoiceButtons
              label="Saison"
              value={form.season}
              onChange={(value) => update('season', value)}
              options={[
                { value: 'hot', label: 'Canicule', hint: deltaLabel(seasonFactors.hot) },
                { value: 'normal', label: 'Normal', hint: deltaLabel(seasonFactors.normal) },
                { value: 'cold', label: 'Grand froid', hint: deltaLabel(seasonFactors.cold) },
              ]}
            />

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="digestion" style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Sensibilité digestive</label>
              <select id="digestion" className="input-field" value={form.sensitivity} onChange={(e) => update('sensitivity', e.target.value)}>
                <option value="normal">Digestion normale</option>
                <option value="sensitive">Sensible (transit fragile)</option>
                <option value="verysensitive">Très sensible (allergies)</option>
              </select>
            </div>

            <ChoiceButtons
              label="Objectif"
              value={form.goal}
              onChange={(value) => update('goal', value)}
              options={[
                { value: 'loss', label: 'Perte', hint: '-15 %' },
                { value: 'maintain', label: 'Maintien', hint: 'idéal' },
                { value: 'gain', label: 'Prise', hint: '+15 %' },
              ]}
            />
          </div>

          {/* Results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

            {/* Nyx */}
            <div className="card" style={{ padding: '22px', display: 'flex', alignItems: 'center', gap: '18px' }}>
              <NyxDog expression={shownExpr} size={110} animate />
              <NyxBubble text={shownBubble} />
            </div>

            {/* Total */}
            <div className="card" style={{ padding: '28px', background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-app) 100%)', textAlign: 'center' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#8B6F5C', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Ration journalière totale
              </p>
              <div key={result.total} aria-live="polite" style={{
                fontFamily: "'Playfair Display', serif", fontSize: 'clamp(52px, 8vw, 72px)', fontWeight: 700, color: '#C4A37A', lineHeight: 1,
              }}>
                {result.total}
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', color: '#8B6F5C', marginBottom: '6px' }}>grammes</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#8B6F5C', marginBottom: diffLabel ? '10px' : '0' }}>
                soit <strong style={{ color: '#C4A37A' }}>{result.perMeal} g</strong> par repas (2 repas/jour)
              </div>
              {diffLabel && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  padding: '4px 12px', borderRadius: '999px',
                  backgroundColor: diff > 0 ? 'rgba(92,122,92,0.12)' : 'rgba(176,96,96,0.1)',
                  fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500,
                  color: diff > 0 ? '#5C7A5C' : '#B06060',
                }}>
                  {diff > 0 ? '↑' : '↓'} {diffLabel}
                </div>
              )}
              {today && (
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#8B6F5C', marginTop: '12px' }}>
                  {today.emoji} Recette du jour : <strong style={{ color: '#3D2B1F' }}>{today.title}</strong>
                </p>
              )}
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#8B6F5C', marginTop: '14px', lineHeight: 1.5 }}>
                Repère pour Nyx (~9 kg). Une alimentation maison au long cours demande un complément canin complet, validé avec un vétérinaire nutritionniste.
              </p>
            </div>

            {/* Distribution */}
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', fontWeight: 600, color: '#3D2B1F', marginBottom: '18px' }}>
                Répartition recommandée
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {bars.map((b) => (
                  <div key={b.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#3D2B1F' }}>{b.label}</span>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '14px', fontWeight: 600, color: '#C4A37A' }}>{b.value} g</span>
                    </div>
                    <div style={{ height: '8px', borderRadius: '999px', backgroundColor: 'rgba(139,111,92,0.1)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${b.pct}%`, borderRadius: '999px', backgroundColor: b.color, transition: 'width 0.5s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tip */}
            <div style={{ padding: '18px', borderRadius: '16px', backgroundColor: '#D4E0D4', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '18px' }}>💡</span>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#3D2B1F', marginBottom: '4px' }}>Conseil Cavalier</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#5C7A5C', lineHeight: 1.5, margin: 0 }}>
                  {form.sensitivity !== 'normal'
                    ? "Avec un estomac sensible, privilégie le poulet blanc bouilli et le riz complet. Évite les légumineuses."
                    : form.season === 'hot'
                    ? "Par canicule, divise la ration en 3 repas et augmente l'hydratation (+20%). Évite de nourrir en pleine chaleur."
                    : "Ajoute toujours un complément oméga-3 (huile de saumon) pour le cœur de ton Cavalier. C'est essentiel pour la race !"}
                </p>
              </div>
            </div>

            {/* Photo */}
            <div style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', height: '150px' }}>
              <img src={nyxCrown} alt="Nyx avec sa couronne" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 55%' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(61,43,31,0.55) 0%, transparent 60%)' }} />
              <p style={{ position: 'absolute', bottom: '12px', left: '14px', fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic', fontSize: '13px', color: 'white' }}>
                "Même les petites portions peuvent être délicieuses !"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
