import "./All.css"
import { useHistory } from 'react-router'

export function Home() {
    const history = useHistory()

    function goLogin() {
        history.push("/login")
    }
    function goSignup() {
        history.push("/signup")
    }

    return (
      <>
        <section className="text-wrap">
          <p>RollDragon, the easy to use and lightweight authentication system you need.</p>
          <p>Simple username + password authentication with a user-changeable display name that you can use in your project</p>
        </section>

        <br />
        
        <button className='cool-btn' onClick={goLogin}>Log in</button>
        &nbsp;  &nbsp;  
        <button className='cool-btn' onClick={goSignup}>Sign up</button>
      </>
    )
  }