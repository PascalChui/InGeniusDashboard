/**
 * Point d'entrée pour tous les agents IA Momentrix
 * 
 * Ce fichier exporte tous les agents du système Momentrix NBA
 * pour faciliter leur importation dans d'autres modules.
 */

// Imports de tous les agents
import mastermind from './mastermind';
import tacticalTrigger from './tactical-trigger';
import monetix from './monetix';
import automate from './automate';
import bookmaker from './bookmaker';
import chameleon from './chameleon';
import shadowPrediction from './shadow-prediction';
import innovative from './innovative';
import architecte from './architecte';
import erreurDetector from './erreur-detector';

// Export de tous les agents
export {
  mastermind,
  tacticalTrigger,
  monetix,
  automate,
  bookmaker,
  chameleon,
  shadowPrediction,
  innovative,
  architecte,
  erreurDetector
};

// Export par défaut d'un objet contenant tous les agents
export default {
  mastermind,
  tacticalTrigger,
  monetix,
  automate,
  bookmaker,
  chameleon,
  shadowPrediction,
  innovative,
  architecte,
  erreurDetector
};