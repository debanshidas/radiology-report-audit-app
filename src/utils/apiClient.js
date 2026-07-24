/**
 * Smart API client helper with automatic localhost & backend URL fallback.
 * Checks for valid JSON Content-Type to prevent SPA HTML fallback false-positives.
 */
export async function apiFetch(endpoint, options = {}) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // 1. Try relative path first (works when served by Flask or Vite proxy)
  try {
    const res = await fetch(cleanEndpoint, options);
    const contentType = res.headers.get('content-type') || '';

    // Only return relative response if it's a real API response (JSON / octet-stream / PDF / text)
    // If Vite/SPA returns index.html (text/html) for missing /api routes, skip to direct backend fallback.
    if ((res.ok || res.status < 500) && !contentType.includes('text/html')) {
      return res;
    }
  } catch (err) {
    // Relative fetch failed or network error
  }

  // 2. Fallback directly to local Flask server if running on dev server or SPA
  const backendBase = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:5000';
  const fallbackUrl = `${backendBase.replace(/\/$/, '')}${cleanEndpoint}`;

  return await fetch(fallbackUrl, options);
}
