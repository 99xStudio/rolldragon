import { useHistory } from 'react-router'
import { useAuth } from '../contexts/Auth'
import "./All.css"

export function Dashboard() {
    // Get current user and signOut function from context
    const { user, signOut, displayName } = useAuth()
  
    const history = useHistory()
  
    async function handleSignOut() {
      // Ends user session
      await signOut()
  
      // Redirects the user to Login page
      history.push('/login')
    }
  
    return (
      <>
        <section className="text-wrap">
          <p>Welcome, {displayName}!</p>
        </section>
        <br />
        <button className='cool-btn' onClick={handleSignOut}>Sign out</button>
      </>
    )
  }