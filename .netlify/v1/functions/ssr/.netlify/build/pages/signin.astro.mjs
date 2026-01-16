import { c as createComponent, d as createAstro, i as renderComponent, m as maybeRenderHead, r as renderTemplate } from '../chunks/astro/server_PeQ7Dn8M.mjs';
import 'piccolore';
import { $ as $$Nav, a as $$Footer } from '../chunks/footer_C94gMfpk.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Signin = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Signin;
  const { cookies, redirect } = Astro2;
  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");
  if (accessToken && refreshToken) {
    return redirect("/dashboard");
  }
  return renderTemplate`${renderComponent($$result, "Nav", $$Nav, {})} ${maybeRenderHead()}<h1>SIGN IN</h1> <p> New Here? <a href="/register"> Create an account</a></p> <form action="/api/auth/signin" method="post"> <label for="email"> Email</label> <input type="email" name="email" id="email"> <label for="password"> Password </label> <input type="password" name="password" id="password"> <button type="submit"> Login </button> </form> ${renderComponent($$result, "Footer", $$Footer, {})}`;
}, "D:/Documents/Griffith College/web frameworks/Assignment 2/src/pages/signin.astro", void 0);

const $$file = "D:/Documents/Griffith College/web frameworks/Assignment 2/src/pages/signin.astro";
const $$url = "/signin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Signin,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
