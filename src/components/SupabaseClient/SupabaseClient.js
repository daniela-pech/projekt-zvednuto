import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wloasvpvalrfvpogggbn.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indsb2FzdnB2YWxyZnZwb2dnZ2JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4Njk3ODEsImV4cCI6MjA2NDQ0NTc4MX0.RzlF9m-w3QapFGudPoddVx0uGyEsqU_uLRI5RqBhvGc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
