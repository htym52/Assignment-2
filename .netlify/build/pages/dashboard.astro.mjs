import { c as createComponent, d as createAstro, i as renderComponent, m as maybeRenderHead, f as addAttribute, r as renderTemplate } from '../chunks/astro/server_PeQ7Dn8M.mjs';
import 'piccolore';
import { $ as $$Nav, a as $$Footer } from '../chunks/footer_C94gMfpk.mjs';
/* empty css                                 */
import { s as supabase } from '../chunks/supabase_CMBxZLk3.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const accessTokenCookie = Astro2.cookies.get("sb-access-token");
  const refreshTokenCookie = Astro2.cookies.get("sb-refresh-token");
  const accessToken = accessTokenCookie?.value;
  const refreshToken = refreshTokenCookie?.value;
  if (!accessToken || !refreshToken) {
    return Astro2.redirect("/signin");
  }
  const { data: { user }, error: userError } = await supabase.auth.getUser(accessToken);
  if (!user) {
    return Astro2.redirect("/signin");
  }
  const { data: posts } = await supabase.from('"BLOG-POSTS"').select("id, title, content, created_at").eq("author_id", user.id).order("created_at", { ascending: false });
  return renderTemplate`${renderComponent($$result, "Nav", $$Nav, {})} ${maybeRenderHead()}<section class="container"> <h1>Dashboard</h1> <a href="/posts/create-post">Create New Post</a> ${posts && posts.length > 0 ? renderTemplate`<ul> ${posts.map((post) => renderTemplate`<li> <a${addAttribute(`/posts/${post.id}`, "href")}>${post.title}</a> <a${addAttribute(`/posts/edit-post/${post.id}`, "href")}>Edit</a> <form action="/api/posts/delete" method="POST" style="display:inline"> <input type="hidden" name="id"${addAttribute(post.id, "value")}> <button type="submit">Delete</button> </form> </li>`)} </ul>` : renderTemplate`<p>You have no posts yet.</p>`} </section> ${renderComponent($$result, "Footer", $$Footer, {})}`;
}, "D:/Documents/Griffith College/web frameworks/Assignment 2/src/pages/dashboard.astro", void 0);

const $$file = "D:/Documents/Griffith College/web frameworks/Assignment 2/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
