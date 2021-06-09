import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import SignIn from './modules/SignIn'
import Orders from './modules/Orders'
import OrderCreate from './modules/OrderCreate'
import OrderEdit from './modules/OrderEdit'
import { useAppSelector } from '../hooks'
import { selectAuth } from '../reducers/auth'

const AppRouter = () => {
  const auth = useAppSelector(selectAuth)
  useEffect(() => {}, [])
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          {auth.isLoggedIn ? (
            <Redirect to='/orders' />
          ) : (
            <Redirect to='/signin' />
          )}
        </Route>
        <Route path='/signin'>
          {auth.isLoggedIn ? <Redirect to='/orders' /> : <SignIn />}
        </Route>
        <ProtectedRoute exact path='/orders'>
          <Orders />
        </ProtectedRoute>
        <Route path='/orders/create'>
          <OrderCreate />
        </Route>
        {/* <ProtectedRoute path='/orders/:id'>
          <Order />
        </ProtectedRoute> */}
        <ProtectedRoute path='/orders/:id/edit'>
          <OrderEdit />
        </ProtectedRoute>
        <Route path='*'>
          <h1>Page Not Found</h1>
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRouter
