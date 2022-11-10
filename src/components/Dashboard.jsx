import { useRef } from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../contexts/Auth'
import "./All.css"

export function Dashboard() {
    // Get current user and signOut function from context
    const { user, signOut, displayName, changeDName } = useAuth()
  
    const history = useHistory()
    const nameRef = useRef(displayName);
  
    async function handleSignOut() {
      // Ends user session
      await signOut()
  
      // Redirects the user to Login page
      history.push('/login')
    }

    async function handleDisplayNameChange(e) {
      e.preventDefault()
      await changeDName({
        "name": nameRef.current.value
      })
    }
  
    return (
      <>
        <section className="text-wrap">
          <p>Welcome, {displayName}!</p>
        </section>
        <br />
        <section className="input-wrap">
          <form onSubmit={handleDisplayNameChange}>
            <label htmlFor="input-email">Display name: </label>
            <input id="input-dname" type="text" ref={nameRef} />
            <br />&nbsp;  <br />
            <button className='cool-btn' type="submit">Change</button>
            <br />
          </form>
        </section>
        <br />
        <button className='cool-btn' onClick={handleSignOut}>Sign out</button>
      </>
    )
  }