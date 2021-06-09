import AppStyle from './App.style'
import Container from './components/Container.style'
import AppRouter from './routes/AppRouter'
import Box from '@material-ui/core/Box'
import Alert from '@material-ui/lab/Alert'
import { isBypassing } from './api/authAPI'

function App() {
  return (
    <>
      <AppStyle />
      {isBypassing() && (
        <Box marginBottom={5}>
          <Alert
            onClose={() => {
              localStorage.removeItem('bypass_is_active')
              window.location.reload()
            }}
          >
            <strong>Login Bypass</strong> is active <i>[close to disable]</i>
          </Alert>
        </Box>
      )}
      <Container component='main' maxWidth='lg'>
        <AppRouter />
      </Container>
    </>
  )
}

export default App
