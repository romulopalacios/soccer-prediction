import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { PredictionResponse } from '../types/prediction';
import './PredictionResults.css';

interface PredictionResultsProps {
  prediction: PredictionResponse;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  onReset: () => void;
}

export const PredictionResults: React.FC<PredictionResultsProps> = ({
  prediction,
  homeTeam,
  awayTeam,
  homeTeamLogo,
  awayTeamLogo,
  onReset,
}) => {
  const chartData = [
    { name: 'Local', value: prediction.probabilities.home, color: '#10b981' },
    { name: 'Empate', value: prediction.probabilities.draw, color: '#64748b' },
    { name: 'Visitante', value: prediction.probabilities.away, color: '#3b82f6' },
  ];

  const getWinnerText = () => {
    if (prediction.winner === 'home') return `Victoria ${homeTeam}`;
    if (prediction.winner === 'away') return `Victoria ${awayTeam}`;
    return 'Empate';
  };

  const getConfidenceText = () => {
    if (prediction.confidenceLevel === 'high') return 'Alta Confianza';
    if (prediction.confidenceLevel === 'medium') return 'Confianza Media';
    return 'Baja Confianza';
  };

  return (
    <div className="results-container">
      <div className="result-card">
        <div className="score-section">
          <h3 className="match-title">Resultado Predicho</h3>
          
          <div className="score-display">
            <div className="team-score">
              {homeTeamLogo && <img src={homeTeamLogo} alt={homeTeam} className="team-logo" />}
              <div className="team-name">{homeTeam}</div>
              <div className="score-number">{prediction.predictedScore.home}</div>
            </div>
            
            <div className="score-separator">-</div>
            
            <div className="team-score">
              {awayTeamLogo && <img src={awayTeamLogo} alt={awayTeam} className="team-logo" />}
              <div className="team-name">{awayTeam}</div>
              <div className="score-number">{prediction.predictedScore.away}</div>
            </div>
          </div>

          <div>
            <span className={`winner-badge ${prediction.winner === 'draw' ? 'draw' : ''}`}>
              {getWinnerText()}
            </span>
          </div>
        </div>

        <div className="probabilities-section">
          <h3 className="section-title">📊 Probabilidades</h3>
          
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9'
                  }}
                  formatter={(value: number) => `${value}%`}
                />
                <Legend 
                  wrapperStyle={{
                    color: '#cbd5e1'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="probability-bars">
            <div className="probability-item">
              <span className="probability-label">Victoria Local</span>
              <div className="probability-bar">
                <div 
                  className="probability-fill" 
                  style={{ width: `${prediction.probabilities.home}%` }}
                >
                  <span className="probability-text">{prediction.probabilities.home}%</span>
                </div>
              </div>
            </div>

            <div className="probability-item">
              <span className="probability-label">Empate</span>
              <div className="probability-bar">
                <div 
                  className="probability-fill draw" 
                  style={{ width: `${prediction.probabilities.draw}%` }}
                >
                  <span className="probability-text">{prediction.probabilities.draw}%</span>
                </div>
              </div>
            </div>

            <div className="probability-item">
              <span className="probability-label">Victoria Visitante</span>
              <div className="probability-bar">
                <div 
                  className="probability-fill" 
                  style={{ width: `${prediction.probabilities.away}%` }}
                >
                  <span className="probability-text">{prediction.probabilities.away}%</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span className={`confidence-badge ${prediction.confidenceLevel}`}>
              {getConfidenceText()}
            </span>
          </div>
        </div>
      </div>

      <div className="result-card factors-section">
        <h3 className="section-title">🔑 Factores Clave</h3>
        
        <ul className="factors-list">
          {prediction.keyFactors.map((factor, index) => (
            <li key={index} className="factor-item">
              <span className="factor-icon">⚡</span>
              <span className="factor-text">{factor}</span>
            </li>
          ))}
        </ul>
      </div>

      <button className="back-button" onClick={onReset}>
        Nueva Predicción
      </button>
    </div>
  );
};
