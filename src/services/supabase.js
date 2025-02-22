import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://zycbkcbnznyuotdpusty.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Y2JrY2Juem55dW90ZHB1c3R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyMTUzNTAsImV4cCI6MjA1NDc5MTM1MH0.LpK9B7UyMBqXPxt4N-KqZb2UYB_RRMI-SuC0Njt6qQw";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
