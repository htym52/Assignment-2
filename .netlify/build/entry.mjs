import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_D8BHx6IX.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/auth/posts/create.astro.mjs');
const _page2 = () => import('./pages/api/auth/posts/delete.astro.mjs');
const _page3 = () => import('./pages/api/auth/posts/edit.astro.mjs');
const _page4 = () => import('./pages/api/auth/register.astro.mjs');
const _page5 = () => import('./pages/api/auth/signin.astro.mjs');
const _page6 = () => import('./pages/api/auth/signout.astro.mjs');
const _page7 = () => import('./pages/dashboard.astro.mjs');
const _page8 = () => import('./pages/posts/create-post.astro.mjs');
const _page9 = () => import('./pages/posts/edit-post/_id_.astro.mjs');
const _page10 = () => import('./pages/register.astro.mjs');
const _page11 = () => import('./pages/signin.astro.mjs');
const _page12 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/auth/posts/create.ts", _page1],
    ["src/pages/api/auth/posts/delete.ts", _page2],
    ["src/pages/api/auth/posts/edit.ts", _page3],
    ["src/pages/api/auth/register.ts", _page4],
    ["src/pages/api/auth/signin.ts", _page5],
    ["src/pages/api/auth/signout.ts", _page6],
    ["src/pages/dashboard.astro", _page7],
    ["src/pages/posts/create-post.astro", _page8],
    ["src/pages/posts/edit-post/[id].astro", _page9],
    ["src/pages/register.astro", _page10],
    ["src/pages/signin.astro", _page11],
    ["src/pages/index.astro", _page12]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "4665693a-596e-4b5e-8bf0-80a7b13eb132"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
