/**
 * Mastermind NBA
 * 
 * Cerveau central du système. Supervise tous les autres agents,
 * coordonne les décisions et prend la décision finale du pari.
 */

// Configuration par défaut
const defaultConfig = {
  // Seuils de décision
  decisionThresholds: {
    minimumConfidence: 0.65,   // Confiance minimale pour parier
    strongSignal: 0.8,         // Seuil pour un signal fort
    conflictingTolerance: 0.2  // Tolérance pour les signaux contradictoires
  },
  
  // Poids des différents agents dans la décision finale
  agentWeights: {
    tacticalTrigger: 0.4,      // Détecteur de momentum
    monetix: 0.3,              // Évaluateur de rentabilité
    bookmaker: 0.1,            // Référence de marché
    chameleon: 0.1,            // Anti-répétition
    shadowPrediction: 0.1      // Prédicteur alternatif
  },
  
  // Paramètres de fonctionnement
  operatingParameters: {
    autoDecisionMode: true,    // Prise de décision automatique
    decayTime: 120000,         // Temps (ms) après lequel un signal commence à s'affaiblir
    maxDecayPeriod: 600000,    // Temps (ms) après lequel un signal est ignoré
    maximumActiveGames: 5      // Nombre maximum de matchs suivis simultanément
  }
};

// Historique des décisions
const decisionHistory = [];

// Matchs actuellement suivis
const activeGames = {};

class MastermindAgent {
  constructor() {
    this.config = { ...defaultConfig };
    this.pendingSignals = {}; // Signaux en attente de décision
    
    console.log('Agent Mastermind NBA initialisé');
  }
  
  /**
   * Configure l'agent Mastermind
   * @param {Object} config - Nouvelle configuration
   * @returns {Object} - Statut de la configuration
   */
  configure(config = {}) {
    // Mettre à jour la configuration
    if (config.decisionThresholds) {
      this.config.decisionThresholds = {
        ...this.config.decisionThresholds,
        ...config.decisionThresholds
      };
    }
    
    if (config.agentWeights) {
      this.config.agentWeights = {
        ...this.config.agentWeights,
        ...config.agentWeights
      };
    }
    
    if (config.operatingParameters) {
      this.config.operatingParameters = {
        ...this.config.operatingParameters,
        ...config.operatingParameters
      };
    }
    
    console.log('Mastermind NBA configuré avec succès');
    
    return {
      status: 'configured',
      config: this.config
    };
  }
  
  /**
   * Enregistre un match pour suivi
   * @param {string} gameId - Identifiant du match
   * @param {Object} gameData - Données du match
   * @returns {Object} - Statut de l'enregistrement
   */
  registerGame(gameId, gameData) {
    // Vérifier si le nombre maximum de matchs est atteint
    if (Object.keys(activeGames).length >= this.config.operatingParameters.maximumActiveGames) {
      return {
        status: 'error',
        message: 'Nombre maximum de matchs atteint',
        activeGames: Object.keys(activeGames).length
      };
    }
    
    console.log(`Mastermind NBA: Enregistrement du match ${gameId}`);
    
    // Initialiser le suivi du match
    activeGames[gameId] = {
      ...gameData,
      registered: Date.now(),
      lastUpdate: Date.now(),
      signals: [],
      decisions: [],
      status: 'monitoring'
    };
    
    // Initialiser les signaux en attente
    this.pendingSignals[gameId] = [];
    
    return {
      status: 'registered',
      gameId,
      activeGames: Object.keys(activeGames).length
    };
  }
  
  /**
   * Reçoit un signal d'un agent
   * @param {string} gameId - Identifiant du match
   * @param {string} agentId - Identifiant de l'agent
   * @param {Object} signal - Signal envoyé par l'agent
   * @returns {Object} - Statut de la réception
   */
  receiveSignal(gameId, agentId, signal) {
    if (!activeGames[gameId]) {
      return {
        status: 'error',
        message: 'Match non enregistré'
      };
    }
    
    console.log(`Mastermind NBA: Signal reçu de ${agentId} pour le match ${gameId}`);
    
    // Mettre à jour le timestamp du match
    activeGames[gameId].lastUpdate = Date.now();
    
    // Créer le signal complet
    const fullSignal = {
      ...signal,
      gameId,
      agentId,
      timestamp: Date.now(),
      weight: this.config.agentWeights[agentId] || 0.1,
      processed: false
    };
    
    // Ajouter le signal à l'historique du match
    activeGames[gameId].signals.push(fullSignal);
    
    // Ajouter le signal aux signaux en attente
    this.pendingSignals[gameId].push(fullSignal);
    
    // Traiter les signaux en attente si le mode automatique est activé
    let decision = null;
    if (this.config.operatingParameters.autoDecisionMode) {
      decision = this._processSignals(gameId);
    }
    
    return {
      status: 'received',
      signalId: `${gameId}_${agentId}_${Date.now()}`,
      pendingSignals: this.pendingSignals[gameId].length,
      decision
    };
  }
  
