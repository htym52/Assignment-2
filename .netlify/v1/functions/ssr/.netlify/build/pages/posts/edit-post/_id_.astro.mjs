import { c as createComponent, d as createAstro, m as maybeRenderHead, f as addAttribute, r as renderTemplate } from '../../../chunks/astro/server_PeQ7Dn8M.mjs';
import 'piccolore';
import 'clsx';
import { s as supabase } from '../../../chunks/supabase_CMBxZLk3.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const accessToken = Astro2.cookies.get("sb-access-token");
  if (!accessToken) return Astro2.redirect("/signin");
  const { data: userData } = await supabase.auth.getUser(accessToken.value);
  const user = userData?.user;
  if (!user) return Astro2.redirect("/signin");
  const { data: post, error } = await supabase.from('"BLOG-POSTS"').select("*").eq("id", id).single();
  if (!post || post.author_id !== user.id) return Astro2.redirect("/dashboard");
  return renderTemplate`${maybeRenderHead()}<h1>Edit Post</h1> <form action="/api/posts/edit" method="POST"> <input type="hidden" name="id"${addAttribute(post.id, "value")}> <label>Title</label> <input name="title"${addAttribute(post.title, "value")} required> <label>Content</label> <textarea name="content" rows="10" required>${post.content}</textarea> <button type="submit">Save Changes</button> </form>`;
}, "D:/Documents/Griffith College/web frameworks/Assignment 2/src/pages/posts/edit-post/[id].astro", void 0);

const $$file = "D:/Documents/Griffith College/web frameworks/Assignment 2/src/pages/posts/edit-post/[id].astro";
const $$url = "/posts/edit-post/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
