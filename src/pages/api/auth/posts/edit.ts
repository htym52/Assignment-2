export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "../../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    const form = await request.formData();
    const id = form.get("id")?.toString();
    const title = form.get("title")?.toString();
    const content = form.get("content")?.toString();

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

    await supabase
        .from('"BLOG-POSTS"')
        .update({ title, content })
        .eq("id", id);

    return redirect("/dashboard");
};