import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://syorhipbotqiwnkmpnte.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5b3JoaXBib3RxaXdua21wbnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MDY3ODksImV4cCI6MjA0NzQ4Mjc4OX0.BgU1u3z2dhYv6JxCW7tcyhnx09sdf_eDLeIZzklBBbk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
