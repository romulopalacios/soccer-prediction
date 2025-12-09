import React, { useState } from 'react';
import type { PredictionRequest } from '../types/prediction';
import './PredictionForm.css';

interface PredictionFormProps {
  onSubmit: (request: PredictionRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!homeTeam.trim() || !awayTeam.trim()) {
      return;
    }

    await onSubmit({
      homeTeam: homeTeam.trim(),
      awayTeam: awayTeam.trim(),
    });
  };

  return (
    <form className="prediction-form" onSubmit={handleSubmit}>
      <h2 className="form-title">⚽ Predice el Resultado</h2>
      
      <div className="form-group">
        <label htmlFor="homeTeam" className="form-label">
          Equipo Local
        </label>
        <input
          id="homeTeam"
          type="text"
          className="form-input"
          placeholder="ej. Real Madrid"
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className="versus-text">VS</div>

      <div className="form-group">
        <label htmlFor="awayTeam" className="form-label">
          Equipo Visitante
        </label>
        <input
          id="awayTeam"
          type="text"
          className="form-input"
          placeholder="ej. Barcelona"
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={isLoading || !homeTeam.trim() || !awayTeam.trim()}
      >
        {isLoading ? (
          <>
            <span className="loading-spinner"></span>
            Analizando...
          </>
        ) : (
          'Predecir Resultado'
        )}
      </button>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </form>
  );
};
