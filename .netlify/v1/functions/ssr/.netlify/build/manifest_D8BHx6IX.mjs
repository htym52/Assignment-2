import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'piccolore';
import { l as NOOP_MIDDLEWARE_HEADER, n as decodeKey } from './chunks/astro/server_PeQ7Dn8M.mjs';
import 'clsx';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///D:/Documents/Griffith%20College/web%20frameworks/Assignment%202/","cacheDir":"file:///D:/Documents/Griffith%20College/web%20frameworks/Assignment%202/node_modules/.astro/","outDir":"file:///D:/Documents/Griffith%20College/web%20frameworks/Assignment%202/dist/","srcDir":"file:///D:/Documents/Griffith%20College/web%20frameworks/Assignment%202/src/","publicDir":"file:///D:/Documents/Griffith%20College/web%20frameworks/Assignment%202/public/","buildClientDir":"file:///D:/Documents/Griffith%20College/web%20frameworks/Assignment%202/dist/","buildServerDir":"file:///D:/Documents/Griffith%20College/web%20frameworks/Assignment%202/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"register/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/register","isIndex":false,"type":"page","pattern":"^\\/register\\/?$","segments":[[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/register.astro","pathname":"/register","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/posts/create","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/posts\\/create\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"posts","dynamic":false,"spread":false}],[{"content":"create","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/posts/create.ts","pathname":"/api/auth/posts/create","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/posts/delete","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/posts\\/delete\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"posts","dynamic":false,"spread":false}],[{"content":"delete","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/posts/delete.ts","pathname":"/api/auth/posts/delete","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/posts/edit","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/posts\\/edit\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"posts","dynamic":false,"spread":false}],[{"content":"edit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/posts/edit.ts","pathname":"/api/auth/posts/edit","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/register","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/register\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/register.ts","pathname":"/api/auth/register","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/signin","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/signin\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/signin.ts","pathname":"/api/auth/signin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/signout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/signout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/signout.ts","pathname":"/api/auth/signout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"*{box-sizing:border-box;margin:0;padding:0;font-family:Courier New,Courier,monospace}body{background-color:#f9f9f9;color:#333;line-height:1.6;min-height:100vh;display:flex;flex-direction:column}.container{max-width:800px;margin:2rem auto;padding:0 1rem}.header,nav{background-color:#166934;padding:1rem 0}.navbar ul{list-style:none;display:flex;justify-content:center;gap:1.5rem}.navbar a{text-decoration:none;font-weight:700}.navbar a:hover{text-decoration:underline}button,.button{background-color:#166934;color:#fff;border:none;padding:.5rem 1rem;cursor:pointer;border-radius:5px;margin-top:.5rem}button:hover,.button:hover{background-color:#166934}form{display:flex;flex-direction:column;gap:.75rem;margin-top:1rem}input,textarea{padding:.5rem;border:1px solid #ccc;border-radius:5px;width:100%}textarea{min-height:120px;resize:vertical}h1,h2{margin-bottom:1rem}ul{list-style:none;margin-top:1rem}li{background:#fff;padding:1rem;margin-bottom:.75rem;border-radius:5px;box-shadow:0 1px 3px #0000001a}li a{margin-right:1rem;color:#166934;text-decoration:none}li a:hover{text-decoration:underline}article.md-box{background:#fff;padding:2rem;border-radius:5px;box-shadow:0 1px 5px #0000001a;margin:2rem 0}footer.footer{background-color:#333;color:#fff;padding:1rem 0;text-align:center;margin-top:auto}footer a{color:#166934;text-decoration:none}footer a:hover{text-decoration:underline}\n"}],"routeData":{"route":"/dashboard","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard.astro","pathname":"/dashboard","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"*{box-sizing:border-box;margin:0;padding:0;font-family:Courier New,Courier,monospace}body{background-color:#f9f9f9;color:#333;line-height:1.6;min-height:100vh;display:flex;flex-direction:column}.container{max-width:800px;margin:2rem auto;padding:0 1rem}.header,nav{background-color:#166934;padding:1rem 0}.navbar ul{list-style:none;display:flex;justify-content:center;gap:1.5rem}.navbar a{text-decoration:none;font-weight:700}.navbar a:hover{text-decoration:underline}button,.button{background-color:#166934;color:#fff;border:none;padding:.5rem 1rem;cursor:pointer;border-radius:5px;margin-top:.5rem}button:hover,.button:hover{background-color:#166934}form{display:flex;flex-direction:column;gap:.75rem;margin-top:1rem}input,textarea{padding:.5rem;border:1px solid #ccc;border-radius:5px;width:100%}textarea{min-height:120px;resize:vertical}h1,h2{margin-bottom:1rem}ul{list-style:none;margin-top:1rem}li{background:#fff;padding:1rem;margin-bottom:.75rem;border-radius:5px;box-shadow:0 1px 3px #0000001a}li a{margin-right:1rem;color:#166934;text-decoration:none}li a:hover{text-decoration:underline}article.md-box{background:#fff;padding:2rem;border-radius:5px;box-shadow:0 1px 5px #0000001a;margin:2rem 0}footer.footer{background-color:#333;color:#fff;padding:1rem 0;text-align:center;margin-top:auto}footer a{color:#166934;text-decoration:none}footer a:hover{text-decoration:underline}\n"}],"routeData":{"route":"/posts/create-post","isIndex":false,"type":"page","pattern":"^\\/posts\\/create-post\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"create-post","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/create-post.astro","pathname":"/posts/create-post","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/posts/edit-post/[id]","isIndex":false,"type":"page","pattern":"^\\/posts\\/edit-post\\/([^/]+?)\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"edit-post","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/posts/edit-post/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"*{box-sizing:border-box;margin:0;padding:0;font-family:Courier New,Courier,monospace}body{background-color:#f9f9f9;color:#333;line-height:1.6;min-height:100vh;display:flex;flex-direction:column}.container{max-width:800px;margin:2rem auto;padding:0 1rem}.header,nav{background-color:#166934;padding:1rem 0}.navbar ul{list-style:none;display:flex;justify-content:center;gap:1.5rem}.navbar a{text-decoration:none;font-weight:700}.navbar a:hover{text-decoration:underline}button,.button{background-color:#166934;color:#fff;border:none;padding:.5rem 1rem;cursor:pointer;border-radius:5px;margin-top:.5rem}button:hover,.button:hover{background-color:#166934}form{display:flex;flex-direction:column;gap:.75rem;margin-top:1rem}input,textarea{padding:.5rem;border:1px solid #ccc;border-radius:5px;width:100%}textarea{min-height:120px;resize:vertical}h1,h2{margin-bottom:1rem}ul{list-style:none;margin-top:1rem}li{background:#fff;padding:1rem;margin-bottom:.75rem;border-radius:5px;box-shadow:0 1px 3px #0000001a}li a{margin-right:1rem;color:#166934;text-decoration:none}li a:hover{text-decoration:underline}article.md-box{background:#fff;padding:2rem;border-radius:5px;box-shadow:0 1px 5px #0000001a;margin:2rem 0}footer.footer{background-color:#333;color:#fff;padding:1rem 0;text-align:center;margin-top:auto}footer a{color:#166934;text-decoration:none}footer a:hover{text-decoration:underline}\n"}],"routeData":{"route":"/signin","isIndex":false,"type":"page","pattern":"^\\/signin\\/?$","segments":[[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signin.astro","pathname":"/signin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["D:/Documents/Griffith College/web frameworks/Assignment 2/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/auth/posts/create@_@ts":"pages/api/auth/posts/create.astro.mjs","\u0000@astro-page:src/pages/api/auth/posts/delete@_@ts":"pages/api/auth/posts/delete.astro.mjs","\u0000@astro-page:src/pages/api/auth/posts/edit@_@ts":"pages/api/auth/posts/edit.astro.mjs","\u0000@astro-page:src/pages/api/auth/register@_@ts":"pages/api/auth/register.astro.mjs","\u0000@astro-page:src/pages/api/auth/signin@_@ts":"pages/api/auth/signin.astro.mjs","\u0000@astro-page:src/pages/api/auth/signout@_@ts":"pages/api/auth/signout.astro.mjs","\u0000@astro-page:src/pages/dashboard@_@astro":"pages/dashboard.astro.mjs","\u0000@astro-page:src/pages/posts/create-post@_@astro":"pages/posts/create-post.astro.mjs","\u0000@astro-page:src/pages/posts/edit-post/[id]@_@astro":"pages/posts/edit-post/_id_.astro.mjs","\u0000@astro-page:src/pages/register@_@astro":"pages/register.astro.mjs","\u0000@astro-page:src/pages/signin@_@astro":"pages/signin.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_D8BHx6IX.mjs","D:/Documents/Griffith College/web frameworks/Assignment 2/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/favicon.svg","/register/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"oFkTSCCJsjcTSpAmEt7SFUc0dD7TbJ9buQWVP8MEkSs=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
