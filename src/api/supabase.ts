import { createClient } from '@supabase/supabase-js';
import { Database } from '../supabase';
const supabaseUrl = 'https://srdeyikpkzwmqfueuncd.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey || '');
