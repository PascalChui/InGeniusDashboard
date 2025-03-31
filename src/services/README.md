# Services Partagés

Ce répertoire contient les services partagés et utilitaires qui sont utilisés par différents composants et agents du Dashboard InGenius. Ces services fournissent des fonctionnalités communes qui peuvent être réutilisées à travers l'application.

## Organisation des Services

### `/api`
Services pour la communication avec des APIs externes et internes:
- Connecteurs vers les modèles d'IA
- Gestion des requêtes et réponses
- Gestion des erreurs et des retries
- Caching des réponses

### `/state`
Gestion de l'état global de l'application:
- Store central pour les données partagées
- Mécanismes de souscription aux changements
- Persistance de l'état
- Synchronisation entre composants

### `/utils`
Utilitaires et fonctions d'aide:
- Formatage de texte et données
- Manipulation de dates et heures
- Validation de données
- Fonctions mathématiques et statistiques
- Génération de visualisations

## Principes de Conception des Services

1. **Découplage** - Les services doivent être faiblement couplés pour favoriser la modularité

2. **Interface Stable** - Fournir des interfaces stables et bien documentées

3. **Testabilité** - Concevoir les services pour qu'ils soient facilement testables

4. **Performance** - Optimiser les services critiques pour la performance

5. **Réutilisabilité** - Maximiser la réutilisation du code à travers l'application

## Services Planifiés

### Service de Communication Inter-Agents
Un service qui facilite la communication entre les différents agents:
- Publication et souscription à des événements
- Routage des messages
- Gestion des files d'attente
- Monitoring des échanges

### Service de Persistance
Un service pour sauvegarder et récupérer des données:
- Stockage local
- Synchronisation avec le backend
- Gestion des versions
- Exportation/importation de données

### Service de Journalisation
Un service pour journaliser les activités du système:
- Enregistrement des événements importants
- Niveaux de détail configurables
- Filtrage et recherche
- Exportation des logs

### Service d'Authentification
Un service pour gérer l'authentification et les autorisations:
- Gestion des sessions
- Contrôle d'accès
- Intégration avec des fournisseurs d'identité
- Sécurisation des communications

Ces services constituent l'épine dorsale technique du Dashboard InGenius, permettant aux composants et aux agents de fonctionner harmonieusement ensemble tout en maintenant une architecture propre et modulaire.
