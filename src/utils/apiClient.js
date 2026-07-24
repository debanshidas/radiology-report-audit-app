/**
 * Smart API client helper with automatic localhost fallback
 */
export async function apiFetch(endpoint, options = {}) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // 1. Try relative path first (Vite proxy / same-origin production)
  try {
    const res = await fetch(cleanEndpoint, options);
    if (res.ok || res.status < 500) {
      return res;
    }
  } catch (err) {
    // Relative fetch failed, attempt direct backend fallback
  }

  // 2. Fallback directly to local Flask server if running separately
  const fallbackUrl = `http://127.0.0.1:5000${cleanEndpoint}`;
  return await fetch(fallbackUrl, options);
}
