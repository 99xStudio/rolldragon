import { HashRouter, Switch, Route } from 'react-router-dom'

import { Signup } from './Signup'
import { Login } from './Login'
import { Dashboard } from './Dashboard'
import { Home } from './Home'
import { AuthProvider } from '../contexts/Auth'
import { PrivateRoute } from './PrivateRoute'

import "./All.css"

function App() {
  return (
    <div id='div-noflex'>
      <h1>RollDragon Web</h1>
      <br />

      {/* Add routes here👇 */}
      <HashRouter basename='/'>
        <AuthProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
            </Switch>
          </AuthProvider>
      </HashRouter>
    </div>
  )
}

export default App