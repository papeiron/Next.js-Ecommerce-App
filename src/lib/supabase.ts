import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://fhnqpyisstbfjkvuzmvn.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZobnFweWlzc3RiZmprdnV6bXZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk2ODI2NjUsImV4cCI6MjAzNTI1ODY2NX0.OgX7P83pgmRJDpuzX6eVnqlLhele9u2-e7zjTeeEMk8';

export const supabase = createClient(supabaseUrl, supabaseKey);
