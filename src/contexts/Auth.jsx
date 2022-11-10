import React, { useContext, useState, useEffect } from 'react'
import { supabase } from '../supabase'

const AuthContext = React.createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState()
    const [displayName, setDisplayName] = useState("Jo Doe")
  
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

          var dataRowsRaw = supabase.from("user_data_ns").select("*").eq("user_id", session.user.id)
          if((await dataRowsRaw).error) {
            console.log("Error in UDNS: " + (await dataRowsRaw).error.message)
          } else {
            var dataRows = (await dataRowsRaw).data
            if(dataRows.length < 1) {
              console.log("No UDNS entry for user " + session.user.id)
            } else {
              var thisRow = dataRows[0]
              setDisplayName(thisRow.display_name)
            }
          }
          

          setLoading(false)
        }
      )
  
      return () => {
        listener?.subscription.unsubscribe()
      }
    }, [])
  
    // Will be passed down to Signup, Login and Dashboard components
    const value = {
      signUp: (data) => supabase.auth.signUp(data),
      signIn: (data) => supabase.auth.signInWithPassword(data),
      signOut: () => supabase.auth.signOut(),
      user,
      displayName,
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