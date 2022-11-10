import React, { useContext, useState, useEffect } from 'react'
import { supabase } from '../supabase'

const AuthContext = React.createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState()
    const [displayName, setDisplayName] = useState("...")
  
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

    async function editDisplayName(newName) {
      if(newName == displayName) {
        alert("New name is the same as existing name")
        return
      }
      session.then(s => {
        var t = s.data.session.access_token
        fetch("https://uduzqhgupifebkcyxbtt.supabase.co/rest/v1/user_data_ns?user_id=eq." + user.id, {
          method: "PATCH",
          mode: "cors",
          headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkdXpxaGd1cGlmZWJrY3l4YnR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyMDIwMzEsImV4cCI6MTk4MTc3ODAzMX0.D1tmALf7KQZucz0vt1tKJgLwiRagMGGfIv50BakFxCo",
            Authorization: "Bearer " + t,
            "Content-Type": "application/json"
          },
          body: `{"display_name": "${newName}"}`
        })
      })
      setDisplayName(newName)
    }
  
    // Will be passed down to Signup, Login and Dashboard components
    const value = {
      signUp: (data) => supabase.auth.signUp(data),
      signIn: (data) => supabase.auth.signInWithPassword(data),
      signOut: () => supabase.auth.signOut(),
      user,
      displayName,
      changeDName: (data) => editDisplayName(data.name),
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