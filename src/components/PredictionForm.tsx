import React, { useState } from 'react';
import type { PredictionRequest } from '../types/prediction';
import { Combobox } from './Combobox';
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
  const [homeTeamLogo, setHomeTeamLogo] = useState('');
  const [awayTeamLogo, setAwayTeamLogo] = useState('');

  const handleHomeTeamChange = (value: string, logo?: string) => {
    setHomeTeam(value);
    if (logo) setHomeTeamLogo(logo);
  };

  const handleAwayTeamChange = (value: string, logo?: string) => {
    setAwayTeam(value);
    if (logo) setAwayTeamLogo(logo);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!homeTeam.trim() || !awayTeam.trim()) {
      return;
    }

    await onSubmit({
      homeTeam: homeTeam.trim(),
      awayTeam: awayTeam.trim(),
      homeTeamLogo: homeTeamLogo || undefined,
      awayTeamLogo: awayTeamLogo || undefined,
    });
  };

  return (
    <form className="prediction-form" onSubmit={handleSubmit}>
      <h2 className="form-title">⚽ Predice el Resultado</h2>
      
      <div className="form-group">
        <Combobox
          id="homeTeam"
          label="Equipo Local"
          placeholder="Escribe para buscar... ej. Real Madrid"
          value={homeTeam}
          onChange={handleHomeTeamChange}
          disabled={isLoading}
          required
        />
      </div>

      <div className="versus-text">VS</div>

      <div className="form-group">
        <Combobox
          id="awayTeam"
          label="Equipo Visitante"
          placeholder="Escribe para buscar... ej. Barcelona"
          value={awayTeam}
          onChange={handleAwayTeamChange}
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
