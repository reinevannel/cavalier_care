# 🐶 CavalierCare — Compagnon digital pour une race d’exception

**CavalierCare** est une application front-end moderne conçue pour accompagner les propriétaires de Cavalier King Charles Spaniel dans leur quotidien.  

Pensé comme un outil numérique fiable, doux et accessible, le projet combine une démarche UX structurée, un design system cohérent et un développement front-end performant basé sur **React**, **TypeScript** et **Tailwind CSS v4**.

L’ambition du projet est double :

1. **Créer une expérience utile, rassurante et agréable** pour les utilisateurs, en tenant compte des besoins spécifiques de cette race sensible.  
2. **Démontrer une maîtrise professionnelle** du processus UX/UI et du développement front-end, depuis la recherche utilisateur jusqu’à la mise en production.

---

## 🎯 Vision & philosophie du produit

CavalierCare repose sur une conviction simple :  
*Un outil digital peut réellement améliorer la compréhension, la gestion et le bien-être d’un Cavalier King Charles.*

L’application vise à :

- 🎒 **Simplifier le quotidien** des propriétaires grâce à des outils pratiques  
- 📚 **Centraliser les informations essentielles** dans une interface unique  
- 🌿 **Créer une expérience douce**, cohérente et émotionnellement rassurante  
- 🧪 **Valoriser une démarche UX** complète et structurée  
- 🛠️ **Illustrer une expertise front-end** moderne, typée, maintenable et scalable

---

## 🧩 Fonctionnalités principales

### 🐾 Page d’accueil personnalisée (Nyx)
Une entrée chaleureuse centrée sur le chien, avec un accès rapide aux outils essentiels.

### 🍽️ Calculateur alimentaire
Calcul de la ration journalière basé sur le poids, l’âge, l’activité et les besoins spécifiques de la race.  
La logique métier est isolée dans `ration.ts` pour une meilleure maintenabilité.

### 🥣 Recettes adaptées
Sélection de recettes et snacks sains, spécialement pensés pour les Cavaliers King Charles.

### 🚶 Planificateur de promenades
Organisation des sorties, suivi des distances et recommandations selon la météo et le niveau d’activité.

### ❤️ Conseils santé
Prévention, signaux d’alerte et bonnes pratiques pour une race cardiaque et fragile.

### 📘 Étude de cas UX / Product Design
Une page complète retraçant la démarche UX : contexte, problématique, insights, architecture, design system, prototypes et décisions.

### 🌙 Mode clair / sombre
Gestion du thème avec persistance locale (`localStorage`) et respect des préférences système.

### ⚡ Lazy loading & Suspense
Chargement progressif des pages pour optimiser les performances et réduire le bundle initial.

---

## 🛠️ Stack technique

| Technologie          | Rôle                                      |
|----------------------|-------------------------------------------|
| **React 19**         | Composants modernes, Suspense, lazy loading |
| **TypeScript**       | Typage strict, fiabilité et maintenabilité |
| **Tailwind CSS v4**  | Tokens personnalisés, design system cohérent |
| **Vite**             | Dev server ultra-rapide, HMR performant, build optimisé |
| **Design System**    | Couleurs, typographies, composants réutilisables |
| **Architecture modulaire** | Pages, composants, utilitaires et logique métier isolée |

---

## 🔍 Architecture du projet

### 📦 `components/` — Composants UI réutilisables
Ce dossier regroupe les briques visuelles de l’interface.  
Chaque composant est isolé, typé et pensé pour être réutilisable.

- `Nav.tsx` — Navigation principale + gestion du thème  
- `ChoiceButtons.tsx` — Boutons interactifs pour les choix utilisateur  
- `NyxBubble.tsx` / `NyxDog.tsx` — Éléments graphiques illustratifs pour l’accueil

### 🗺️ `pages/` — Architecture des écrans
Chaque fichier représente une page complète de l’application.

- `HomePage` — Accueil, présentation du chien, accès rapide  
- `NyxPage` — Fiche dédiée au Cavalier King Charles  
- `FoodCalculatorPage` — Calculateur alimentaire  
- `RecipesPage` — Recettes adaptées  
- `WalkPlannerPage` — Planification des promenades  
- `HealthTipsPage` — Conseils santé  
- `AboutPage` — Présentation du projet  
- `CaseStudyPage` — Étude de cas UX / Product Design

### ⚙️ `App.tsx` — Cœur de l’application
- Gestion du thème (clair / sombre)  
- Navigation interne via l’état `page`  
- Lazy loading des pages  
- Scroll automatique avec respect de `prefers-reduced-motion`

### 🧠 `ration.ts` — Logique métier
Toute la logique du calculateur alimentaire est isolée ici pour :
- Une meilleure testabilité  
- Une évolution indépendante de l’UI  
- Une architecture propre et professionnelle

### 🎨 `index.css` — Styles globaux
- Variables CSS pour le thème  
- Tokens du design system  
- Styles de base (reset, typographie, couleurs)

### 🚀 `main.tsx` — Point d’entrée React
Initialisation de l’application et injection dans le DOM.

---

## 🧩 Pourquoi cette architecture ?

Cette structure a été pensée pour offrir :

- **Clarté** — Chaque dossier a une responsabilité unique  
- **Scalabilité** — Ajout de nouvelles pages ou composants sans friction  
- **Cohérence UX/UI** — Design system centralisé et composants réutilisables  
- **Performance** — Lazy loading, Vite et Tailwind CSS v4  
- **Maintenabilité** — TypeScript, logique métier isolée et structure claire

---

## 🚀 Installation & développement

```bash
# Cloner le dépôt
git clone https://github.com/reinevannel/cavalier_care.git
cd cavalier_care

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

```
---

## ✍️ Author

🦋 **Reine Vannel Studio**  
UX Designer & Front-End Developer  

Créé avec ❤️ — pour les Cavaliers King Charles et leurs humains.




