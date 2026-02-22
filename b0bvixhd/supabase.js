import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

// ⚠️ DO NOT use react-native-url-polyfill in Expo Snack

const supabaseUrl = 'https://jxqwbsecralsoulddzmo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4cXdic2VjcmFsc291bGRkem1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MDk0MzYsImV4cCI6MjA4NzI4NTQzNn0.jAAyxXFq1EjE2cEeuL1p05NsoCB2zGIVerPGLoGL8gE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})