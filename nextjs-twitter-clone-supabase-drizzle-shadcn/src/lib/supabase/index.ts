import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export const supabaseServer = new SupabaseClient<Database>(String(process.env.SUPABASE_URL), String(process.env.SUPABASE_SECRET), {
    auth: { persistSession: false },
})
