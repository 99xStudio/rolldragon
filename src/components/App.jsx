import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Signup } from './Signup'
import { Login } from './Login'
import { Dashboard } from './Dashboard'
import { AuthProvider } from '../contexts/Auth'
import { PrivateRoute } from './PrivateRoute'

function App() {
  return (
    <div>
      <h1>supabase-auth-react</h1>

      {/* Add routes here👇 */}
      <BrowserRouter>
      <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App