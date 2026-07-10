export function applyWeatherToScene(kind, setMode, setWeather, setWeatherPower) {
  if (kind === 'snow' || kind === 'heavy-snow') {
    setMode('snowboard');
    setWeather(kind);
    setWeatherPower(kind === 'heavy-snow' ? 1.62 : 1.28);
  } else if (kind === 'rain' || kind === 'heavy-rain' || kind === 'drizzle' || kind === 'storm') {
    setMode('soccer');
    setWeather(kind);
    setWeatherPower(kind === 'storm' ? 1.75 : kind === 'heavy-rain' ? 1.58 : kind === 'drizzle' ? 0.92 : 1.2);
  } else if (kind === 'fog' || kind === 'cloud') {
    setMode('soccer');
    setWeather(kind);
    setWeatherPower(kind === 'fog' ? 1.35 : 0.98);
  } else {
    setMode('soccer');
    setWeather('clear');
    setWeatherPower(0.72);
  }
}
