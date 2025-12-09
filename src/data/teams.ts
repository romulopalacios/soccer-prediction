// Lista de equipos populares para el autocompletado
export interface TeamSuggestion {
  name: string;
  country: string;
  league?: string;
}

export const popularTeams: TeamSuggestion[] = [
  // La Liga (España)
  { name: 'Real Madrid', country: '🇪🇸 España', league: 'La Liga' },
  { name: 'Barcelona', country: '🇪🇸 España', league: 'La Liga' },
  { name: 'FC Barcelona', country: '🇪🇸 España', league: 'La Liga' },
  { name: 'Atlético Madrid', country: '🇪🇸 España', league: 'La Liga' },
  { name: 'Real Sociedad', country: '🇪🇸 España', league: 'La Liga' },
  { name: 'Athletic Bilbao', country: '🇪🇸 España', league: 'La Liga' },
  { name: 'Real Betis', country: '🇪🇸 España', league: 'La Liga' },
  { name: 'Villarreal', country: '🇪🇸 España', league: 'La Liga' },
  { name: 'Valencia', country: '🇪🇸 España', league: 'La Liga' },
  { name: 'Sevilla', country: '🇪🇸 España', league: 'La Liga' },
  { name: 'Getafe', country: '🇪🇸 España', league: 'La Liga' },
  
  // Premier League (Inglaterra)
  { name: 'Manchester City', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', league: 'Premier League' },
  { name: 'Manchester United', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', league: 'Premier League' },
  { name: 'Liverpool', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', league: 'Premier League' },
  { name: 'Arsenal', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', league: 'Premier League' },
  { name: 'Chelsea', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', league: 'Premier League' },
  { name: 'Tottenham', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', league: 'Premier League' },
  { name: 'Newcastle United', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', league: 'Premier League' },
  { name: 'Aston Villa', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', league: 'Premier League' },
  { name: 'Brighton', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', league: 'Premier League' },
  { name: 'West Ham', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', league: 'Premier League' },
  
  // Serie A (Italia)
  { name: 'Inter Milan', country: '🇮🇹 Italia', league: 'Serie A' },
  { name: 'AC Milan', country: '🇮🇹 Italia', league: 'Serie A' },
  { name: 'Juventus', country: '🇮🇹 Italia', league: 'Serie A' },
  { name: 'Napoli', country: '🇮🇹 Italia', league: 'Serie A' },
  { name: 'Roma', country: '🇮🇹 Italia', league: 'Serie A' },
  { name: 'Lazio', country: '🇮🇹 Italia', league: 'Serie A' },
  { name: 'Atalanta', country: '🇮🇹 Italia', league: 'Serie A' },
  { name: 'Fiorentina', country: '🇮🇹 Italia', league: 'Serie A' },
  
  // Bundesliga (Alemania)
  { name: 'Bayern Munich', country: '🇩🇪 Alemania', league: 'Bundesliga' },
  { name: 'Borussia Dortmund', country: '🇩🇪 Alemania', league: 'Bundesliga' },
  { name: 'RB Leipzig', country: '🇩🇪 Alemania', league: 'Bundesliga' },
  { name: 'Bayer Leverkusen', country: '🇩🇪 Alemania', league: 'Bundesliga' },
  { name: 'Union Berlin', country: '🇩🇪 Alemania', league: 'Bundesliga' },
  { name: 'Eintracht Frankfurt', country: '🇩🇪 Alemania', league: 'Bundesliga' },
  
  // Ligue 1 (Francia)
  { name: 'PSG', country: '🇫🇷 Francia', league: 'Ligue 1' },
  { name: 'Paris Saint-Germain', country: '🇫🇷 Francia', league: 'Ligue 1' },
  { name: 'Marseille', country: '🇫🇷 Francia', league: 'Ligue 1' },
  { name: 'Monaco', country: '🇫🇷 Francia', league: 'Ligue 1' },
  { name: 'Lyon', country: '🇫🇷 Francia', league: 'Ligue 1' },
  { name: 'Lille', country: '🇫🇷 Francia', league: 'Ligue 1' },
  
  // Países Bajos
  { name: 'Ajax', country: '🇳🇱 Países Bajos', league: 'Eredivisie' },
  { name: 'PSV', country: '🇳🇱 Países Bajos', league: 'Eredivisie' },
  { name: 'Feyenoord', country: '🇳🇱 Países Bajos', league: 'Eredivisie' },
  
  // Portugal
  { name: 'Benfica', country: '🇵🇹 Portugal', league: 'Primeira Liga' },
  { name: 'Porto', country: '🇵🇹 Portugal', league: 'Primeira Liga' },
  { name: 'Sporting CP', country: '🇵🇹 Portugal', league: 'Primeira Liga' },
  
  // Escocia
  { name: 'Celtic', country: '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Escocia', league: 'Scottish Premiership' },
  { name: 'Rangers', country: '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Escocia', league: 'Scottish Premiership' },
  
  // Argentina
  { name: 'Boca Juniors', country: '🇦🇷 Argentina', league: 'Liga Profesional' },
  { name: 'River Plate', country: '🇦🇷 Argentina', league: 'Liga Profesional' },
  { name: 'Racing Club', country: '🇦🇷 Argentina', league: 'Liga Profesional' },
  { name: 'Independiente', country: '🇦🇷 Argentina', league: 'Liga Profesional' },
  { name: 'San Lorenzo', country: '🇦🇷 Argentina', league: 'Liga Profesional' },
  
  // Brasil
  { name: 'Flamengo', country: '🇧🇷 Brasil', league: 'Brasileirão' },
  { name: 'Palmeiras', country: '🇧🇷 Brasil', league: 'Brasileirão' },
  { name: 'São Paulo', country: '🇧🇷 Brasil', league: 'Brasileirão' },
  { name: 'Corinthians', country: '🇧🇷 Brasil', league: 'Brasileirão' },
  { name: 'Fluminense', country: '🇧🇷 Brasil', league: 'Brasileirão' },
  { name: 'Santos', country: '🇧🇷 Brasil', league: 'Brasileirão' },
  
  // Chile
  { name: 'Colo-Colo', country: '🇨🇱 Chile', league: 'Primera División' },
  { name: 'Universidad de Chile', country: '🇨🇱 Chile', league: 'Primera División' },
  { name: 'Universidad Católica', country: '🇨🇱 Chile', league: 'Primera División' },
  
  // Uruguay
  { name: 'Peñarol', country: '🇺🇾 Uruguay', league: 'Primera División' },
  { name: 'Nacional', country: '🇺🇾 Uruguay', league: 'Primera División' },
  
  // Ecuador
  { name: 'Barcelona SC', country: '🇪🇨 Ecuador', league: 'Serie A' },
  { name: 'Emelec', country: '🇪🇨 Ecuador', league: 'Serie A' },
  { name: 'LDU Quito', country: '🇪🇨 Ecuador', league: 'Serie A' },
  { name: 'Independiente del Valle', country: '🇪🇨 Ecuador', league: 'Serie A' },
  
  // Colombia
  { name: 'Atlético Nacional', country: '🇨🇴 Colombia', league: 'Categoría Primera A' },
  { name: 'Millonarios', country: '🇨🇴 Colombia', league: 'Categoría Primera A' },
  { name: 'América de Cali', country: '🇨🇴 Colombia', league: 'Categoría Primera A' },
  
  // México
  { name: 'Club América', country: '🇲🇽 México', league: 'Liga MX' },
  { name: 'Chivas Guadalajara', country: '🇲🇽 México', league: 'Liga MX' },
  { name: 'Cruz Azul', country: '🇲🇽 México', league: 'Liga MX' },
  { name: 'Pumas UNAM', country: '🇲🇽 México', league: 'Liga MX' },
  { name: 'Monterrey', country: '🇲🇽 México', league: 'Liga MX' },
  { name: 'Tigres UANL', country: '🇲🇽 México', league: 'Liga MX' },
].sort((a, b) => a.name.localeCompare(b.name));
