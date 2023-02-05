---
title: 'Enable Vercel Analytics in Astro'
description: 'Astro has its Vercel integration. But it has not provided any option to enable analytics yet. So we need to add some scripts for it manually.'
date: '2023-2-5'
language: 'en'
tags: ['code', 'vercel', 'analytics', 'astro']
---

Astro has its [Vercel integration](https://docs.astro.build/en/guides/integrations-guide/vercel/). But it hasn't provided any option to enable analytics yet. So we need to add some scripts for it manually.

_I have created a [feature discussion](https://github.com/withastro/roadmap/discussions/467) for integration. But I don't have enough ability to create a PR for it. Hope this post can help it get integrated._

## Example

Analytics script for this blog:  
<https://github.com/jsun969/jsundotlol/blob/a8557715c5471adfd0857b3d240e080277a4077c/src/scripts/vercel/analytics.ts>

## Create entry script

Create `analytics.ts` in `src/scripts/vercel` and add it in your layout.

`src/layout/Layout.astro`

```html
<body>
  ...
  <script src="../scripts/vercel/analytics.ts"></script>
</body>
```

Define a `mode` variable because we only enable it in production mode.

`src/scripts/vercel/analytics.ts`

```ts
const mode = import.meta.env.MODE as 'development' | 'production';
```

## Audiences

Vercel docs: <https://vercel.com/docs/concepts/analytics/audiences>

```
pnpm add @vercel/analytics
```

`src/scripts/vercel/analytics.ts`

```diff
+ import { inject } from '@vercel/analytics';

  const mode = import.meta.env.MODE as 'development' | 'production';

+ inject({ mode });
```

## Web Vitals

Vercel docs: <https://vercel.com/docs/concepts/analytics/web-vitals>

Thanks to [this stackoverflow answer](https://stackoverflow.com/questions/74820110/why-vercel-web-vitals-is-not-loading-for-my-astro-project/74823176#74823176). I have converted the script of this answer to typescript and simplified a bit.

```
pnpm add web-vitals
```

`src/scripts/vercel/webVitals.ts`

```ts
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
```

`src/scripts/vercel/analytics.ts`

```diff
  import { inject } from '@vercel/analytics';

+ import { webVitals } from './webVitals';

  const mode = import.meta.env.MODE as 'development' | 'production';

  inject({ mode });
+ if (mode === 'production') {
+   webVitals();
+ }

```

> https://stackoverflow.com/questions/74820110/why-vercel-web-vitals-is-not-loading-for-my-astro-project/74823176#74823176
