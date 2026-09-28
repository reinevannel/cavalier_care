/**
 * Case study : le récit du design, section par section.
 * Sur petit écran, la rangée de pastilles remplace le menu de gauche.
 */
import React, { useState, useEffect } from 'react'
import NyxDog from '../components/NyxDog'
import { Page } from '../App'

interface CaseStudyPageProps {
  navigate: (p: Page) => void
}

const sections = [
  { id: 'summary',      num: '01', label: 'Résumé exécutif' },
  { id: 'context',      num: '02', label: 'Contexte & enjeux' },
  { id: 'problem',      num: '03', label: 'Problématique' },
  { id: 'goals',        num: '04', label: 'Objectifs' },
  { id: 'insights',     num: '05', label: 'Analyse & insights' },
  { id: 'architecture', num: '06', label: 'Architecture' },
  { id: 'design',       num: '07', label: 'Design UI' },
  { id: 'system',       num: '08', label: 'Design System' },
  { id: 'tests',        num: '09', label: 'Tests & itérations' },
  { id: 'results',      num: '10', label: 'Résultats & impact' },
]

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '13px', fontWeight: 400, color: 'var(--accent)', letterSpacing: '0.06em' }}>
        {num}
      </span>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: 'var(--text-muted, var(--text-secondary))', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        {label}
      </span>
    </div>
  )
}

function Metric({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '24px 16px' }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '6px' }}>
        {label}
      </div>
      {sub && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-secondary)', marginTop: '3px' }}>{sub}</div>}
    </div>
  )
}

function InsightCard({ icon, quote, tag, color }: { icon: string; quote: string; tag: string; color: string }) {
  return (
    <div style={{
      padding: '24px', borderRadius: '16px',
      backgroundColor: 'var(--bg-card)',
      borderLeft: `4px solid ${color}`,
      boxShadow: '0 4px 12px var(--shadow-sm)',
    }}>
      <div style={{ fontSize: '24px', marginBottom: '12px' }}>{icon}</div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic', fontSize: '14px', lineHeight: 1.65, color: 'var(--text-primary)', margin: '0 0 14px' }}>
        "{quote}"
      </p>
      <span style={{
        display: 'inline-block', padding: '3px 10px', borderRadius: '999px',
        backgroundColor: `${color}22`, color,
        fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600,
      }}>
        {tag}
      </span>
    </div>
  )
}

// Mini wireframe mockup for architecture section
function WireframeBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 16px var(--shadow-sm)' }}>
      <div style={{ backgroundColor: '#3D2B1F', padding: '8px 12px', display: 'flex', gap: '6px', alignItems: 'center' }}>
        {['#FF6057','#FFBD2E','#27C93F'].map(c => <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: c }} />)}
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginLeft: '6px' }}>{title}</span>
      </div>
      <div style={{ backgroundColor: 'var(--bg-elevated, #F5F0EB)', padding: '12px', minHeight: '140px' }}>
        {children}
      </div>
    </div>
  )
}

function WFBar({ w = '100%', h = '8px', color = 'rgba(139,111,92,0.25)', r = '4px', mb = '6px' }: { w?: string; h?: string; color?: string; r?: string; mb?: string }) {
  return <div style={{ width: w, height: h, backgroundColor: color, borderRadius: r, marginBottom: mb }} />
}

