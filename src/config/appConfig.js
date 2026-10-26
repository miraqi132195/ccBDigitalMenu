const PRODUCTION_API_URL = 'https://ccb-server.netlify.app';

function resolveApiUrl() {
  const envUrl = import.meta.env.VITE_API_URL;

  if (import.meta.env.PROD) {
    if (!envUrl || envUrl.includes('localhost')) {
      return PRODUCTION_API_URL;
    }
    return envUrl;
  }

  return envUrl || PRODUCTION_API_URL;
}

export const APP_CONFIG = {
  API_URL: resolveApiUrl(),
  RESTAURANT_NAME: 'Chilli Cheese Burger',
  RESTAURANT_SLOGAN: 'Signature Taste',
  DEFAULT_LOCALE: 'he',
  SUPPORTED_LOCALES: ['he', 'ar', 'en'],
};
