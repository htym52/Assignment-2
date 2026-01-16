import { s as supabase } from '../../../../chunks/supabase_CMBxZLk3.mjs';
export { renderers } from '../../../../renderers.mjs';

const prerender = false;
const POST = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const id = formData.get("id")?.toString();
  const accessToken = cookies.get("sb-access-token")?.value;
  if (!accessToken) return redirect("/signin");
  const { data: userData } = await supabase.auth.getUser(accessToken);
  const user = userData?.user;
  if (!user) return redirect("/signin");
  const { data: post } = await supabase.from('"BLOG-POSTS"').select("author_id").eq("id", id).single();
  if (!post || post.author_id !== user.id) return new Response("Unauthorized", { status: 403 });
  await supabase.from('"BLOG-POSTS"').delete().eq("id", id);
  return redirect("/dashboard");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
