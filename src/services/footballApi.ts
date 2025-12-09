export interface Team {
  id: number;
  name: string;
  logo: string;
  country: string;
}

export interface TeamSearchResponse {
  teams: Team[];
}

// Cache para evitar llamadas repetidas
const teamCache = new Map<string, Team[]>();
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutos

// API gratuita de fútbol - API-FOOTBALL en RapidAPI
// Alternativa: api-football.com (necesitas registrarte para obtener una key gratuita)
const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY || '';
const BASE_URL = 'https://v3.football.api-sports.io';

export async function searchTeams(query: string): Promise<Team[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const cacheKey = query.toLowerCase();
  const cached = teamCache.get(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    // Si no hay API key, usar datos locales como fallback
    if (!API_KEY) {
      console.warn('No FOOTBALL_API_KEY configured, using local teams');
      return getLocalTeamsFallback(query);
    }

    const response = await fetch(
      `${BASE_URL}/teams?search=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch teams');
    }

    const data = await response.json();
    
    const teams: Team[] = data.response?.map((item: any) => ({
      id: item.team.id,
      name: item.team.name,
      logo: item.team.logo,
      country: item.team.country || 'Unknown',
    })) || [];

    // Guardar en cache
    teamCache.set(cacheKey, teams);
    setTimeout(() => teamCache.delete(cacheKey), CACHE_DURATION);

    return teams;
  } catch (error) {
    console.error('Error fetching teams:', error);
    return getLocalTeamsFallback(query);
  }
}

// Fallback a datos locales si la API no está disponible
function getLocalTeamsFallback(query: string): Team[] {
  const localTeams = [
    { id: 1, name: 'Real Madrid', logo: '⚪', country: '🇪🇸 España' },
    { id: 2, name: 'Barcelona', logo: '🔵', country: '🇪🇸 España' },
    { id: 3, name: 'Manchester City', logo: '🔵', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra' },
    { id: 4, name: 'Liverpool', logo: '🔴', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra' },
    { id: 5, name: 'Bayern Munich', logo: '🔴', country: '🇩🇪 Alemania' },
    { id: 6, name: 'PSG', logo: '🔵', country: '🇫🇷 Francia' },
    { id: 7, name: 'Juventus', logo: '⚫', country: '🇮🇹 Italia' },
    { id: 8, name: 'Inter Milan', logo: '🔵', country: '🇮🇹 Italia' },
    { id: 9, name: 'Boca Juniors', logo: '🔵', country: '🇦🇷 Argentina' },
    { id: 10, name: 'River Plate', logo: '🔴', country: '🇦🇷 Argentina' },
    { id: 11, name: 'Barcelona SC', logo: '🟡', country: '🇪🇨 Ecuador' },
    { id: 12, name: 'Flamengo', logo: '🔴', country: '🇧🇷 Brasil' },
  ];

  return localTeams.filter(team =>
    team.name.toLowerCase().includes(query.toLowerCase())
  );
}
