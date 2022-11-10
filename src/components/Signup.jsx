import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'
import { useHistory } from 'react-router'
import "./All.css"

export function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
  
    // Get signUp function from the auth context
    const { signUp, user } = useAuth()
  
    const history = useHistory()
  
    async function handleSubmit(e) {
      e.preventDefault()
  
      // Get email and password input values
      const email = emailRef.current.value
      const password = passwordRef.current.value
  
      // Calls `signUp` function from the context
      const { error } = await signUp({ email, password })
  
      if (error) {
        alert('error signing up: ' + error.message)
      }  else {
        // Redirect user to Dashboard
        history.push('/dashboard')
      }
    }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <section className="input-wrap">
          <label htmlFor="input-email">Email: </label>
          <input id="input-email" type="email" ref={emailRef} />
        </section>
        <br />

        <section className="input-wrap">
          <label htmlFor="input-password">Password: </label>
          <input id="input-password" type="password" ref={passwordRef} />
        </section>
        <br />

        <br />

        <button className='cool-btn' type="submit">Sign up</button>
      </form>
      <br />

      <section className="text-wrap">
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </section>
    </>
  )
}