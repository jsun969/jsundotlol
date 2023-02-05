import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';
import type { Metric } from 'web-vitals';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

type Options = { path: string; analyticsId: string; debug?: boolean };

const getConnectionSpeed = () => {
  return 'connection' in navigator &&
    navigator['connection'] &&
    'effectiveType' in (navigator['connection'] as { effectiveType: string })
    ? (navigator['connection'] as { effectiveType: string })['effectiveType']
    : '';
};

const sendToAnalytics = (metric: Metric, options: Options) => {
  const body = {
    dsn: options.analyticsId,
    id: metric.id,
    page: options.path,
    href: location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  };

  if (options.debug) {
    console.log('[Analytics]', metric.name, JSON.stringify(body, null, 2));
  }

  const blob = new Blob([new URLSearchParams(body).toString()], {
    // This content type is necessary for `sendBeacon`
    type: 'application/x-www-form-urlencoded',
  });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob);
  } else
    fetch(vitalsUrl, {
      body: blob,
      method: 'POST',
      credentials: 'omit',
      keepalive: true,
    });
};

export function webVitals() {
  const options = {
    path: window.location.pathname,
    analyticsId: import.meta.env.PUBLIC_VERCEL_ANALYTICS_ID,
  };
  try {
    getFID((metric) => sendToAnalytics(metric, options));
    getTTFB((metric) => sendToAnalytics(metric, options));
    getLCP((metric) => sendToAnalytics(metric, options));
    getCLS((metric) => sendToAnalytics(metric, options));
    getFCP((metric) => sendToAnalytics(metric, options));
  } catch (err) {
    console.error('[Analytics]', err);
  }
}
