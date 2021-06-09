import { useState } from 'react'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import Alert from '@material-ui/lab/Alert'
import TextField from '@material-ui/core/TextField'
import MaterialAvatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import React from 'react'
import { Box } from '@material-ui/core'
import { useAppDispatch } from '../../hooks'
import { login } from '../../reducers/auth'

const SignInPaper = styled.div`
  margin-top: ${({ theme }) => theme.spacing(8)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SignInAvatar = styled(MaterialAvatar)`
  margin: ${({ theme }) => theme.spacing(1)}px;
  background-color: ${({ theme }) => theme.palette.primary.main};
`

const SignInForm = styled.form`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`

const SignInButton = styled(Button)`
  margin: ${({ theme }) => theme.spacing(3, 0, 2)};
`

const SignIn = () => {
  const dispatch = useAppDispatch()
  const [userInput, setUserInput] = useState({
    username: '',
    password: '',
  })
  const [error] = useState('')
  const loginUser = async () => {
    await dispatch(login(userInput))
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setUserInput({ ...userInput, [name]: value })
  }
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    loginUser()
  }
  return (
    <Container maxWidth='xs'>
      <SignInPaper>
        <SignInAvatar>
          <LockOutlinedIcon />
        </SignInAvatar>
        <Typography component='h1' variant='h5'>
          Sign in to BizBloqs
        </Typography>
        <SignInForm noValidate={true}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            label='User Name'
            name='username'
            autoComplete='username'
            autoFocus
            value={userInput.username}
            onChange={handleChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={userInput.password}
            onChange={handleChange}
          />
          {error && (
            <Box alignSelf='start'>
              <Alert severity='error'>{error}</Alert>
            </Box>
          )}
          <SignInButton
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            onClick={handleSubmit}
          >
            Sign In
          </SignInButton>
          {/* <Button
            fullWidth
            variant='contained'
            color='secondary'
            onClick={() => {
              localStorage.clear()
              localStorage.setItem('bypass_is_active', 'true')
              window.location.reload()
            }}
          >
            superuser sign in (Dummy Data)
          </Button> */}
        </SignInForm>
      </SignInPaper>
    </Container>
  )
}

export default SignIn