  /**
   * Traite manuellement les signaux en attente
   * @param {string} gameId - Identifiant du match
   * @returns {Object} - Décision prise
   */
  processSignals(gameId) {
    if (!activeGames[gameId]) {
      return {
        status: 'error',
        message: 'Match non enregistré'
      };
    }
    
    console.log(`Mastermind NBA: Traitement manuel des signaux pour le match ${gameId}`);
    
    return this._processSignals(gameId);
  }
  
  /**
   * Obtient l'historique des décisions
   * @param {string} gameId - Identifiant du match (optionnel)
   * @returns {Array} - Historique des décisions
   */
  getDecisionHistory(gameId = null) {
    if (gameId) {
      return activeGames[gameId]?.decisions || [];
    }
    
    return decisionHistory;
  }
  
  /**
   * Termine le suivi d'un match
   * @param {string} gameId - Identifiant du match
   * @param {Object} finalResult - Résultat final du match
   * @returns {Object} - Rapport final
   */
  finalizeGame(gameId, finalResult = {}) {
    if (!activeGames[gameId]) {
      return {
        status: 'error',
        message: 'Match non enregistré'
      };
    }
    
    console.log(`Mastermind NBA: Finalisation du match ${gameId}`);
    
    // Marquer toutes les décisions comme finalisées
    activeGames[gameId].decisions.forEach(decision => {
      decision.finalized = true;
      
      // Évaluer la décision si le résultat final est fourni
      if (finalResult.winner) {
        const success = this._evaluateDecision(decision, finalResult);
        decision.success = success;
      }
    });
    
    // Générer le rapport final
    const finalReport = {
      gameId,
      startTime: activeGames[gameId].registered,
      endTime: Date.now(),
      duration: Date.now() - activeGames[gameId].registered,
      signalCount: activeGames[gameId].signals.length,
      decisionCount: activeGames[gameId].decisions.length,
      finalResult,
      successRate: this._calculateSuccessRate(activeGames[gameId].decisions)
    };
    
    // Ajouter à l'historique global
    decisionHistory.push(...activeGames[gameId].decisions);
    
    // Supprimer le match des actifs
    delete activeGames[gameId];
    delete this.pendingSignals[gameId];
    
    return {
      status: 'finalized',
      report: finalReport
    };
  }
  
  // Méthodes privées
  
