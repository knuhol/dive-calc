// credits: https://github.com/mui/material-ui/blob/2a81d58c7b9e10718474639dc613078050e512b9/examples/nextjs-with-typescript/src/createEmotionCache.ts
import createCache from '@emotion/cache';

export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
