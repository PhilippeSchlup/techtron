// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://komuzireheqixxlfnivh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvbXV6aXJlaGVxaXh4bGZuaXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2NzM5MTAsImV4cCI6MjA0NTI0OTkxMH0.QphwBcWwf8PIVf-GuIMhIbB-81YtIZDdhCxeDV6CIP4';
export const supabase = createClient(supabaseUrl, supabaseKey);
