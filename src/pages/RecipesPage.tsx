/**
 * Liste des recettes. Un filtre choisit la catégorie.
 * « Ajouter à la ration » prévient le calculateur via ration.ts.
 */
import { useEffect, useState } from 'react'
import { saveTodayRecipe } from '../ration'

interface Recipe {
  id: string
  title: string
  tags: string[]
  categories: string[]
  prep: string
  portion: string
  frequency: string
  image: string
  desc: string
  ingredients: string[]
  steps: string[]
  benefits: { icon: string; label: string; detail: string }[]
  supplements: string[]
  whyCavalier: string
  nyxTip: string
  emoji: string
}

// Each recipe has a unique Unsplash food photo matched to its content
const recipes: Recipe[] = [
  {
    id: 'digestive',
    title: 'Classique Digestive',
    tags: ['Digestif', 'Quotidien', 'Sensible'],
    categories: ['Digestif', 'Spécial Cavalier'],
    prep: '25 min',
    portion: '270–290 g / jour',
    frequency: 'Tous les jours',
    image:  `${import.meta.env.BASE_URL}recipes/digestive.jpg`,
    desc: "La recette du quotidien, douce pour l'estomac et parfaitement équilibrée. Idéale pour les Cavaliers à digestion sensible.",
    ingredients: [
      "300 g de poulet (cuisse ou blanc) cuit",
      "150 g de riz complet cuit",
      "80 g de carottes cuites",
      "60 g de courgette ou haricots verts cuits",
      "1 œuf cuit",
      "1 c. à café d'huile de saumon",
      "Complément vitaminique canin",
    ],
    steps: [
      "Faire cuire le poulet à l'eau ou à la vapeur.",
      "Cuire le riz et les légumes jusqu'à ce qu'ils soient bien tendres.",
      "Mélanger le tout une fois refroidi.",
      "Ajouter l'huile de saumon et le complément juste avant de servir.",
    ],
    benefits: [
      { icon: '👁️', label: 'Vitamine A', detail: 'Vision et immunité (carottes)' },
      { icon: '⚡', label: 'Vitamines B', detail: 'Énergie et système nerveux' },
      { icon: '🩸', label: 'Fer & Zinc', detail: 'Vitalité et peau (poulet)' },
      { icon: '💪', label: 'Magnésium', detail: 'Fonction cardiaque' },
      { icon: '🐟', label: 'Oméga-3', detail: 'Anti-inflammatoire' },
    ],
    supplements: [
      "Complément complet (obligatoire)",
      "Huile de saumon quotidienne",
      "Probiotique si digestion fragile",
    ],
    whyCavalier: "Très digeste, équilibré et doux pour les estomacs sensibles de la race.",
    nyxTip: "C'est mon plat préféré ! Je le reconnais à l'odeur rien qu'en sortant du frigo.",
    emoji: '🍗',
  },
  {
    id: 'cardiac',
    title: 'Cœur Protégé',
    tags: ['Cardiaque', 'Oméga-3', 'Premium'],
    categories: ['Spécial Cavalier', 'Sportif'],
    prep: '30 min',
    portion: '260–280 g',
    frequency: '2 à 3 fois par semaine',
    image: `${import.meta.env.BASE_URL}recipes/cardiac.jpg`,
    desc: "Spécialement conçue pour soutenir le cœur, point faible numéro 1 des Cavaliers. Riche en oméga-3 et taurine naturelle.",
    ingredients: [
      "250 g de saumon ou sardines cuites (sans arêtes)",
      "120 g de patate douce cuite",
      "70 g d'épinards cuits",
      "50 g de brocoli cuit",
      "½ foie de poulet (1–2 fois/semaine maximum)",
      "1 c. à café d'huile de saumon ou de krill",
      "Complément + Taurine",
    ],
    steps: [
      "Cuire le poisson à la vapeur ou au four sans matière grasse.",
      "Cuire la patate douce et les légumes séparément.",
      "Mélanger à température ambiante.",
      "Ajouter l'huile et les compléments au moment de servir.",
    ],
    benefits: [
      { icon: '❤️', label: 'Oméga-3 EPA & DHA', detail: 'Protection cardiaque (poisson)' },
      { icon: '💓', label: 'Taurine naturelle', detail: "Muscle du cœur" },
      { icon: '☀️', label: 'Vitamine D', detail: 'Absorption du calcium' },
      { icon: '🛡️', label: 'Sélénium & Iode', detail: 'Antioxydant et thyroïde' },
      { icon: '🩺', label: 'Vitamine K', detail: 'Coagulation (épinards)' },
    ],
    supplements: [
      "Huile de saumon dose cardiaque",
      "Taurine 500–1000 mg",
      "CoQ10 (surtout après 5 ans)",
      "Complément complet",
    ],
    whyCavalier: "Spécialement conçue pour soutenir le cœur, point faible n°1 de la race.",
    nyxTip: "L'odeur du saumon, c'est mon kryptonite. Je me tiens vraiment très sage !",
    emoji: '🐟',
  },
  {
    id: 'energy',
    title: 'Énergie Active',
    tags: ['Sportif', 'Énergie', 'Récupération'],
    categories: ['Sportif'],
    prep: '20 min',
    portion: '285–300 g',
    frequency: 'Jours très actifs',
    image: `${import.meta.env.BASE_URL}recipes/energy.jpg`,
    desc: "Pour les journées pleines d'aventures. Apporte de l'énergie durable sans surcharger la digestion.",
    ingredients: [
      "280 g de dinde hachée cuite",
      "100 g de quinoa cuit",
      "80 g de potiron ou courge cuite",
      "50 g de petits pois",
      "1 c. à café d'huile d'olive",
      "½ c. à café d'huile de saumon",
      "Complément vitaminique/minéral",
    ],
    steps: [
      "Faire revenir légèrement la dinde sans matières grasses.",
      "Cuire le quinoa et les légumes séparément.",
      "Laisser refroidir, puis tout mélanger.",
      "Ajouter les huiles et le complément au service.",
    ],
    benefits: [
      { icon: '💪', label: 'Protéines complètes', detail: 'Muscles et récupération (dinde)' },
      { icon: '🫀', label: 'Magnésium', detail: 'Anti-crampes et cœur (quinoa)' },
      { icon: '🛡️', label: 'Vitamine C', detail: 'Immunité (légumes)' },
      { icon: '🌿', label: 'Fibres solubles', detail: 'Transit régulier' },
      { icon: '✨', label: 'Zinc', detail: 'Peau et pelage brillant' },
    ],
    supplements: [
      "Complément complet",
      "Oméga-3",
      "Probiotique (optionnel)",
    ],
    whyCavalier: "Apporte de l'énergie durable sans surcharger la digestion.",
    nyxTip: "Après une grande course dans les bois, c'est exactement ce qu'il me faut !",
    emoji: '🦃',
  },
  {
    id: 'bland',
    title: 'Ultra Douce',
    tags: ['Digestif fort', 'Récupération', 'Temporaire'],
    categories: ['Digestif'],
    prep: '15 min',
    portion: '200–250 g',
    frequency: '2 à 4 jours max',
    image: `${import.meta.env.BASE_URL}recipes/bland.jpg`,
    desc: "Version bland diet améliorée. À utiliser en cas de diarrhée ou d'estomac très fragile. Très digeste, reposante pour l'intestin.",
    ingredients: [
      "200 g de poulet blanc bouilli",
      "200 g de riz blanc très cuit",
      "50 g de carotte très cuite",
      "1 c. à café d'huile de saumon",
      "Probiotique canin",
    ],
    steps: [
      "Tout cuire à l'eau, bien écraser les légumes si besoin.",
      "Servir tiède (jamais chaud).",
      "Revenir à une recette complète après 2–4 jours.",
    ],
    benefits: [
      { icon: '🌿', label: 'Ultra digeste', detail: "Repose l'intestin" },
      { icon: '🐟', label: 'Oméga-3', detail: 'Anti-inflammatoire doux' },
      { icon: '🥕', label: 'Vitamine A', detail: 'Immunité (carottes)' },
    ],
    supplements: [
      "Probiotique canin (essentiel)",
      "Reprendre le complément complet dès que possible",
    ],
    whyCavalier: "Cette recette n'est pas complète. Revenir rapidement à une recette équilibrée + complément.",
    nyxTip: "Je mange moins vite quand ça ne va pas… Mais ça passe, promis.",
    emoji: '🍚',
  },
  {
    id: 'biscuits',
    title: 'Biscuits Patate Douce',
    tags: ['Snack', 'Healthy', 'Croquant'],
    categories: ['Snacks'],
    prep: '35 min + 25 min four',
    portion: '2 à 4 biscuits / jour max',
    frequency: 'Occasionnel',
    image: `${import.meta.env.BASE_URL}recipes/biscuits.jpg`,
    desc: "Des biscuits maison croustillants et naturellement sucrés, parfaits pour faire plaisir sans culpabiliser. Idéals en récompense pendant le dressage ou en goûter.",
    ingredients: [
      "1 grosse patate douce cuite écrasée (environ 250 g)",
      "1 œuf",
      "80 à 100 g de farine d'avoine (ou farine de riz)",
      "1 c. à café d'huile de coco (optionnel)",
    ],
    steps: [
      "Écraser finement la patate douce cuite.",
      "Ajouter l'œuf et la farine d'avoine jusqu'à obtenir une pâte souple.",
      "Former de petits biscuits ou utiliser un emporte-pièce.",
      "Enfourner à 180 °C pendant 20–25 min jusqu'à dorure.",
      "Laisser complètement refroidir avant de donner.",
    ],
    benefits: [
      { icon: '👁️', label: 'Vitamine A', detail: 'Vision et immunité' },
      { icon: '🌿', label: 'Fibres', detail: 'Aide au transit' },
      { icon: '🛡️', label: 'Antioxydants', detail: 'Protection cellulaire' },
      { icon: '⚖️', label: 'Faible en graisses', detail: 'Adapté au contrôle du poids' },
    ],
    supplements: ["Aucun complément nécessaire"],
    whyCavalier: "Croquant sans être agressif pour les dents, digeste et naturellement appétissant.",
    nyxTip: "Ces biscuits, c'est mon péché mignon. Mais maman ne m'en donne jamais trop !",
    emoji: '🍠',
  },
  {
    id: 'boules',
    title: 'Boules Énergie',
    tags: ['Snack', 'Énergie', 'Gourmand'],
    categories: ['Snacks', 'Sportif'],
    prep: '10 min + 30 min frigo',
    portion: '1 à 2 boules / jour max',
    frequency: 'Occasionnel',
    image: `${import.meta.env.BASE_URL}recipes/balls.jpg`,
    desc: "Petites boules ultra-gourmandes et énergétiques. Parfaites après une longue promenade ou comme récompense très motivante.",
    ingredients: [
      "3 c. à soupe de beurre de cacahuète 100 % naturel (sans xylitol, sans sucre ajouté, sans sel)",
      "60 g de farine d'avoine",
      "1 c. à soupe d'eau ou de bouillon de poulet non salé (si besoin)",
    ],
    steps: [
      "Mélanger le beurre de cacahuète et la farine d'avoine jusqu'à obtenir une pâte qui se tient.",
      "Former de petites boules de la taille d'une noix.",
      "Placer au réfrigérateur 30 minutes pour les raffermir.",
      "Conserver au frais jusqu'à 5 jours.",
    ],
    benefits: [
      { icon: '💪', label: 'Protéines végétales', detail: 'Petit apport énergétique' },
      { icon: '🛡️', label: 'Vitamine E', detail: 'Antioxydant' },
      { icon: '🫀', label: 'Magnésium', detail: 'Soutien musculaire' },
      { icon: '🎯', label: 'Très appétant', detail: 'Excellent pour le dressage' },
    ],
    supplements: ["⚠️ Vérifier que le beurre de cacahuète ne contient pas de xylitol (toxique pour les chiens)"],
    whyCavalier: "Très motivant pour le rappel et les exercices, tout en restant simple et naturel.",
    nyxTip: "Quand je sens l'odeur de cacahuète, je suis prêt à tout faire !",
    emoji: '🥜',
  },
  {
    id: 'bouillon',
    title: 'Cubes Bouillon Digestif',
    tags: ['Snack', 'Hydratation', 'Digestif'],
    categories: ['Digestif', 'Snacks'],
    prep: '60 min + congélation',
    portion: '2 à 4 cubes / jour',
    frequency: 'Tous les jours si besoin',
    image: `${import.meta.env.BASE_URL}recipes/broth.jpg`,
    desc: "Des petits cubes de bouillon maison ultra digestes. Parfaits pour hydrater, faire plaisir ou accompagner un repas quand l'appétit est capricieux.",
    ingredients: [
      "500 ml d'eau",
      "150 g de poulet (os et peau retirés)",
      "1 carotte",
      "½ courgette",
      "Une pincée de curcuma (optionnel)",
    ],
    steps: [
      "Faire mijoter le poulet et les légumes dans l'eau pendant 40–50 minutes.",
      "Filtrer le bouillon (possibilité de mixer légèrement les légumes).",
      "Laisser refroidir complètement.",
      "Verser dans des bacs à glaçons et congeler.",
      "Sortir 1 ou 2 cubes selon besoin.",
    ],
    benefits: [
      { icon: '💧', label: 'Hydratation', detail: 'Très important pour les Cavaliers' },
      { icon: '⚡', label: 'Potassium & Magnésium', detail: 'Soutien global' },
      { icon: '👁️', label: 'Vitamine A', detail: 'Vision et immunité (carotte)' },
      { icon: '🌿', label: 'Ultra digeste', detail: 'Idéal en cas de transit sensible' },
    ],
    supplements: [
      "Aucun complément nécessaire",
      "Peut être mélangé à la ration",
    ],
    whyCavalier: "Léger, hydratant et réconfortant. Parfait les jours de chaleur ou quand Nyx mange moins.",
    nyxTip: "Ces petits cubes froids, c'est mon goûter préféré en été.",
    emoji: '🧊',
  },
  {
    id: 'chips',
    title: 'Chips de Carotte',
    tags: ['Snack', 'Croquant', 'Léger'],
    categories: ['Snacks', 'Digestif'],
    prep: '10 min + 2h four',
    portion: 'Une petite poignée',
    frequency: 'Occasionnel',
    image: `${import.meta.env.BASE_URL}recipes/chips.jpg`,
    desc: "Des chips 100 % naturelles, croustillantes et ultra légères. L'alternative healthy aux friandises industrielles.",
    ingredients: [
      "3 à 4 grosses carottes",
      "Rien d'autre !",
    ],
    steps: [
      "Laver et couper les carottes en très fines rondelles (mandoline recommandée).",
      "Disposer sur une plaque sans chevauchement.",
      "Enfourner à 120–130 °C pendant 1h30 à 2h en surveillant.",
      "Laisser refroidir complètement.",
      "Conserver dans une boîte hermétique.",
    ],
    benefits: [
      { icon: '👁️', label: 'Vitamine A', detail: 'Vision, peau, immunité' },
      { icon: '🌿', label: 'Fibres', detail: 'Satiété et transit' },
      { icon: '⚖️', label: 'Quasi zéro calorie', detail: 'Contrôle du poids' },
      { icon: '🦷', label: 'Croquant satisfaisant', detail: 'Occupe et fait plaisir' },
    ],
    supplements: ["Aucun complément nécessaire"],
    whyCavalier: "Léger, digeste et sans additifs. Idéal pour les chiens qui ont tendance à prendre du poids.",
    nyxTip: "Ça croustille et ça me fait du bien aux dents. J'adore !",
    emoji: '🥕',
  },
]

