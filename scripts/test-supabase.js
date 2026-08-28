const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gowvkclrwjkcmtycjsoe.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY in environment.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log("Testing Supabase connection...");
  try {
    const { data: categories, error: catErr } = await supabase.from('Category').select('*');
    if (catErr) {
      console.error("Error fetching categories:", catErr.message);
    } else {
      console.log(`Categories found: ${categories ? categories.length : 0}`);
    }

    const { data: products, error: prodErr } = await supabase.from('Product').select('*');
    if (prodErr) {
      console.error("Error fetching products:", prodErr.message);
    } else {
      console.log(`Products found: ${products ? products.length : 0}`);
    }
  } catch (err) {
    console.error("Connection failed:", err);
  }
}

testConnection();
