// NOTE: Optimize the SSR bundle by not splitting by page.
import Layout from './layouts/main.vue';

// @ts-ignore
const pages = import.meta.env.SSR
  // @ts-ignore
  ? import.meta.globEagerDefault('./pages/**/*.vue', { eager: true })
  // @ts-ignore
  : import.meta.glob('./pages/**/*.vue', { eager: true });

export async function resolvePage(name: string) {
  const page = pages[`./pages/${name}.vue`];

  if (!page) {
    throw new Error(
      `Unknown page ${name}. Is it located under pages with a .vue extension?`
    );
  }

  page.default.layout = page.default.layout || Layout;
  // @ts-ignore
  return import.meta.env.SSR ? page : (await page).default;
}