const filterCategories = ['Tous', 'Digestif', 'Sportif', 'Snacks', 'Spécial Cavalier']

export default function RecipesPage() {
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [addedName, setAddedName] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedRecipe) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedRecipe(null)
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [selectedRecipe])

  const filtered = activeFilter === 'Tous' ? recipes : recipes.filter((r) => r.categories.includes(activeFilter))

  function addToDay(recipe: Recipe) {
    saveTodayRecipe({ id: recipe.id, title: recipe.title, emoji: recipe.emoji })
    setAddedName(recipe.title)
    setSelectedRecipe(null)
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 72px)', backgroundColor: 'var(--bg-app)' }}>
      <div className="page-pad" style={{ maxWidth: '1280px', margin: '0 auto' }}>

        <div style={{ marginBottom: '40px' }}>
          <div className="chip" style={{ backgroundColor: '#F8D7C4', color: '#8B6F5C', marginBottom: '16px' }}>🥘 Recettes maison</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#3D2B1F', marginBottom: '8px' }}>
            Cuisine avec <span style={{ color: '#C4A37A', fontStyle: 'italic' }}>amour</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#8B6F5C' }}>
            Recettes saines et équilibrées, conçues spécialement pour les Cavaliers King Charles.
          </p>
          {addedName && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic', fontSize: '15px', color: '#3D2B1F', marginTop: '14px' }}>
              Nyx a mis « {addedName} » dans la ration du jour. Le calculateur a changé d'expression.
            </p>
          )}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }} role="group" aria-label="Filtrer les recettes">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={activeFilter === cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                minHeight: '44px',
                padding: '9px 20px', borderRadius: '999px',
                border: activeFilter === cat ? '1.5px solid #6B4423' : '1.5px solid rgba(139,111,92,0.2)',
                backgroundColor: activeFilter === cat ? '#C4A37A' : 'var(--bg-card)',
                color: '#3D2B1F',
                fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: activeFilter === cat ? 700 : 500,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="recipe-grid">
          {filtered.map((recipe) => (
            <button
              key={recipe.id}
              className="card"
              onClick={() => setSelectedRecipe(recipe)}
              aria-haspopup="dialog"
              style={{ padding: 0, overflow: 'hidden', textAlign: 'left', border: 'none', cursor: 'pointer', width: '100%' }}
            >
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', backgroundColor: '#F8D7C4' }}>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1.05)' }}
                  onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(61,43,31,0.35) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '24px' }}>{recipe.emoji}</div>
                <div style={{
                  position: 'absolute', top: '12px', right: '12px',
                  backgroundColor: 'rgba(255,251,247,0.92)', borderRadius: '999px',
                  padding: '4px 10px', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#8B6F5C', fontWeight: 500,
                }}>
                  ⏱ {recipe.prep}
                </div>
              </div>
              <div style={{ padding: '18px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', fontWeight: 600, color: '#3D2B1F', marginBottom: '8px' }}>
                  {recipe.title}
                </h3>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '8px' }}>
                  {recipe.tags.map((tag) => (
                    <span key={tag} className="chip" style={{ backgroundColor: '#F5D5D5', color: '#8B6F5C', fontSize: '11px' }}>{tag}</span>
                  ))}
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#8B6F5C', lineHeight: 1.5, margin: 0 }}>
                  {recipe.desc.slice(0, 72)}…
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedRecipe && (
        <div
          role="presentation"
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            backgroundColor: 'rgba(61,43,31,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedRecipe(null) }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="recipe-title"
            style={{
            backgroundColor: 'var(--bg-card)', borderRadius: '24px', maxWidth: '680px', width: '100%',
            maxHeight: '92vh', overflowY: 'auto',
            boxShadow: '0 32px 80px var(--shadow-md)',
          }}>
            {/* Header image */}
            <div style={{ position: 'relative', aspectRatio: '16/7', overflow: 'hidden', borderRadius: '24px 24px 0 0', backgroundColor: '#F8D7C4' }}>
              <img src={selectedRecipe.image} alt={selectedRecipe.title} decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(61,43,31,0.65) 0%, transparent 55%)' }} />
              <button
                type="button"
                onClick={() => setSelectedRecipe(null)}
                aria-label="Fermer la recette"
                className="icon-btn"
                style={{
                  position: 'absolute', top: '12px', right: '12px',
                  backgroundColor: '#FFFBF7', color: '#3D2B1F', fontSize: '22px',
                }}
              >
                ×
              </button>
              <div style={{ position: 'absolute', bottom: '16px', left: '20px', right: '64px' }}>
                <h2 id="recipe-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
                  {selectedRecipe.title}
                </h2>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {selectedRecipe.tags.map((t) => (
                    <span key={t} className="chip" style={{ backgroundColor: 'rgba(255,251,247,0.88)', color: '#8B6F5C', fontSize: '11px' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ padding: '24px' }}>
              {/* Meta */}
              <div className="meta-grid" style={{ marginBottom: '20px' }}>
                {[
                  { label: 'Portion', val: selectedRecipe.portion },
                  { label: 'Fréquence', val: selectedRecipe.frequency },
                  { label: 'Préparation', val: selectedRecipe.prep },
                ].map((m) => (
                  <div key={m.label} style={{ padding: '10px 12px', borderRadius: '10px', backgroundColor: 'var(--bg-app)' }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#8B6F5C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>{m.label}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#3D2B1F' }}>{m.val}</div>
                  </div>
                ))}
              </div>

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: 1.65, color: '#8B6F5C', marginBottom: '20px' }}>
                {selectedRecipe.desc}
              </p>

              {/* Ingredients */}
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', fontWeight: 600, color: '#3D2B1F', marginBottom: '10px' }}>Ingrédients</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {selectedRecipe.ingredients.map((ing) => (
                    <li key={ing} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#3D2B1F' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#C4A37A', marginTop: '6px', flexShrink: 0 }} />
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', fontWeight: 600, color: '#3D2B1F', marginBottom: '10px' }}>Préparation</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedRecipe.steps.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{
                        width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#C4A37A', color: '#3D2B1F',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '11px', fontWeight: 700, flexShrink: 0, fontFamily: "'Inter', sans-serif",
                      }}>{i + 1}</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: 1.6, color: '#3D2B1F', paddingTop: '1px' }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div style={{ marginBottom: '20px', padding: '18px', borderRadius: '14px', backgroundColor: 'var(--bg-app)' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', fontWeight: 600, color: '#3D2B1F', marginBottom: '12px' }}>
                  Bienfaits vitamines &amp; minéraux
                </h3>
                <div className="benefit-grid">
                  {selectedRecipe.benefits.map((b) => (
                    <div key={b.label} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '16px' }}>{b.icon}</span>
                      <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#3D2B1F' }}>{b.label}</div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#8B6F5C' }}>{b.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supplements */}
              <div style={{ marginBottom: '16px', padding: '14px', borderRadius: '12px', backgroundColor: '#D4E0D4' }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#3D2B1F', marginBottom: '6px' }}>💊 Compléments / Conseils</div>
                {selectedRecipe.supplements.map((s) => (
                  <div key={s} style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#5C7A5C', display: 'flex', gap: '6px', marginBottom: '3px' }}>
                    <span>→</span>{s}
                  </div>
                ))}
              </div>

              {/* Why Cavalier */}
              <div style={{ marginBottom: '16px', padding: '14px', borderRadius: '12px', backgroundColor: '#F5D5D5' }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#3D2B1F', marginBottom: '4px' }}>🐕 Pourquoi c'est idéal pour un Cavalier</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#8B6F5C', margin: 0 }}>{selectedRecipe.whyCavalier}</p>
              </div>

              {/* Nyx tip */}
              <div className="nyx-bubble" style={{ maxWidth: '100%', marginBottom: '20px' }}>
                <span style={{ marginRight: '6px' }}>🐾</span>
                <em>"{selectedRecipe.nyxTip}"</em>
              </div>

              <button
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '15px', padding: '15px' }}
                onClick={() => addToDay(selectedRecipe)}
              >
                Ajouter à la ration du jour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
