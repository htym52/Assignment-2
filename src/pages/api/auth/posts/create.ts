export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "../../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
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