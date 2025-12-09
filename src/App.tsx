import { useState } from 'react';
import { PredictionForm } from './components/PredictionForm';
import { PredictionResults } from './components/PredictionResults';
import { predictMatch } from './services/geminiApi';
import type { PredictionRequest, PredictionResponse } from './types/prediction';
import './App.css';

function App() {
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRequest, setLastRequest] = useState<PredictionRequest | null>(null);

  const handlePrediction = async (request: PredictionRequest) => {
    setIsLoading(true);
    setError(null);
    setLastRequest(request);

    try {
      const result = await predictMatch(request);
      setPrediction(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido');
      console.error('Error getting prediction:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPrediction(null);
    setError(null);
    setLastRequest(null);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>⚽ Soccer Predictor Lite</h1>
        <p>Predicciones inteligentes impulsadas por IA</p>
      </header>

      <div className="container">
        {!prediction ? (
          <PredictionForm
            onSubmit={handlePrediction}
            isLoading={isLoading}
            error={error}
          />
        ) : (
          <PredictionResults
            prediction={prediction}
            homeTeam={lastRequest?.homeTeam || ''}
            awayTeam={lastRequest?.awayTeam || ''}
            homeTeamLogo={lastRequest?.homeTeamLogo}
            awayTeamLogo={lastRequest?.awayTeamLogo}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}

export default App;
