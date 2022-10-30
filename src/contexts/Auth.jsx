import React, { useContext, useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { createClient } from '@supabase/supabase-js'

const AuthContext = React.createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState()
  
    useEffect(() => {
      // Check active sessions and sets the user
      const session = supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
  
      // Listen for changes on auth state (logged in, signed out, etc.)
      const { data: listener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user ?? null)
          setLoading(false)
        }
      )
  
      return () => {
        listener?.subscription.unsubscribe()
      }
    }, [])

    const usersupabase = user != null ? createClient(import.meta.env.VITE_SUPABASE_URL, session.access_token) : null
  
    // Will be passed down to Signup, Login and Dashboard components
    const value = {
      signUp: (data) => supabase.auth.signUp(data),
      signIn: (data) => supabase.auth.signInWithPassword(data),
      signOut: () => supabase.auth.signOut(),
      getExtData: () => usersupabase.from("ExtUserData").select("*"),
      setExtData: (data) => usersupabase.from("ExtUserData"),
      user,
    }
  
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    )
  }

  export function useAuth() {
    return useContext(AuthContext)
  }