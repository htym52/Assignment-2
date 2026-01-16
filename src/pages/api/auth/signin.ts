import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return new Response("Email and password required", {status: 400});
  }

  const {data, error} = await supabase.auth.signInWithPassword(
    {
        email, password
    }
  );

  if (error) {
    console.log('Supabase error:', error)
    return new Response(error.message, {status: 400});
  }

  if (!data.session){
    console.log('Session is NULL:', data)

    return new Response ("login successful but email confirmation needed", {status: 401});
  }

  const {access_token, refresh_token} = data.session;
  cookies.set("sb-access-token", access_token, {path: "/"}); 
  cookies.set("sb-refresh-token", refresh_token, {path: "/"}); 

  return redirect("/dashboard");


};