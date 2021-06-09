import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useAppSelector } from '../hooks'
import { selectAuth } from '../reducers/auth'

type ProtectedRouteProps = {} & RouteProps

const ProtectedRoute = ({ ...routeProps }: ProtectedRouteProps) => {
  const auth = useAppSelector(selectAuth)
  if (auth.isLoggedIn) {
    return <Route {...routeProps} />
  } else {
    return <Redirect to='/signin' />
  }
}

export default ProtectedRoute
