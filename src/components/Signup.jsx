import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'
import { useHistory } from 'react-router'

export function Signup() {
    const firstnameRef = useRef()
    const lastnameRef = useRef()
    const dobRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
  
    // Get signUp function from the auth context
    const { signUp, setExtData, user } = useAuth()
  
    const history = useHistory()
  
    async function handleSubmit(e) {
      e.preventDefault()
  
      // Get email and password input values
      const firstname = firstnameRef.current.value
      const lastname = lastnameRef.current.value
      const dob = dobRef.current.value
      const email = emailRef.current.value
      const password = passwordRef.current.value
  
      // Calls `signUp` function from the context
      const { error } = await signUp({ email, password })
      const { error2 } = await setExtData({uid:user?.id, firstName: firstname, lastName:lastname, isAdmin:false, dob:dob})
  
      if (error) {
        alert('error signing up: ' + error.message)
      } else if (error2) {
        alert('error storing data: ' + error2.message)
      } else {
        // Redirect user to Dashboard
        history.push('/')
      }
    }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='input-firstname'>First name</label>
        <input id='input-firstname' type="text" ref={firstnameRef}></input>

        <label htmlFor='input-lastname'>Last name</label>
        <input id='input-lastname' type="text" ref={lastnameRef}></input>

        <label htmlFor='input-dob'>Date of birth</label>
        <input type="date" id="input-dob" ref={dobRef} />

        <label htmlFor="input-email">Email</label>
        <input id="input-email" type="email" ref={emailRef} />

        <label htmlFor="input-password">Password</label>
        <input id="input-password" type="password" ref={passwordRef} />

        <br />

        <button type="submit">Sign up</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </>
  )
}