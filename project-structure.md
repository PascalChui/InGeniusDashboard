# Structure du Projet InGenius Dashboard

Ce document détaille l'organisation des dossiers et fichiers du projet InGenius Dashboard, conçue pour supporter efficacement l'écosystème d'agents IA.

## Structure Actuelle

```
InGeniusDashboard/
├── index.html              # Interface principale du dashboard
├── style.css               # Styles CSS du dashboard
├── scripts.js              # JavaScript pour le dashboard
├── README.md               # Documentation principale du projet
├── Perspectives_Avenir_InGenius.md  # Vision future du projet
├── GPT/                    # Documentation des agents IA
│   ├── Fiche_Agent_*.docx  # Descriptions des agents
│   └── ...
└── ingenius-mind/          # Mémoire et contexte du système
    ├── context/            # Contexte global du projet
    ├── instructions/       # Instructions pour les agents
    └── logs/               # Journaux d'activité
```

## Structure Proposée (Évolution)

```
InGeniusDashboard/
├── src/                          # Code source principal
│   ├── components/               # Composants d'interface utilisateur
│   │   ├── agents-panel/         # Interface de gestion des agents
│   │   ├── mastermind-console/   # Console d'interaction Mastermind
│   │   ├── project-overview/     # Vue d'ensemble des projets
│   │   └── analytics/            # Visualisations et statistiques
│   ├── services/                 # Services partagés
│   │   ├── api/                  # Services d'API
│   │   ├── state/                # Gestion d'état
│   │   └── utils/                # Utilitaires communs
│   └── agents/                   # Intégration des agents
│       ├── mastermind/           # Agent Mastermind
│       ├── architect/            # Agent Architecte
│       ├── developer/            # Agent Développeur
│       ├── assembler/            # Agent Assembleur (nouveau)
│       └── ...                   # Autres agents
├── public/                       # Ressources statiques
│   ├── images/                   # Images et icônes
│   └── assets/                   # Autres ressources
├── docs/                         # Documentation
│   ├── agents/                   # Documentation des agents
│   ├── architecture/             # Architecture du système
│   ├── user-guide/               # Guide utilisateur
│   └── api/                      # Documentation API
├── apps/                         # Applications développées
│   ├── visamate/                 # Application VisaMate
│   ├── momentrix/                # Application Momentrix NBA
│   ├── logifind/                 # Application LogiFind
│   └── platform/                 # Plateforme d'agents
├── tests/                        # Tests
│   ├── unit/                     # Tests unitaires
│   ├── integration/              # Tests d'intégration
│   └── e2e/                      # Tests end-to-end
├── scripts/                      # Scripts utilitaires
│   ├── setup.js                  # Script d'installation
│   └── build.js                  # Script de build
├── ingenius-mind/                # Mémoire du système (déjà existant)
│   ├── context/                  # Contexte global
│   ├── instructions/             # Instructions
│   └── logs/                     # Journaux d'activité
├── .github/                      # Configuration GitHub
│   └── workflows/                # GitHub Actions workflows
├── .gitignore                    # Fichiers à ignorer par Git
├── package.json                  # Configuration npm
├── README.md                     # Documentation principale
└── Perspectives_Avenir_InGenius.md  # Vision future
```

## Rôles et Responsabilités des Dossiers

### `/src`
Contient tout le code source du dashboard. Organisé en composants d'interface utilisateur, services partagés et intégrations d'agents.

### `/docs`
Documentation complète du projet, incluant guides techniques, guides utilisateurs, et spécifications d'API.

### `/apps`
Applications développées par l'écosystème InGenius, chacune dans son propre sous-dossier.

### `/tests`
Tests unitaires, d'intégration et end-to-end pour assurer la qualité du code.

### `/ingenius-mind`
Sert de "mémoire" au système, stockant le contexte, les instructions et les logs pour maintenir la continuité.

### `/public`
Ressources statiques comme les images, icônes et autres assets.

### `/.github`
Configuration pour GitHub, notamment les workflows d'automatisation.

## Recommandations d'Implémentation

1. **Démarrer avec les fondations** : Commencer par implémenter la structure de base `/src` et le dashboard principal.

2. **Adopter une approche modulaire** : Développer chaque composant et service de manière indépendante pour faciliter la maintenance.

3. **Intégration progressive des agents** : Intégrer les agents un par un, en commençant par Mastermind et en ajoutant progressivement les autres.

4. **Documentation continue** : Maintenir la documentation à jour au fur et à mesure du développement.

5. **Tests systématiques** : Mettre en place des tests pour chaque nouvelle fonctionnalité.

Cette structure est conçue pour supporter l'évolution de l'écosystème InGenius à travers les trois phases décrites dans le document "Perspectives d'Avenir", tout en maintenant une organisation claire et modulaire.
