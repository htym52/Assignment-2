export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "../../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const id = formData.get("id")?.toString();
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();

  const accessToken = cookies.get("sb-access-token")?.value;
  if (!accessToken) return redirect("/signin");

  const { data: userData } = await supabase.auth.getUser(accessToken);
  const user = userData?.user;
  if (!user) return redirect("/signin");


  const { data: post } = await supabase
    .from('"BLOG-POSTS"')
    .select("author_id")
    .eq("id", id)
    .single();

  if (!post || post.author_id !== user.id) return new Response("Unauthorized", { status: 403 });

  await supabase
    .from('"BLOG-POSTS"')
    .update({ title, content })
    .eq("id", id);

  return redirect("/dashboard");
};