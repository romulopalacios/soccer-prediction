import { GoogleGenerativeAI } from '@google/generative-ai';
import type { PredictionRequest, PredictionResponse } from '../types/prediction';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('VITE_GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function predictMatch(request: PredictionRequest): Promise<PredictionResponse> {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });

    const prompt = `
Actúa como un experto analista deportivo de fútbol. Analiza el siguiente partido y proporciona una predicción detallada.

Equipo Local: ${request.homeTeam}
Equipo Visitante: ${request.awayTeam}

IMPORTANTE: Debes responder ÚNICAMENTE con un objeto JSON válido, sin texto adicional, siguiendo EXACTAMENTE esta estructura:

{
  "predictedScore": {
    "home": número_entero,
    "away": número_entero
  },
  "winner": "home" | "away" | "draw",
  "probabilities": {
    "home": número_entre_0_y_100,
    "draw": número_entre_0_y_100,
    "away": número_entre_0_y_100
  },
  "confidenceLevel": "low" | "medium" | "high",
  "keyFactors": [
    "factor 1",
    "factor 2",
    "factor 3"
  ]
}

Considera: forma reciente, estadísticas históricas, ventaja de local, calidad de plantilla, lesiones conocidas, y contexto actual.
Las probabilidades deben sumar 100.
Proporciona exactamente 3 factores clave.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();
    
    // Limpiar la respuesta para asegurar que es JSON válido
    text = text.trim();
    
    // Remover markdown code blocks si existen
    if (text.startsWith('```json')) {
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (text.startsWith('```')) {
      text = text.replace(/```\n?/g, '');
    }
    
    text = text.trim();
    
    const prediction: PredictionResponse = JSON.parse(text);
    
    // Validaciones
    if (!prediction.predictedScore || typeof prediction.predictedScore.home !== 'number' || typeof prediction.predictedScore.away !== 'number') {
      throw new Error('Respuesta inválida: falta predictedScore');
    }
    
    if (!['home', 'away', 'draw'].includes(prediction.winner)) {
      throw new Error('Respuesta inválida: winner debe ser home, away o draw');
    }
    
    if (!prediction.probabilities || !prediction.probabilities.home || !prediction.probabilities.draw || !prediction.probabilities.away) {
      throw new Error('Respuesta inválida: faltan probabilities');
    }
    
    if (!['low', 'medium', 'high'].includes(prediction.confidenceLevel)) {
      throw new Error('Respuesta inválida: confidenceLevel debe ser low, medium o high');
    }
    
    if (!Array.isArray(prediction.keyFactors) || prediction.keyFactors.length === 0) {
      throw new Error('Respuesta inválida: keyFactors debe ser un array con al menos un elemento');
    }
    
    // Asegurar exactamente 3 factores
    if (prediction.keyFactors.length > 3) {
      prediction.keyFactors = prediction.keyFactors.slice(0, 3);
    } else if (prediction.keyFactors.length < 3) {
      while (prediction.keyFactors.length < 3) {
        prediction.keyFactors.push('Análisis táctico del partido');
      }
    }
    
    // Normalizar probabilidades si no suman exactamente 100
    const totalProb = prediction.probabilities.home + prediction.probabilities.draw + prediction.probabilities.away;
    if (Math.abs(totalProb - 100) > 1) {
      const factor = 100 / totalProb;
      prediction.probabilities.home = Math.round(prediction.probabilities.home * factor);
      prediction.probabilities.draw = Math.round(prediction.probabilities.draw * factor);
      prediction.probabilities.away = 100 - prediction.probabilities.home - prediction.probabilities.draw;
    }
    
    return prediction;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      throw new Error(`Error de API: ${error.message}`);
    }
    
    throw new Error('No se pudo obtener la predicción. Por favor, intenta de nuevo.');
  }
}
