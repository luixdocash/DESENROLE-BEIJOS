/**
 * Utility to get Hotmart checkout URL preserving UTM and tracking parameters
 */
export const BASE_CHECKOUT_URL = 'https://pay.hotmart.com/O100663857I?checkoutMode=10';

export function getCheckoutUrl(): string {
  if (typeof window === 'undefined') return BASE_CHECKOUT_URL;
  
  try {
    const currentUrl = new URL(window.location.href);
    const checkoutUrl = new URL(BASE_CHECKOUT_URL);

    // Forward all current search params (utm_source, utm_medium, utm_campaign, etc.)
    currentUrl.searchParams.forEach((value, key) => {
      checkoutUrl.searchParams.set(key, value);
    });

    return checkoutUrl.toString();
  } catch {
    return BASE_CHECKOUT_URL;
  }
}

/**
 * Fires InitiateCheckout event on Meta (Facebook) Pixel
 */
export function trackInitiateCheckout() {
  if (typeof window !== 'undefined') {
    const w = window as unknown as { fbq?: (...args: unknown[]) => void };
    if (typeof w.fbq === 'function') {
      try {
        w.fbq('track', 'InitiateCheckout', {
          content_name: 'Guia Prático do Beijo',
          value: 29.90,
          currency: 'BRL',
        });
      } catch {
        // Safe fail
      }
    }
  }
}
