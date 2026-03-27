const trimTrailingSlash = (value = "") => value.replace(/\/+$/, "");

export const API_BASE_URL = trimTrailingSlash(import.meta.env.VITE_API_BASE_URL || "");
export const SOCKET_URL = trimTrailingSlash(import.meta.env.VITE_SOCKET_URL || "");

export function resolveAppUrl(pathname, baseUrl = API_BASE_URL) {
  if (!pathname) {
    return "";
  }

  if (/^https?:\/\//i.test(pathname)) {
    return pathname;
  }

  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return baseUrl ? `${baseUrl}${normalizedPath}` : normalizedPath;
}