  /**
   * Traite les signaux en attente et prend une décision
   * @private
   * @param {string} gameId - Identifiant du match
   * @returns {Object} - Décision prise
   */
  _processSignals(gameId) {
    const pendingSignals = this.pendingSignals[gameId] || [];
    
    if (pendingSignals.length === 0) {
      return {
        status: 'no_signals',
        message: 'Aucun signal en attente'
      };
    }
    
    // Grouper les signaux par marché et sélection
    const signalGroups = this._groupSignals(pendingSignals);
    
    // Calculer le score pondéré pour chaque groupe
    for (const key of Object.keys(signalGroups)) {
      signalGroups[key].weightedScore = signalGroups[key].signals.reduce((score, signal) => {
        // Appliquer la décroissance temporelle si nécessaire
        const ageMs = Date.now() - signal.timestamp;
        let decayFactor = 1.0;
        
        if (ageMs > this.config.operatingParameters.decayTime) {
          const decayProgress = Math.min(1, (ageMs - this.config.operatingParameters.decayTime) / 
                                   (this.config.operatingParameters.maxDecayPeriod - this.config.operatingParameters.decayTime));
          decayFactor = 1.0 - decayProgress;
        }
        
        return score + (signal.confidence * signal.weight * decayFactor);
      }, 0);
    }
    
    // Trier les groupes par score
    const sortedGroups = Object.values(signalGroups).sort((a, b) => b.weightedScore - a.weightedScore);
    
    // Vérifier s'il y a un groupe dominant
    if (sortedGroups.length === 0) {
      return {
        status: 'no_decision',
        message: 'Pas de groupe de signaux dominant'
      };
    }
    
    const topGroup = sortedGroups[0];
    
    // Vérifier si le score est suffisant
    if (topGroup.weightedScore < this.config.decisionThresholds.minimumConfidence) {
      return {
        status: 'low_confidence',
        message: 'Confiance insuffisante pour prendre une décision',
        topGroup
      };
    }
    
    // Vérifier s'il y a des signaux contradictoires significatifs
    if (sortedGroups.length > 1) {
      const secondGroup = sortedGroups[1];
      const scoreDiff = topGroup.weightedScore - secondGroup.weightedScore;
      
      if (scoreDiff < this.config.decisionThresholds.conflictingTolerance) {
        return {
          status: 'conflicting_signals',
          message: 'Signaux contradictoires significatifs',
          topGroup,
          secondGroup
        };
      }
    }
    
    // Créer la décision
    const decision = {
      id: `decision_${gameId}_${Date.now()}`,
      gameId,
      timestamp: Date.now(),
      market: topGroup.market,
      selection: topGroup.selection,
      confidence: topGroup.weightedScore,
      signals: topGroup.signals,
      otherGroups: sortedGroups.slice(1),
      status: 'pending',
      finalized: false
    };
    
    // Enregistrer la décision
    activeGames[gameId].decisions.push(decision);
    
    // Marquer les signaux comme traités
    topGroup.signals.forEach(signal => {
      signal.processed = true;
    });
    
    // Mettre à jour les signaux en attente
    this.pendingSignals[gameId] = pendingSignals.filter(signal => !signal.processed);
    
    console.log(`Mastermind NBA: Décision prise pour le match ${gameId} - ${decision.market}/${decision.selection} (${decision.confidence.toFixed(2)})`);
    
    return {
      status: 'decision_made',
      decision
    };
  }
  
  /**
   * Groupe les signaux par marché et sélection
   * @private
   * @param {Array} signals - Signaux à grouper
   * @returns {Object} - Groupes de signaux
   */
  _groupSignals(signals) {
    const groups = {};
    
    signals.forEach(signal => {
      if (!signal.market || !signal.pick) return;
      
      const key = `${signal.market}_${signal.pick}`;
      
      if (!groups[key]) {
        groups[key] = {
          market: signal.market,
          selection: signal.pick,
          signals: [],
          weightedScore: 0
        };
      }
      
      groups[key].signals.push(signal);
    });
    
    return groups;
  }
  
  /**
   * Évalue le succès d'une décision
   * @private
   * @param {Object} decision - Décision à évaluer
   * @param {Object} finalResult - Résultat final du match
   * @returns {boolean} - Si la décision était correcte
   */
  _evaluateDecision(decision, finalResult) {
    if (!decision || !finalResult) return false;
    
    // Évaluer selon le marché
    if (decision.market === 'moneyline') {
      return decision.selection === finalResult.winner;
    } 
    else if (decision.market === 'spread') {
      const homeScore = finalResult.score?.home || 0;
      const awayScore = finalResult.score?.away || 0;
      const spread = decision.signals[0]?.spreadValue || 0;
      
      if (decision.selection === 'home') {
        return (homeScore - awayScore) > spread;
      } else {
        return (awayScore - homeScore) > -spread;
      }
    } 
    else if (decision.market === 'total') {
      const homeScore = finalResult.score?.home || 0;
      const awayScore = finalResult.score?.away || 0;
      const totalPoints = homeScore + awayScore;
      const totalLine = decision.signals[0]?.totalLine || 0;
      
      if (decision.selection === 'over') {
        return totalPoints > totalLine;
      } else {
        return totalPoints < totalLine;
      }
    }
    
    return false;
  }
  
  /**
   * Calcule le taux de réussite des décisions
   * @private
   * @param {Array} decisions - Décisions à analyser
   * @returns {number} - Taux de réussite (0-1)
   */
  _calculateSuccessRate(decisions) {
    const evaluatedDecisions = decisions.filter(d => d.success !== undefined);
    
    if (evaluatedDecisions.length === 0) return 0;
    
    const successfulDecisions = evaluatedDecisions.filter(d => d.success === true);
    
    return successfulDecisions.length / evaluatedDecisions.length;
  }
}

// Exporter une instance singleton de l'agent
const mastermind = new MastermindAgent();
export default mastermind;