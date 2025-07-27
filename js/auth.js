const SUPABASE_URL = window.SUPABASE_CONFIG?.url || 'https://sgbxlerviuetcmkfkpdw.supabase.co'
const SUPABASE_ANON_KEY = window.SUPABASE_CONFIG?.anonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnYnhsZXJ2aXVldGNta2ZrcGR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0ODI3NTUsImV4cCI6MjA2OTA1ODc1NX0.tWwFi49lHsz5YAG8g-55ow2EnZnkeJanrvyMsxBxjG8'


// Initialize Supabase client
let supabase = null

async function initializeSupabase() {
  if (!supabase) {
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm')
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  }
  return supabase
}

// Authentication functions
async function signUp(email, password, username) {
    try {
        const supabase = await initializeSupabase();
        
        // Sign up the user
        const { data: { user }, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username: username
                }
            }
        });

        if (signUpError) throw signUpError;

        // Create initial profile
        const { error: profileError } = await supabase
            .from('profiles')
            .insert({
                id: user.id,
                username: username,
                email: email,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });

        if (profileError) throw profileError;

        return { user, error: null };
    } catch (error) {
        console.error('Error in signUp:', error);
        return { user: null, error };
    }
}

async function signIn(email, password) {
  try {
    const supabase = await initializeSupabase()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.error('Sign in error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, user: data.user }
  } catch (error) {
    console.error('Unexpected error during signin:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

async function signOut() {
  try {
    const supabase = await initializeSupabase()
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Sign out error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected error during signout:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

async function getCurrentUser() {
  try {
    const supabase = await initializeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

// Export functions for use in HTML files
window.Auth = {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  initializeSupabase
}
