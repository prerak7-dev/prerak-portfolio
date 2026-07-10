import { safeText } from '../security/contentSecurity.js';

export async function resolveWeatherLocation(latitude, longitude, fallbackTimezone) {
  const lat = Number(latitude);
  const lon = Number(longitude);
  const coordinateLabel = Number.isFinite(lat) && Number.isFinite(lon) ? `${lat.toFixed(2)}, ${lon.toFixed(2)}` : 'Approximate location';
  try {
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) throw new Error('Invalid coordinates');
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}&localityLanguage=en`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Location lookup failed');
    const data = await response.json();
    const locality = data.locality || data.city || data.principalSubdivision;
    const region = data.principalSubdivisionCode || data.principalSubdivision;
    const country = data.countryCode || data.countryName;
    return [locality, region, country]
      .map(safeText)
      .filter(Boolean)
      .filter((value, index, values) => values.indexOf(value) === index)
      .join(', ') || coordinateLabel;
  } catch (error) {
    return fallbackTimezone && fallbackTimezone !== 'auto' ? coordinateLabel : coordinateLabel;
  }
}

export function getTimeProfile(date = new Date()) {
  const hour = date.getHours() + date.getMinutes() / 60;
  if (hour >= 5 && hour < 9) return { key: 'dawn', label: 'Dawn' };
  if (hour >= 9 && hour < 17) return { key: 'day', label: 'Day' };
  if (hour >= 17 && hour < 20.5) return { key: 'dusk', label: 'Dusk' };
  return { key: 'night', label: 'Night' };
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