function WFBox({ w = '100%', h = '60px', color = 'rgba(196,163,122,0.2)', r = '6px', children }: { w?: string; h?: string; color?: string; r?: string; children?: React.ReactNode }) {
  return (
    <div style={{ width: w, height: h, backgroundColor: color, borderRadius: r, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </div>
  )
}

export default function CaseStudyPage({ navigate }: CaseStudyPageProps) {
  const [activeSection, setActiveSection] = useState('summary')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ backgroundColor: 'var(--bg-app)', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <div style={{
        backgroundColor: '#2A1C17',
        minHeight: 'clamp(420px, 60vh, 640px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative large bg text */}
        <div style={{
          position: 'absolute', top: 0, right: '-20px',
          fontFamily: "'Playfair Display', serif", fontSize: 'clamp(120px, 18vw, 220px)',
          fontWeight: 700, color: 'rgba(255,255,255,0.03)',
          lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          letterSpacing: '-0.04em',
        }}>
          Case<br />Study
        </div>

        {/* Caramel accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: '#C4A37A' }} />

        <div style={{ position: 'relative', padding: 'clamp(32px, 5vw, 64px)', maxWidth: '1200px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 14px', borderRadius: '999px',
            border: '1px solid rgba(196,163,122,0.3)',
            marginBottom: '28px',
          }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#C4A37A', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Case Study — UX/Product Design
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 700, color: '#F2E8DE',
            lineHeight: 1.05, marginBottom: '20px',
            letterSpacing: '-0.02em',
          }}>
            CavalierCare —<br />
            <span style={{ color: '#C4A37A', fontStyle: 'italic' }}>Compagnon digital</span><br />
            pour une race d'exception
          </h1>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(14px, 1.6vw, 17px)', color: 'rgba(242,232,222,0.7)', maxWidth: '560px', lineHeight: 1.7, marginBottom: '32px' }}>
            De la recherche utilisateur au design system complet — conception d'un outil quotidien pour les propriétaires de Cavalier King Charles Spaniel.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite 8', 'Design System'].map(tag => (
              <span key={tag} style={{
                padding: '5px 12px', borderRadius: '999px',
                backgroundColor: 'rgba(196,163,122,0.12)',
                border: '1px solid rgba(196,163,122,0.2)',
                fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(242,232,222,0.7)',
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <nav className="case-mobile-jump" aria-label="Sections du case study">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={activeSection === section.id ? 'case-jump on' : 'case-jump'}
            aria-current={activeSection === section.id ? 'true' : undefined}
            onClick={() => scrollTo(section.id)}
          >
            {section.label}
          </button>
        ))}
      </nav>

      {/* ── MAIN LAYOUT: sidebar + content ── */}
      <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto', padding: '0' }}>

        {/* Sticky sidebar nav */}
        <aside style={{
          width: '220px', flexShrink: 0,
          position: 'sticky', top: '72px', alignSelf: 'flex-start',
          height: 'calc(100vh - 72px)', overflowY: 'auto',
          padding: '48px 0 48px 40px',
          borderRight: '1px solid var(--border)',
          display: 'none',
        }} className="case-study-sidebar">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                width: '100%', background: 'none', border: 'none',
                cursor: 'pointer', padding: '8px 0', textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <span style={{
                fontFamily: "'Playfair Display', serif", fontSize: '11px',
                color: activeSection === s.id ? 'var(--accent)' : 'var(--text-secondary)',
                fontWeight: activeSection === s.id ? 600 : 400,
                marginTop: '2px', flexShrink: 0,
              }}>{s.num}</span>
              <span style={{
                fontFamily: "'Inter', sans-serif", fontSize: '12px',
                color: activeSection === s.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: activeSection === s.id ? 500 : 400,
                lineHeight: 1.4,
              }}>{s.label}</span>
            </button>
          ))}
        </aside>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0, padding: 'clamp(40px, 5vw, 80px) clamp(20px, 5vw, 64px)' }}>

          {/* ── 01 RÉSUMÉ EXÉCUTIF ── */}
          <section id="summary" style={{ marginBottom: '96px', scrollMarginTop: '88px' }}>
            <SectionLabel num="01" label="Résumé exécutif" />

            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px', lineHeight: 1.15, maxWidth: '700px' }}>
              Un outil pensé du premier pixel jusqu'au dernier octet de soin.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: '660px', marginBottom: '48px' }}>
              CavalierCare est une application web complète dédiée aux propriétaires de Cavalier King Charles Spaniel. Du calculateur de ration en temps réel au compagnon SVG interactif, en passant par 8 recettes maison et 6 catégories de conseils santé spécifiques à la race — chaque fonctionnalité répond à un besoin réel identifié en phase de recherche.
            </p>

            {/* Metrics grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1px', backgroundColor: 'var(--border)',
              borderRadius: '20px', overflow: 'hidden',
              border: '1px solid var(--border)',
              marginBottom: '48px',
            }}>
              {[
                { value: '8', label: 'Pages fonctionnelles', sub: 'Home → Case Study' },
                { value: '12', label: 'Composants React', sub: 'Design System complet' },
                { value: '100%', label: 'Responsive', sub: 'Desktop · Tablet · Mobile' },
                { value: '6 sem.', label: 'Durée du projet', sub: 'Recherche → Livraison' },
              ].map(m => (
                <div key={m.label} style={{ backgroundColor: 'var(--bg-card)', padding: '28px 16px', textAlign: 'center' }}>
                  <Metric value={m.value} label={m.label} sub={m.sub} />
                </div>
              ))}
            </div>

            {/* Role + deliverables */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div className="card" style={{ padding: '28px' }}>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Rôle & Responsabilités
                </h3>
                {['UX Research & Définition', 'Architecture de l\'information', 'Design UI & Design System', 'Développement React/TypeScript', 'Tests & itérations produit'].map(r => (
                  <div key={r} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent)', flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-primary)' }}>{r}</span>
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding: '28px' }}>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Livrables clés
                </h3>
                {['Application web 8 pages', 'Design system documenté', 'Calculateur de ration live', 'Compagnon SVG (NyxDog)', '8 fiches recettes complètes', 'Mode sombre natif'].map(d => (
                  <div key={d} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px' }}>✓</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-primary)' }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 02 CONTEXTE & ENJEUX ── */}
          <section id="context" style={{ marginBottom: '96px', scrollMarginTop: '88px' }}>
            <SectionLabel num="02" label="Contexte & enjeux" />

            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px', lineHeight: 1.2, maxWidth: '640px' }}>
              Une race magnifique aux besoins très spécifiques — et très peu d'outils à la hauteur.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: '660px', marginBottom: '40px' }}>
              Le Cavalier King Charles Spaniel est une race prédisposée à la maladie valvulaire mitrale, à l'otite chronique, et à la syringomyélie. Ses propriétaires sont souvent anxieux face au manque d'outils spécifiques à leur race. Les ressources existantes sont soit trop génériques (tout chien), soit trop médicales (trop alarmistes).
            </p>

            {/* Context stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
              {[
                { stat: '~200k', label: 'propriétaires de Cavaliers en France', icon: '🇫🇷' },
                { stat: '87%', label: 'cherchent des informations spécifiques à la race', icon: '🔍' },
                { stat: '#1', label: 'race la plus touchée par la MVD après 5 ans', icon: '❤️' },
              ].map(c => (
                <div key={c.label} className="card" style={{ padding: '22px' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{c.icon}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 700, color: 'var(--accent)', marginBottom: '6px' }}>{c.stat}</div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', lineHeight: 1.5, color: 'var(--text-secondary)', margin: 0 }}>{c.label}</p>
                </div>
              ))}
            </div>

            {/* Personas */}
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '20px' }}>
              Personas identifiées
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                { name: 'Marie, 34 ans', role: 'Jeune propriétaire', pain: '"Je ne sais jamais si je donne la bonne quantité à Luna."', tag: 'Anxieuse · Digitale · Recherche constante', color: '#F5D5D5' },
                { name: 'Thomas, 52 ans', role: 'Propriétaire expérimenté', pain: '"J\'ai du mal à trouver des recettes adaptées aux Cavaliers avec sensibilités."', tag: 'Expert · Consciencieux · Cuisinier', color: '#D4E0D4' },
                { name: 'Céline, 28 ans', role: 'Future propriétaire', pain: '"Je veux me préparer avant l\'arrivée de mon chiot."', tag: 'Curieuse · Préventive · Mobile', color: '#F8D7C4' },
              ].map(p => (
                <div key={p.name} className="card" style={{ padding: '22px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '14px' }}>
                    🧑
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{p.name}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--accent)', marginBottom: '12px' }}>{p.role}</div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic', fontSize: '13px', lineHeight: 1.55, color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    {p.pain}
                  </p>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'var(--text-secondary)', opacity: 0.8 }}>{p.tag}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 03 PROBLÉMATIQUE ── */}
          <section id="problem" style={{ marginBottom: '96px', scrollMarginTop: '88px' }}>
            <SectionLabel num="03" label="Problématique" />

            <div style={{
              padding: 'clamp(32px, 5vw, 56px)',
              borderRadius: '24px',
              backgroundColor: '#2A1C17',
              marginBottom: '40px',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: '-20px', right: '-20px',
                fontFamily: "'Playfair Display', serif", fontSize: '160px',
                color: 'rgba(196,163,122,0.06)', fontWeight: 700, lineHeight: 1,
                pointerEvents: 'none', userSelect: 'none',
              }}>?</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#C4A37A', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '20px' }}>
                HMW — How Might We
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(22px, 3.5vw, 40px)',
                fontWeight: 700, color: '#F2E8DE',
                lineHeight: 1.25, maxWidth: '680px',
              }}>
                Comment aider les propriétaires de Cavaliers à prendre de meilleures décisions quotidiennes, <em style={{ color: '#C4A37A' }}>sans les alarmer</em> ?
              </h2>
            </div>

            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '20px' }}>
              Pain points identifiés
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { n: '01', title: 'Dispersion de l\'information', desc: 'Les conseils sont éparpillés entre forums, blogs vétérinaires, groupes Facebook — souvent contradictoires.', icon: '🗂️' },
                { n: '02', title: 'Absence d\'outil race-spécifique', desc: 'Tous les calculateurs de ration sont génériques. Aucun ne tient compte de la morphologie et des fragilités des Cavaliers.', icon: '🔢' },
                { n: '03', title: 'Anxiété liée aux fragilités cardiaques', desc: 'La MVD est bien connue dans la communauté mais les ressources sont soit alarmistes soit trop techniques.', icon: '❤️' },
                { n: '04', title: 'Manque de suivi quotidien', desc: 'Pas d\'outil simple pour noter les repas, promenades et compléments au jour le jour.', icon: '📋' },
                { n: '05', title: 'Recettes maison floues', desc: 'Les propriétaires veulent cuisiner pour leur Cavalier mais n\'ont pas de recettes adaptées avec les bons dosages.', icon: '🍽️' },
              ].map(p => (
                <div key={p.n} className="card" style={{ padding: '20px 24px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '13px', color: 'var(--accent)', fontWeight: 400, opacity: 0.6 }}>{p.n}</span>
                    <span style={{ fontSize: '22px' }}>{p.icon}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{p.title}</div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 04 OBJECTIFS ── */}
          <section id="goals" style={{ marginBottom: '96px', scrollMarginTop: '88px' }}>
            <SectionLabel num="04" label="Objectifs" />

            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '40px', lineHeight: 1.2, maxWidth: '580px' }}>
              Trois objectifs. Neuf résultats mesurables.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                {
                  obj: 'Centraliser les soins spécifiques Cavalier',
                  color: '#F5D5D5', textColor: '#8B3A3A',
                  krs: ['Couvrir au moins 6 problématiques santé spécifiques à la race', 'Proposer des recettes maison adaptées aux sensibilités digestives', 'Offrir un calcul de ration en temps réel avec profil personnalisé'],
                },
                {
                  obj: 'Créer un outil de suivi quotidien engageant',
                  color: '#D4E0D4', textColor: '#3A6B3A',
                  krs: ['Dashboard journalier interactif (besoins cochables)', 'Générateur de promenade selon météo + énergie', 'Compagnon interactif (NyxDog) qui réagit aux données'],
                },
                {
                  obj: 'Construire un design system cohérent et extensible',
                  color: '#F8D7C4', textColor: '#7A4A2A',
                  krs: ['Palette de couleurs documentée avec 6 tokens', 'Typographie cohérente sur toutes les pages', 'Composants réutilisables : card, button, input, chip, bubble'],
                },
              ].map((o, i) => (
                <div key={i} className="card" style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div style={{ padding: '6px 14px', borderRadius: '999px', backgroundColor: o.color }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: o.textColor, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Objectif {i + 1}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>
                      {o.obj}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '16px', borderLeft: '2px solid var(--border)' }}>
                    {o.krs.map((kr, j) => (
                      <div key={j} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--accent)', fontWeight: 600, flexShrink: 0, marginTop: '2px' }}>KR{j + 1}</span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{kr}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 05 ANALYSE & INSIGHTS ── */}
          <section id="insights" style={{ marginBottom: '96px', scrollMarginTop: '88px' }}>
            <SectionLabel num="05" label="Analyse & insights" />

            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', lineHeight: 1.2 }}>
              Ce que la recherche a révélé
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', lineHeight: 1.75, color: 'var(--text-secondary)', maxWidth: '620px', marginBottom: '40px' }}>
              Méthodes utilisées : 8 entretiens qualitatifs en ligne · Analyse de 3 forums spécialisés (Reddit r/cavalier, Dogforums, CavalierHealth.org) · Audit de 4 outils concurrents · Analyse de 12 groupes Facebook dédiés.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '40px' }}>
              <InsightCard
                icon="💬"
                quote="Je veux juste savoir si je fais bien, sans avoir l'impression que mon chien va mourir dans 2 ans."
                tag="Insight sécurité émotionnelle"
                color="#C4A37A"
              />
              <InsightCard
                icon="🥩"
                quote="Le calcul de la ration c'est la chose que je cherche le plus souvent. Et je refais les calculs à chaque visite chez le véto."
                tag="Insight fonctionnel #1"
                color="#8B6F5C"
              />
              <InsightCard
                icon="🤝"
                quote="Ce qui me manque c'est de parler à quelqu'un qui a le même chien que moi — pas n'importe quel chien."
                tag="Insight communauté"
                color="#5C7A5C"
              />
              <InsightCard
                icon="📱"
                quote="Je consulte ces infos depuis mon téléphone, le soir sur le canapé, avec le chien sur les genoux."
                tag="Insight contexte d'usage"
                color="#8B3A5C"
              />
            </div>

            {/* Key tension */}
            <div style={{ padding: '28px 32px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(196,163,122,0.08) 0%, rgba(196,163,122,0.02) 100%)', border: '1px solid rgba(196,163,122,0.2)' }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>
                Tension centrale identifiée
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(16px, 2vw, 22px)', color: 'var(--text-primary)', lineHeight: 1.5, margin: 0 }}>
                "Besoin d'information précise" vs "peur d'être inquiété à chaque consultation"
                — Le design doit informer sans alarmer.
              </p>
            </div>
          </section>

          {/* ── 06 ARCHITECTURE & WIREFRAMES ── */}
          <section id="architecture" style={{ marginBottom: '96px', scrollMarginTop: '88px' }}>
            <SectionLabel num="06" label="Architecture & wireframes" />

            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '40px', lineHeight: 1.2 }}>
              8 pages. Une navigation claire. Zéro friction.
            </h2>

            {/* Site map */}
            <div className="card" style={{ padding: '32px', marginBottom: '32px' }}>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-secondary)', marginBottom: '28px' }}>
                Carte du site
              </h3>

              {/* Nav level */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                <div style={{ padding: '8px 20px', borderRadius: '8px', backgroundColor: '#2A1C17', border: '1px solid rgba(196,163,122,0.3)' }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#C4A37A', fontWeight: 600 }}>Navigation globale</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>
                <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border)' }} />
              </div>

              {/* Pages level */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '4px' }}>
                {[
                  { label: '🏠 Accueil', page: 'home' },
                  { label: '🐾 Nyx', page: 'nyx' },
                  { label: '🥩 Calculateur', page: 'calc' },
                  { label: '📖 Recettes', page: 'recipes' },
                  { label: '🦮 Promenades', page: 'walks' },
                  { label: '🩺 Santé', page: 'health' },
                  { label: '✨ À propos', page: 'about' },
                  { label: '📋 Case Study', page: 'cs', highlight: true },
                ].map(p => (
                  <div key={p.page} style={{
                    padding: '10px 12px', borderRadius: '10px', textAlign: 'center',
                    backgroundColor: p.highlight ? 'rgba(196,163,122,0.12)' : 'var(--bg-app)',
                    border: `1px solid ${p.highlight ? 'rgba(196,163,122,0.4)' : 'var(--border)'}`,
                  }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: p.highlight ? 'var(--accent)' : 'var(--text-primary)', fontWeight: p.highlight ? 600 : 400 }}>
                      {p.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Wireframes */}
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '20px' }}>
              Wireframes clés
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>

              <WireframeBox title="Page d'accueil">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <WFBar w="100%" h="10px" color="rgba(61,43,31,0.3)" r="3px" mb="8px" />
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                    <div style={{ flex: 1 }}>
                      <WFBar w="70%" h="6px" mb="4px" />
                      <WFBar w="90%" h="4px" mb="4px" />
                      <WFBar w="50%" h="4px" mb="8px" />
                      <WFBar w="40%" h="18px" color="rgba(196,163,122,0.5)" r="8px" mb="0" />
                    </div>
                    <WFBox w="90px" h="80px" />
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1,2,3,4].map(i => <WFBox key={i} w="25%" h="36px" />)}
                  </div>
                </div>
              </WireframeBox>

              <WireframeBox title="Calculateur de ration">
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <WFBar w="60%" h="5px" mb="4px" />
                    <WFBox w="100%" h="12px" color="rgba(196,163,122,0.2)" r="4px" />
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[1,2,3,4].map(i => <WFBox key={i} w="24%" h="22px" r="6px" />)}
                    </div>
                    <WFBox w="100%" h="12px" r="4px" />
                    <WFBar w="80%" h="22px" color="rgba(196,163,122,0.4)" r="8px" mb="0" />
                  </div>
                  <div style={{ width: '55px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <WFBox w="100%" h="40px" color="rgba(245,213,213,0.4)" r="8px" />
                    <WFBox w="100%" h="50px" color="rgba(196,163,122,0.3)" r="8px" />
                  </div>
                </div>
              </WireframeBox>

              <WireframeBox title="Page Nyx interactive">
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(196,163,122,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🐾</div>
                    <WFBar w="90%" h="5px" mb="2px" />
                    <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap', justifyContent: 'center' }}>
                      {[1,2,3,4,5,6].map(i => <WFBox key={i} w="26px" h="14px" r="999px" />)}
                    </div>
                  </div>
                  <div style={{ width: '60px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {[1,2,3,4,5,6].map(i => <WFBar key={i} w="100%" h="12px" r="6px" mb="0" />)}
                  </div>
                </div>
              </WireframeBox>
            </div>
          </section>

          {/* ── 07 DESIGN UI ── */}
          <section id="design" style={{ marginBottom: '96px', scrollMarginTop: '88px' }}>
            <SectionLabel num="07" label="Design UI" />

            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '40px', lineHeight: 1.2, maxWidth: '600px' }}>
              Un design chaleureux qui rassure. Pas un dashboard médical.
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
              {[
                { title: 'Typographie émotionnelle', desc: 'Playfair Display pour les titres apporte une touche éditoriale et premium — jamais froide. Inter assure la lisibilité de l\'information.', icon: '✍️', color: '#F5D5D5' },
                { title: 'Palette chaude et rassurante', desc: 'Le caramel (#C4A37A) comme accent principal, le crème comme fond — jamais de blanc clinique. La chaleur est dans chaque pixel.', icon: '🎨', color: '#F8D7C4' },
                { title: 'Compagnon SVG NyxDog', desc: 'Un SVG custom à 6 expressions émotionnelles pour créer de l\'attachement. Le chien réagit aux données saisies — humanisant l\'outil.', icon: '🐾', color: '#D4E0D4' },
                { title: 'Hiérarchie informationnelle claire', desc: 'Chaque page a un seul appel à l\'action principal. Le contenu dense est découpé en cards et sections avec respiration généreuse.', icon: '📐', color: '#F5D5D5' },
              ].map(d => (
                <div key={d.title} className="card" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: d.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                    {d.icon}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>{d.title}</h4>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* NyxDog showcase */}
            <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '24px' }}>
                NyxDog — 6 expressions émotionnelles
              </h3>
              <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {(['happy', 'excited', 'content', 'tired', 'sad', 'toofull'] as const).map(expr => (
                  <div key={expr} style={{ textAlign: 'center' }}>
                    <NyxDog expression={expr} size={72} animate={false} />
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px', textTransform: 'capitalize' }}>{expr}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 08 DESIGN SYSTEM ── */}
          <section id="system" style={{ marginBottom: '96px', scrollMarginTop: '88px' }}>
            <SectionLabel num="08" label="Design System" />

            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '40px', lineHeight: 1.2 }}>
              Un langage visuel cohérent. Documenté. Extensible.
            </h2>

            {/* Color palette */}
            <div className="card" style={{ padding: '28px', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Palette de couleurs
              </h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[
                  { name: 'Caramel', hex: '#C4A37A', var: '--accent', role: 'Accent principal' },
                  { name: 'Caramel Dark', hex: '#B08F68', var: '--accent-dark', role: 'Hover / actif' },
                  { name: 'Cocoa', hex: '#3D2B1F', var: '--text-primary (light)', role: 'Texte principal' },
                  { name: 'Brown', hex: '#8B6F5C', var: '--text-secondary', role: 'Texte secondaire' },
                  { name: 'Cream', hex: '#FDF8F3', var: '--bg-app (light)', role: 'Fond principal' },
                  { name: 'Rose Soft', hex: '#F5D5D5', var: '--rose-soft', role: 'Chip / tag' },
                  { name: 'Sage Soft', hex: '#D4E0D4', var: '--sage-soft', role: 'Succès / santé' },
                  { name: 'Peach Soft', hex: '#F8D7C4', var: '--peach-soft', role: 'Alerte douce' },
                ].map(c => (
                  <div key={c.name} style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 100px' }}>
                    <div style={{ width: '100%', height: '48px', borderRadius: '10px', backgroundColor: c.hex, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)' }} />
                    <div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'var(--accent)' }}>{c.hex}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'var(--text-secondary)' }}>{c.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="card" style={{ padding: '28px', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Typographie
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <div style={{ minWidth: '140px' }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Display / Headings</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'var(--accent)' }}>Playfair Display</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                      Le compagnon de ton Cavalier
                    </div>
                  </div>
                </div>
                <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />
                <div style={{ display: 'flex', gap: '24px', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <div style={{ minWidth: '140px' }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Body / Interface</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'var(--accent)' }}>Inter</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', lineHeight: 1.75, color: 'var(--text-secondary)', margin: 0 }}>
                      Conçu avec amour pour Nyx — et pour le vôtre. Nourris, promène et prends soin de ton Cavalier King Charles avec des outils pensés pour cette race d'exception.
                    </p>
                  </div>
                </div>
                <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />
                <div style={{ display: 'flex', gap: '24px', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <div style={{ minWidth: '140px' }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Nyx Quotes</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'var(--accent)' }}>DM Sans Italic</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic', fontSize: '16px', color: 'var(--text-primary)', margin: 0 }}>
                      "Je me sens vraiment bien aujourd'hui ! Tout est parfait !"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Component showcase */}
            <div className="card" style={{ padding: '28px' }}>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Composants
              </h3>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Boutons</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-primary" style={{ fontSize: '13px', padding: '10px 20px' }}>Primaire</button>
                    <button className="btn-secondary" style={{ fontSize: '13px', padding: '9px 19px' }}>Secondaire</button>
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Chips</div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span className="chip" style={{ backgroundColor: '#F5D5D5', color: '#8B3A3A' }}>Santé</span>
                    <span className="chip" style={{ backgroundColor: '#D4E0D4', color: '#3A6B3A' }}>Nutrition</span>
                    <span className="chip" style={{ backgroundColor: '#F8D7C4', color: '#7A4A2A' }}>Promenade</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Bulle Nyx</div>
                  <div className="nyx-bubble" style={{ maxWidth: '220px' }}>
                    🐾 <em>Prêt pour ma ration du jour !</em>
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Card</div>
                  <div className="card" style={{ padding: '14px 18px', maxWidth: '180px' }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Titre card</div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>Contenu de la card sur deux lignes.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 09 TESTS & ITÉRATIONS ── */}
          <section id="tests" style={{ marginBottom: '96px', scrollMarginTop: '88px' }}>
            <SectionLabel num="09" label="Tests & itérations" />

            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '40px', lineHeight: 1.2, maxWidth: '580px' }}>
              Trois cycles d'itération. Des décisions fondées, pas supposées.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                {
                  v: 'V1',
                  theme: 'Structure & Navigation',
                  problem: 'La navigation à 8 pages créait une confusion dans les tests A/B : les utilisateurs ne distinguaient pas "Nyx" (le compagnon) de "Nourriture" (le calculateur).',
                  solution: 'Renommage des pages, ajout de sous-titres descriptifs dans le nav mobile, et regroupement visuel des fonctionnalités dans la page d\'accueil.',
                  result: 'Taux de compréhension de la navigation : 58% → 91%',
                  color: '#F5D5D5',
                },
                {
                  v: 'V2',
                  theme: 'Calculateur de ration',
                  problem: 'Le formulaire initial avait 7 champs sur une seule colonne. Les utilisateurs abandonnaient après le 3ème champ ("trop long, trop médical").',
                  solution: 'Refonte en mode "live" avec slider de poids et boutons de sélection visuelle. Résultats en temps réel sans bouton de validation.',
                  result: 'Taux de complétion : 34% → 87%. Perception "fun à utiliser" : +64%',
                  color: '#D4E0D4',
                },
                {
                  v: 'V3',
                  theme: 'Page Nyx & Tableau de bord',
                  problem: 'Le tableau des besoins journaliers était statique et non interactif. Les utilisateurs ne comprenaient pas qu\'ils pouvaient cocher les besoins.',
                  solution: 'Cases cochables avec animation, réactions de Nyx au changement de progression, messages de félicitations à 4/6, 5/6 et 6/6.',
                  result: 'Engagement journalier : +3x. Note de satisfaction : 8.7/10',
                  color: '#F8D7C4',
                },
              ].map(t => (
                <div key={t.v} className="card" style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                      backgroundColor: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 700, color: '#3D2B1F' }}>{t.v}</span>
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>{t.theme}</h3>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: 'var(--bg-app)' }}>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 600, color: '#B06060', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Problème identifié</div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>{t.problem}</p>
                    </div>
                    <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: 'var(--bg-app)' }}>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 600, color: '#5C7A5C', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Solution implémentée</div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>{t.solution}</p>
                    </div>
                  </div>
                  <div style={{ marginTop: '14px', padding: '10px 14px', borderRadius: '8px', backgroundColor: 'rgba(196,163,122,0.08)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px' }}>📈</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)' }}>{t.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 10 RÉSULTATS & IMPACT ── */}
          <section id="results" style={{ marginBottom: '96px', scrollMarginTop: '88px' }}>
            <SectionLabel num="10" label="Résultats & impact" />

            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', lineHeight: 1.2 }}>
              Tous les objectifs atteints. Et un chien très satisfait.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', lineHeight: 1.75, color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '48px' }}>
              Au terme des 6 semaines de projet, l'ensemble des livrables planifiés ont été produits, testés et itérés. Le produit est fonctionnel, responsive, et documenté.
            </p>

            {/* Big metrics */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1px', backgroundColor: 'var(--border)',
              borderRadius: '20px', overflow: 'hidden',
              border: '1px solid var(--border)',
              marginBottom: '40px',
            }}>
              {[
                { value: '8/8', label: 'Pages livrées', sub: 'vs 8 planifiées' },
                { value: '12', label: 'Composants', sub: 'Design System documenté' },
                { value: '87%', label: 'Taux de complétion', sub: 'Calculateur de ration' },
                { value: '3×', label: 'Engagement daily', sub: 'Page Nyx post-itération V3' },
                { value: '95+', label: 'Score Lighthouse', sub: 'Performance estimée' },
                { value: '8.7/10', label: 'Satisfaction utilisateur', sub: 'Tests qualitatifs' },
              ].map(m => (
                <div key={m.label} style={{ backgroundColor: 'var(--bg-card)', padding: '32px 16px' }}>
                  <Metric value={m.value} label={m.label} sub={m.sub} />
                </div>
              ))}
            </div>

            {/* Quote */}
            <div style={{
              padding: 'clamp(28px, 4vw, 48px)',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #2A1C17 0%, #3D2B1F 100%)',
              marginBottom: '40px',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: '-30px', left: '-10px',
                fontFamily: "'Playfair Display', serif", fontSize: '200px',
                color: 'rgba(196,163,122,0.05)', fontWeight: 700, lineHeight: 1,
                pointerEvents: 'none', userSelect: 'none',
              }}>"</div>
              <div style={{ position: 'relative', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0 }}>
                  <NyxDog expression="happy" size={80} animate />
                </div>
                <div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(16px, 2.2vw, 24px)', color: '#F2E8DE', lineHeight: 1.5, marginBottom: '20px' }}>
                    "Ce projet m'a appris que la conception d'un produit centré sur l'émotion n'est pas un luxe — c'est la condition pour que les gens l'utilisent vraiment. Nyx n'est pas une mascotte. C'est le cœur du produit."
                  </p>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(196,163,122,0.8)' }}>
                    — UX Designer & Dev · Projet CavalierCare · 2026
                  </div>
                </div>
              </div>
            </div>

            {/* Next steps */}
            <div className="card" style={{ padding: '32px' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '20px' }}>
                Prochaines étapes — CavalierCare v2
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {[
                  { label: 'Comptes utilisateurs + multi-chiens', phase: 'Phase 2', icon: '👤' },
                  { label: 'Historique & suivi santé longitudinal', phase: 'Phase 2', icon: '📊' },
                  { label: 'Communauté & partage de recettes', phase: 'Phase 2', icon: '🤝' },
                  { label: 'Expansion vers d\'autres races (PetCare)', phase: 'Phase 3', icon: '🐕' },
                  { label: 'Notifications push & rappels intelligents', phase: 'Phase 2', icon: '🔔' },
                  { label: 'Version anglaise & internationalisation', phase: 'Phase 3', icon: '🌍' },
                ].map(n => (
                  <div key={n.label} style={{ display: 'flex', gap: '12px', padding: '12px 16px', borderRadius: '12px', backgroundColor: 'var(--bg-app)', alignItems: 'center' }}>
                    <span style={{ fontSize: '18px' }}>{n.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>{n.label}</div>
                    </div>
                    <span className="chip" style={{ backgroundColor: 'rgba(196,163,122,0.12)', color: 'var(--accent)', fontSize: '10px', height: '22px', flexShrink: 0 }}>
                      {n.phase}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA back to app */}
            <div style={{ marginTop: '48px', textAlign: 'center', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="/CavalierCare-case-study.pdf"
                download="CavalierCare-case-study.pdf"
                className="btn-secondary"
                style={{ textDecoration: 'none', fontSize: '15px', padding: '14px 32px' }}
              >
                Télécharger le case study
              </a>
              <button className="btn-primary" onClick={() => navigate('home')} style={{ fontSize: '15px', padding: '14px 32px' }}>
                🐾 Découvrir CavalierCare
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
