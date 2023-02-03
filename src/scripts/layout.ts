import { inject } from '@vercel/analytics';

import { webVitals } from './vitals';

const mode = import.meta.env.MODE as 'development' | 'production';

inject({ mode });
if (mode === 'production') {
  webVitals();
}
