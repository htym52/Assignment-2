import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://jetlrdeahzxngvcjvztj.supabase.co",
  "sb_publishable_RJIJV17eE7V5_CjhXy1MCg_Wj8BgeYC"
);

export { supabase as s };
