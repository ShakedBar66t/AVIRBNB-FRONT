import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { grey, pink } from '@mui/material/colors'

import { TOGGLE_IS_SIGNUP_MODAL } from '../store/reducers/user.reducer'
import { login, signup } from '../store/user.actions'

export function SignInForm({ onCloseLoginModal }) {

  const [isValid, setIsValid] = useState('')
  const [refreshform] = useState(false)
  const dispatch = useDispatch()
  const isSignUpModal = useSelector(storeState => storeState.userModule.isSignUpModal)

  const navigate = useNavigate()

  const theme = createTheme({
    palette: {
      primary: {
        main: pink[500]
      },
      secondary: {
        main: grey[800]
      }
    }
  })

  async function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const credentials = {
      password: data.get('password'),
      fullname: data.get('fullname'),
      email: data.get('email')
    }
    const isValid = validate(credentials)
    if (!isValid) {
      console.log('not valid')
      return
    }
    if (isSignUpModal) {
      try {
        await signup(credentials)
        onCloseLoginModal()
        navigate('/')
      } catch (err) {
        console.log('Error occurred during signup:', err)
      }
      return
    }

    try {
      await login(credentials)
      onCloseLoginModal()
      navigate('/')
    } catch (err) {
      console.log('Error occurred during login:', err)
    }
  }

  function validate(user) {
    if (!user.email.includes('@') || !user.email.includes('.')) {
      setIsValid('Invalid mail')
      return false
    }
    if (user.password.length < 8 || user.password.length > 16) {
      setIsValid('Password should have 8 to 16 characters')
      return false
    }
    return true
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" >

        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            ml: 0,

          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            {(isSignUpModal) && <TextField
              required
              fullWidth
              id="fullname"
              placeholder='Full Name'
              name="fullname"
              autoComplete="fullname"
              color='secondary'
            />}

            <TextField
              required
              fullWidth
              id="email"
              placeholder='Email Address'
              name="email"
              autoComplete="email"
              color='secondary'
            />
            <TextField
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              placeholder='Password'
              autoComplete="current-password"
              color='secondary'
            />
            <p className='signup-link'>{(isSignUpModal) ? ' Already have an account? ' : 'Don\'t have an account? '}
              <span onClick={() => {
                setIsValid('')
                dispatch({ type: TOGGLE_IS_SIGNUP_MODAL })
              }
              }>{(isSignUpModal) ? 'Sign In' : 'Sign Up'} </span> </p>
            <button className='login-btn' type='submit'>Continue</button>
            <p style={{ padding: '10px 0' }}>{isValid}</p>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}