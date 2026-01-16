import { s as supabase } from '../../../../chunks/supabase_CMBxZLk3.mjs';
export { renderers } from '../../../../renderers.mjs';

const prerender = false;
const POST = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const title = formData.get("title")?.toString() || "";
  const content = formData.get("content")?.toString() || "";
  const accessToken = cookies.get("sb-access-token")?.value;
  if (!accessToken) return redirect("/signin");
  const { data: { user } } = await supabase.auth.getUser(accessToken);
  if (!user) return redirect("/signin");
  await supabase.from('"BLOG-POSTS"').insert({
    title,
    content,
    author_id: user.id
  });
  return redirect("/");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
