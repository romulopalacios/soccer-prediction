export interface PredictionRequest {
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
}

export interface PredictionResponse {
  predictedScore: {
    home: number;
    away: number;
  };
  winner: 'home' | 'away' | 'draw';
  probabilities: {
    home: number;
    draw: number;
    away: number;
  };
  confidenceLevel: 'low' | 'medium' | 'high';
  keyFactors: string[];
}
