const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gowvkclrwjkcmtycjsoe.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAllTables() {
  console.log("🔍 Checking all database tables in Supabase...");

  const tables = [
    "User",
    "CustomerProfile",
    "Address",
    "TaxRate",
    "Category",
    "Product",
    "Inventory",
    "StockMovement",
    "Enquiry",
    "EnquiryItem",
    "Quotation",
    "QuotationItem",
    "Order",
    "OrderItem",
    "AuditLog"
  ];

  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(3);
    if (error) {
      console.log(`❌ Table "${table}":`, error.message);
    } else {
      console.log(`✅ Table "${table}": Found ${data.length} record(s)`);
    }
  }
}

checkAllTables();
