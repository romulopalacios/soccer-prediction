# Soccer Predictor Lite ⚽

Una aplicación web moderna de predicción de partidos de fútbol impulsada por IA de Google Gemini.

## 🚀 Características

- **Predicciones Inteligentes**: Utiliza Gemini 2.0 Flash para análisis de partidos
- **Interfaz Moderna**: Diseño elegante con animaciones suaves
- **Resultados Visuales**: Gráficos de pastel y barras de probabilidad
- **Análisis Detallado**: Marcador predicho, probabilidades y factores clave
- **Responsive**: Adaptado a todos los dispositivos

## 📋 Prerequisitos

- Node.js 18+ 
- npm o yarn
- API Key de Google Gemini

## 🔧 Instalación

1. **Clona o descarga el proyecto**

2. **Instala las dependencias**:
```bash
npm install
```

3. **Configura la API Key de Gemini**:

Crea un archivo `.env` en la raíz del proyecto:
```bash
VITE_GEMINI_API_KEY=tu_api_key_aqui
```

Para obtener una API Key:
- Ve a [Google AI Studio](https://aistudio.google.com/app/apikey)
- Inicia sesión con tu cuenta de Google
- Crea una nueva API Key
- Copia la key al archivo `.env`

## 🎮 Uso

### Modo Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

### Compilar para Producción
```bash
npm run build
```

### Vista Previa de Producción
```bash
npm run preview
```

## 🏗️ Estructura del Proyecto

```
soccer-prediction/
├── src/
│   ├── components/
│   │   ├── PredictionForm.tsx       # Formulario de entrada
│   │   ├── PredictionForm.css
│   │   ├── PredictionResults.tsx    # Visualización de resultados
│   │   └── PredictionResults.css
│   ├── services/
│   │   └── geminiApi.ts             # Integración con Gemini API
│   ├── types/
│   │   └── prediction.ts            # Tipos TypeScript
│   ├── App.tsx                      # Componente principal
│   ├── App.css
│   ├── main.tsx                     # Punto de entrada
│   └── index.css                    # Estilos globales
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Tecnologías Utilizadas

- **React 18** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Recharts** - Gráficos interactivos
- **Google Generative AI** - API de Gemini
- **CSS3** - Animaciones y estilos modernos

## 🔑 Características Técnicas

### API de Gemini con Response Schema
La aplicación utiliza `responseSchema` para garantizar respuestas JSON estructuradas:
- Marcador predicho (home/away)
- Ganador (home/away/draw)
- Probabilidades porcentuales
- Nivel de confianza (low/medium/high)
- 3 factores clave del análisis

### Diseño Moderno
- Fondo con patrón de césped sutil
- Gradientes oscuros elegantes
- Tipografía Inter
- Animaciones CSS suaves
- Glassmorphism effects

## 📝 Ejemplo de Uso

1. Ingresa el equipo local (ej. "Real Madrid")
2. Ingresa el equipo visitante (ej. "Barcelona")
3. Haz clic en "Predecir Resultado"
4. Visualiza:
   - Marcador predicho
   - Gráfico de probabilidades
   - Factores clave del análisis
   - Nivel de confianza

## 🐛 Solución de Problemas

### Error: "VITE_GEMINI_API_KEY is not defined"
- Asegúrate de haber creado el archivo `.env`
- Verifica que la variable esté correctamente nombrada
- Reinicia el servidor de desarrollo

### Error de CORS
- La API de Gemini puede requerir configuración adicional
- Verifica que tu API Key sea válida

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 👨‍💻 Autor

Desarrollado como ejemplo de aplicación React + TypeScript + Gemini AI

---

**Nota**: Esta aplicación utiliza IA para generar predicciones. Los resultados son estimaciones basadas en análisis automático y no deben usarse para apuestas reales.
