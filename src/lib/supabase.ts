import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gowvkclrwjkcmtycjsoe.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl && typeof window !== "undefined") {
  console.warn("Missing NEXT_PUBLIC_SUPABASE_URL environment variable.");
}

// Public client for browser / anonymous interactions (Safe for frontend)
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey || "placeholder-anon-key-for-build"
);

// Admin service role client for backend operations / API routes
export const getSupabaseAdmin = () => {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not defined in environment variables.");
  }
  return createClient(supabaseUrl, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
