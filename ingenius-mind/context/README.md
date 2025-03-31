# Système de Mémoire InGenius

## Vue d'ensemble

Le système de mémoire d'InGenius est conçu pour maintenir un historique évolutif des connaissances, décisions et contributions des différents agents IA. Contrairement à un système traditionnel qui écrase les fichiers existants, cette architecture préserve des instantanés (*snapshots*) chronologiques de l'état du projet, permettant ainsi de suivre son évolution dans le temps.

## Architecture de la mémoire

```
/ingenius-mind/
  /context/
    /current/                  # Version actuelle des fichiers (copie de travail)
      memoire_globale.txt
      synthese_claude_ai.txt
      synthese_mastermind_gpt.txt
      ...
      
    /snapshots/                # Historique des états précédents
      /2025-03-31-1/           # Format: YYYY-MM-DD-numéro
        memoire_globale.txt
        synthese_claude_ai.txt
        synthese_mastermind_gpt.txt
        metadata.json          # Métadonnées sur le snapshot
      /2025-03-31-2/
        ...
      /2025-04-01-1/
        ...
        
    index.json                 # Index de tous les snapshots
    memoire_globale.txt        # Fichiers de travail (version actuelle)
    synthese_claude_ai.txt     # Synthèse des contributions de Claude AI
    synthese_mastermind_gpt.txt # Synthèse des décisions de Mastermind GPT
    rapport_progression_agents.md # Rapports détaillés sur l'avancement
```

## Fonctionnement du système

1. **Fichiers de travail**: Les fichiers à la racine du dossier `/context/` sont les versions de travail actuelles, modifiées par les agents.

2. **Snapshots**: Chaque snapshot est un instantané complet de l'état du système à un moment donné, stocké dans un dossier dédié.

3. **Métadonnées**: Chaque snapshot contient un fichier `metadata.json` avec des informations sur l'auteur, la date, le message de commit, et autres détails pertinents.

4. **Index**: Le fichier `index.json` contient une liste de tous les snapshots disponibles et sert de registre central.

## Outils de gestion

### memory_manager.py

Le script `memory_manager.py` est l'outil principal pour gérer le système de mémoire:

```bash
# Créer un nouveau snapshot
python memory_manager.py create-snapshot "Message décrivant les modifications"

# Lister tous les snapshots disponibles
python memory_manager.py list-snapshots

# Afficher les détails d'un snapshot spécifique
python memory_manager.py get-snapshot 2025-03-31-1

# Comparer deux snapshots
python memory_manager.py compare-snapshots 2025-03-31-1 2025-04-01-1

# Restaurer un snapshot précédent
python memory_manager.py restore-snapshot 2025-03-31-1

# Copier les fichiers actuels vers le dossier current
python memory_manager.py copy-current
```

### Intégration avec git_ia_sync.py

Le script `git_ia_sync.py` continue d'assurer la synchronisation avec GitHub:

```bash
# Synchroniser le dossier ingenius-mind avec GitHub
python git_ia_sync.py
```

## Bonnes pratiques

1. **Créer des snapshots fréquents**: Après chaque développement significatif ou changement de direction.

2. **Messages descriptifs**: Utiliser des messages de commit clairs décrivant les changements introduits.

3. **Tags pertinents**: Ajouter des tags pour faciliter la recherche future (ex: "integration", "architecture").

4. **Résumer les changements clés**: Remplir le champ `key_changes` dans le fichier de métadonnées.

5. **Synchroniser régulièrement**: Exécuter `git_ia_sync.py` après avoir créé un nouveau snapshot.

## Notes pour les agents IA

### Pour Claude AI

Claude AI peut utiliser ce système pour documenter son travail technique et ses contributions, en créant des snapshots pour marquer les étapes importantes du développement du projet.

### Pour Mastermind GPT

Mastermind GPT peut consulter l'historique des snapshots pour comprendre l'évolution du projet et prendre des décisions stratégiques éclairées.

## Évolution future

Le système de mémoire est conçu pour évoluer avec le projet InGenius:

- Indexation sémantique des contenus
- Recherche avancée dans l'historique
- Analyse automatique des différences entre versions
- Détection intelligente des changements clés
- Visualisation graphique de l'évolution du projet
