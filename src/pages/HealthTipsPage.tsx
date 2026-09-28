/**
 * Conseils santé de la race. Une catégorie à la fois, pour rester lisible.
 */
import { useState } from 'react'

interface HealthSection {
  id: string
  icon: string
  title: string
  color: string
  intro: string
  tips: { title: string; desc: string }[]
}

const sections: HealthSection[] = [
  {
    id: 'heart',
    icon: '❤️',
    title: 'Cœur',
    color: '#F5D5D5',
    intro: "Le Cavalier King Charles est la race la plus prédisposée à la maladie valvulaire mitrale (MVD). C'est une réalité, mais pas une fatalité. Avec une bonne alimentation et un suivi régulier, on peut beaucoup. Et Nyx va bien ❤️",
    tips: [
      { title: 'Consulte un cardiologue', desc: "Dès l'âge de 5–6 ans, un échocardiogramme annuel permet de détecter une évolution précoce. Plus tôt c'est repéré, plus les options sont nombreuses." },
      { title: 'Oméga-3 et Taurine', desc: "L'huile de saumon (500–1000 mg EPA+DHA/jour) et la taurine (500–1000 mg/jour) sont recommandées en prévention dès 4–5 ans. À intégrer dans la ration quotidienne." },
      { title: 'CoQ10 après 5 ans', desc: "L'ubiquinol (CoQ10) soutient l'énergie des cellules cardiaques. Beaucoup de vétérinaires cavalieristes le recommandent en prévention à partir de 5–6 ans." },
      { title: 'Évite le surpoids', desc: "Chaque kilo en trop fatigue le cœur. Pour ton Cavalier, maintenir un poids idéal n'est pas juste esthétique – c'est cardioprotecteur." },
      { title: 'Pas de sel', desc: "Évite tous les aliments salés, fromages, charcuteries et bouillons du commerce. Le sodium est particulièrement nocif pour un cœur fragilisé." },
    ],
  },
  {
    id: 'ears',
    icon: '👂',
    title: 'Oreilles',
    color: '#F8D7C4',
    intro: "Ces longues oreilles soyeuses qui font le charme des Cavaliers sont aussi une source d'infections récurrentes. Une routine d'entretien simple suffit à les garder en parfaite santé.",
    tips: [
      { title: 'Nettoyage hebdomadaire', desc: "Utilise un nettoyant auriculaire vétérinaire doux (non alcoolique). Masse la base de l'oreille, laisse agir, puis laisse le chien secouer la tête. Ne jamais utiliser de coton-tige profond." },
      { title: 'Sécher après les bains', desc: "L'humidité dans le canal auriculaire est le meilleur ami des bactéries et levures. Sèche toujours bien l'intérieur des oreilles après chaque bain ou promenade sous la pluie." },
      { title: 'Surveiller les signes', desc: "Si Nyx secoue souvent la tête, se gratte une oreille ou si tu sens une odeur, consulte. Une otite traitée rapidement guérit en quelques jours. Ignorée, elle devient chronique." },
      { title: 'Épiler si nécessaire', desc: "Certains Cavaliers ont des poils dans le canal auriculaire. Ton vétérinaire ou un toiletteur peut les retirer pour améliorer la ventilation." },
    ],
  },
  {
    id: 'eyes',
    icon: '👁️',
    title: 'Yeux',
    color: '#D4E0D4',
    intro: "Ces grands yeux ronds et expressifs qui nous font craquer sont aussi sensibles. Quelques gestes simples permettent de les garder brillants et confortables.",
    tips: [
      { title: 'Nettoyer les sécrétions', desc: "Les larmes foncées sous les yeux (tear stains) sont courantes chez les Cavaliers. Un coton humide chaque matin suffit à nettoyer doucement. Des produits spéciaux existent si les taches persistent." },
      { title: 'Syndrome œil sec (KCS)', desc: "Le Cavalier est prédisposé à la kérato-conjonctivite sèche. Si les yeux semblent ternes, collants ou si Nyx cligne souvent, consulte. Des collyres lubrifiants soulagent efficacement." },
      { title: 'Cataracte héréditaire', desc: "Un dépistage ADN est possible. Si un parent est atteint, un contrôle ophtalmologique annuel à partir de 5 ans est recommandé. Ce n'est pas dramatique si c'est suivi." },
      { title: 'Surveiller les chocs', desc: "Les yeux globuleux des Cavaliers sont plus exposés aux traumatismes. Évite les jeux trop brusques près des buissons et garde le museau loin des branchages en promenade." },
    ],
  },
  {
    id: 'digestion',
    icon: '🌿',
    title: 'Digestion',
    color: '#D4E0D4',
    intro: "Les Cavaliers ont souvent un appareil digestif sensible. Une alimentation adaptée, des transitions douces et quelques bons réflexes font toute la différence.",
    tips: [
      { title: "Changer l'alimentation progressivement", desc: "Toute transition alimentaire doit se faire sur 7–10 jours minimum. Commence par 25% de nouveau, augmente graduellement. Même pour les recettes maison." },
      { title: 'Repas en petites portions', desc: "Deux repas par jour plutôt qu'un seul grand. Ça limite la dilatation gastrique et facilite la digestion. Pour les chiots, trois à quatre repas." },
      { title: 'Probiotiques en soutien', desc: "En période de stress, changement de lieu, post-antibiotiques ou simplement en prévention : les probiotiques canins comme Fortiflora aident à maintenir un bon équilibre intestinal." },
      { title: 'Éviter les aliments irritants', desc: "Pas de graisse cuite, os cuits (risque de perforation), oignons, ail, raisins, chocolat, xylitol. Les légumineuses (lentilles, pois chiches) peuvent provoquer des flatulences chez certains." },
    ],
  },
  {
    id: 'weight',
    icon: '⚖️',
    title: 'Poids',
    color: '#F8D7C4',
    intro: "Le Cavalier King Charles est une race qui prend facilement du poids, surtout après la stérilisation. Et chaque gramme en trop compte pour le cœur.",
    tips: [
      { title: 'Peser les portions', desc: "L'erreur la plus fréquente est de donner à l'œil. Investis dans une balance de cuisine et pèse systématiquement les rations, surtout si tu alternes recettes maison et croquettes." },
      { title: 'Le test des côtes', desc: "Passe ta main sur les flancs de Nyx. Tu dois pouvoir sentir les côtes sous une légère couche de gras, sans les voir. Si tu dois appuyer fort, c'est probablement qu'il est en surpoids." },
      { title: 'Friandises = calories cachées', desc: "Les friandises peuvent représenter 10 à 20% des calories journalières. Compte-les dans la ration totale ou réduis proportionnellement le repas quand tu donnes des snacks." },
      { title: 'Contrôle vétérinaire annuel', desc: "Une pesée et une évaluation de condition corporelle une fois par an (ou tous les 6 mois après 7 ans) permet d'ajuster la ration avant que le poids ne dérive trop." },
    ],
  },
  {
    id: 'anxiety',
    icon: '🧘',
    title: 'Anxiété',
    color: '#F5D5D5',
    intro: "Le Cavalier King Charles est un chien de compagnie pur souche – élevé pendant des siècles pour vivre collé à son humain. L'anxiété de séparation est très fréquente. Et tout à fait gérable avec de la patience.",
    tips: [
      { title: 'Désensibilisation progressive', desc: "Apprends à Nyx que ton départ ne signifie pas une catastrophe. Commence par des absences de 30 secondes, puis 5 minutes, puis 20... progressivement sur des semaines." },
      { title: 'Enrichissement environnemental', desc: "Avant de partir, laisse un Kong garni de beurre de cacahuète congelé, un jouet interactif ou une musique douce (des playlists spéciales chiens existent). Ça occupe, ça rassure." },
      { title: 'Ne pas dramatiser les retours', desc: "L'erreur classique : rentrer en faisant une fête exubérante. Ça renforce l'idée que les retrouvailles sont exceptionnelles. Reste calme, affectueux mais discret." },
      { title: 'Phéromones et compléments', desc: "Les diffuseurs de phéromones apaisantes (type Adaptil), les compléments à base de valériane ou de L-tryptophane peuvent aider les cas modérés. Pour les cas sévères, un comportementaliste vétérinaire est précieux." },
    ],
  },
]

