# Agents Momentrix NBA

Ce répertoire contient l'ensemble des agents d'intelligence artificielle qui composent le système Momentrix NBA. Chaque agent est spécialisé dans une tâche spécifique et ils collaborent ensemble pour fournir des prédictions précises et rentables sur les matchs NBA.

## Structure des agents

### Agents principaux

1. **Mastermind NBA** (`mastermind.js`)
   - Cerveau central du système
   - Supervise l'ensemble des analyses
   - Coordonne les décisions entre agents
   - Prend la décision finale du pari

2. **Tactical Trigger AI** (`tactical-trigger.js`)
   - Détecte les signaux pendant les matchs live
   - Analyse les runs, temps-morts, momentum
   - Agit comme déclencheur automatique de pari en temps réel

3. **Monetix AI** (`monetix.js`)
   - Évalue la rentabilité des paris
   - Simule les gains potentiels
   - Ajuste selon les profils de risque

4. **AutoMate AI** (`automate.js`)
   - Surveille l'évolution des matchs
   - Relance les modules interrompus
   - Assure le suivi et la continuité du système

5. **BookMaker AI** (`bookmaker.js`)
   - Reproduit les comportements typiques des bookmakers
   - Sert de référence tactique pour les prises de décision

6. **Chameleon AI** (`chameleon.js`)
   - Surveille les répétitions de stratégie
   - Propose des variantes intelligentes
   - Évite l'usure algorithmique et les biais d'habitude

7. **Shadow Prediction AI** (`shadow-prediction.js`)
   - Effectue des prédictions alternatives
   - Permet la comparaison et l'apprentissage automatique
   - Agit comme miroir pour comparer différentes approches

8. **Innovative AI** (`innovative.js`)
   - Propose des idées nouvelles
   - Suggère des modules ou angles d'analyse non conventionnels
   - Améliore continuellement le système

9. **Architecte IA** (`architecte.js`)
   - Structure la logique de traitement
   - Organise les modèles et données des analyses
   - Assure la cohérence du système

10. **ErreurDetector AI** (`erreur-detector.js`)
    - Vérifie les sources d'information
    - Détecte les erreurs dans les données
    - Valide les calendriers et scores officiels

### Sous-modules

Certains agents complexes sont organisés en sous-modules pour une meilleure maintenabilité :

- **Shadow Prediction AI**
  - `methods.js` : Différentes méthodes de prédiction alternatives
  - `utils.js` : Fonctions utilitaires pour l'analyse
  - `evaluation.js` : Évaluation des prédictions par rapport aux résultats
  - `analysis.js` : Analyse de performance des différentes méthodes

## Usage

Les agents peuvent être utilisés de plusieurs façons :

1. **Import individuel**
   ```javascript
   import tacticalTrigger from './agents/tactical-trigger';
   
   // Utilisation directe
   tacticalTrigger.analyzeMomentum(gameId, gameData, event);
   ```

2. **Import groupé via le point d'entrée**
   ```javascript
   import { agents, initializeAllAgents } from './momentrixAgents';
   
   // Initialisation de tous les agents
   initializeAllAgents();
   
   // Utilisation des agents
   agents.monetix.evaluateBet(betData);
   ```

3. **Import par groupe fonctionnel**
   ```javascript
   import { agentGroups } from './momentrixAgents';
   
   // Utiliser tous les agents d'analyse
   agentGroups.analysis.forEach(agent => {
     // ...
   });
   ```

## Configuration

Chaque agent expose une méthode `configure()` qui permet de personnaliser son comportement :

```javascript
import { agents } from './momentrixAgents';

// Configurer un agent spécifique
agents.monetix.configure({
  defaultBankroll: 2000,
  defaultRiskProfile: 'aggressive'
});
```

## Développement

Pour ajouter un nouvel agent au système :

1. Créer un fichier JavaScript pour l'agent dans ce répertoire
2. Implémenter l'interface standard (méthode `configure()` et autres méthodes spécifiques)
3. Exporter une instance singleton de l'agent
4. Ajouter l'agent dans `index.js` pour l'export centralisé
5. Mettre à jour `momentrixAgents.js` pour intégrer l'agent dans le système

## Tests

Pour vérifier que tous les agents fonctionnent correctement :

```bash
node test-agents.js
```

Pour valider l'architecture du système :

```bash
node check-architecture.js
```