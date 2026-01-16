import { c as createComponent, d as createAstro, i as renderComponent, m as maybeRenderHead, r as renderTemplate } from '../../chunks/astro/server_PeQ7Dn8M.mjs';
import 'piccolore';
import { $ as $$Nav, a as $$Footer } from '../../chunks/footer_C94gMfpk.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$CreatePost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CreatePost;
  const accessToken = Astro2.cookies.get("sb-access-token");
  if (!accessToken) return Astro2.redirect("/signin");
  return renderTemplate`${renderComponent($$result, "Nav", $$Nav, {})} ${maybeRenderHead()}<h1>Create Post</h1> <form action="/api/auth/posts/create" method="POST"> <input name="title" placeholder="Title" required> <textarea name="content" placeholder="Post content" required></textarea> <button>Create</button> </form> ${renderComponent($$result, "Footer", $$Footer, {})}`;
}, "D:/Documents/Griffith College/web frameworks/Assignment 2/src/pages/posts/create-post.astro", void 0);

const $$file = "D:/Documents/Griffith College/web frameworks/Assignment 2/src/pages/posts/create-post.astro";
const $$url = "/posts/create-post";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CreatePost,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