export default function HealthTipsPage() {
  const [active, setActive] = useState('heart')
  const section = sections.find((s) => s.id === active)!

  return (
    <div style={{ minHeight: 'calc(100vh - 72px)', backgroundColor: 'var(--bg-app)' }}>
      <div className="page-pad" style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ marginBottom: '40px' }}>
          <div className="chip" style={{ backgroundColor: '#D4E0D4', color: '#5C7A5C', marginBottom: '16px' }}>🩺 Conseils santé</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#3D2B1F', marginBottom: '8px' }}>
            Santé <span style={{ color: '#C4A37A', fontStyle: 'italic' }}>spécifique</span> Cavalier
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#8B6F5C', maxWidth: '560px' }}>
            Des conseils concrets et bienveillants, conçus pour cette race d'exception. Jamais alarmistes, toujours utiles.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={active === s.id}
              onClick={() => setActive(s.id)}
              style={{
                padding: '10px 20px',
                borderRadius: '999px',
                border: active === s.id ? 'none' : '1.5px solid rgba(139,111,92,0.2)',
                backgroundColor: active === s.id ? s.color : '#FFFBF7',
                color: '#3D2B1F',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: active === s.id ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>{s.icon}</span>
              {s.title}
            </button>
          ))}
        </div>

        <div key={active} style={{ animation: 'fadeSlideUp 0.3s ease-out' }}>
          <div className="sidebar-layout">

            <div>
              <div style={{ padding: '28px 32px', borderRadius: '20px', backgroundColor: section.color, marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '32px' }}>{section.icon}</span>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: '#3D2B1F', margin: 0 }}>
                    {section.title}
                  </h2>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', lineHeight: 1.7, color: '#5C3D28', margin: 0 }}>
                  {section.intro}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {section.tips.map((tip, i) => (
                  <div key={i} className="card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#C4A37A', color: '#3D2B1F',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 700, flexShrink: 0,
                      }}>
                        {i + 1}
                      </div>
                      <div>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', fontWeight: 600, color: '#3D2B1F', marginBottom: '6px' }}>
                          {tip.title}
                        </h3>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: 1.65, color: '#8B6F5C', margin: 0 }}>
                          {tip.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '88px' }}>
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 600, color: '#3D2B1F', marginBottom: '16px' }}>
                  Toutes les catégories
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {sections.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={active === s.id}
                      onClick={() => setActive(s.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                        borderRadius: '10px', border: 'none',
                        backgroundColor: active === s.id ? s.color : 'transparent',
                        cursor: 'pointer', transition: 'background-color 0.2s', textAlign: 'left', width: '100%',
                      }}
                    >
                      <span style={{ fontSize: '18px' }}>{s.icon}</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: active === s.id ? 600 : 400, color: '#3D2B1F' }}>
                        {s.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#F5D5D5' }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#3D2B1F', marginBottom: '8px' }}>
                  ⚠️ Rappel important
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', lineHeight: 1.6, color: '#8B6F5C', margin: 0 }}>
                  Ces conseils sont informatifs et préventifs. En cas de symptôme inquiétant, consulte toujours un vétérinaire. Lui seul peut établir un diagnostic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
