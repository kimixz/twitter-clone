import React, { useState } from 'react'
import PropTypes from 'prop-types'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Icon,
} from '@material-ui/core'

// @material-ui/icons
import TwitterIcon from '@material-ui/icons/Twitter'

// react router
import { Link } from 'react-router-dom'

// utils
import api from 'utils/api'

// components
import ResponseAlert from 'components/Common/ResponseAlert'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
  },
  loginInnerWrapper: {
    width: '400px',
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(8, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formSubmitBtn: {
    color: '#fff',
    margin: theme.spacing(2, 0),
  },
  ChangeLoginSignup: {
    cursor: 'pointer',
    marginBottom: theme.spacing(2),
    color: theme.palette.info.dark,
    // '&:hover': {
    //   color: theme.palette.info.dark,
    // },
  },
  featuresMainTitle: {
    textAlign: 'center',
    color: theme.palette.white.main,
    marginTop: theme.spacing(2),
  },
  icon: {
    color: theme.palette.white.main,
  },
  registerLinkStyle: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
  multilineColor: {
    '& input': {
      color: 'white !important',
    },
  },
  input: {
    backgroundColor: theme.palette.secondary.main,
    '& label': {
      color: '#fff',
    },
  },
}))

function Login({ setAuthToken }) {
  const classes = useStyles()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [serverResponseType, setServerResponseType] = useState(null)
  const [serverResponse, setServerResponse] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    api
      .postLoginUser({
        data: {
          email,
          password,
        },
      })
      .then(res => {
        setServerResponseType('success')
        setServerResponse('Welcome')
        console.log(res.data.token)
        localStorage.setItem('authToken', res.data.token)
        setAuthToken(res.data.token)
      })
      .catch(err => {
        setServerResponseType('error')
        setServerResponse(err.response.data.message)
      })
  }

  return (
    <>
      <Box component="main" className={classes.root}>
        <Box component="section">
          <Box component="section">
            <Container maxWidth="lg">
              <Box className={classes.loginOuterWrapper}>
                <div className={classes.loginInnerWrapper}>
                  <Icon fontSize="large" className={classes.icon}>
                    <TwitterIcon fontSize="large" />
                  </Icon>
                  <Typography
                    variant="h3"
                    component="h3"
                    className={classes.featuresMainTitle}
                  >
                    Log in to Twitter
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email"
                      type="email"
                      variant="filled"
                      margin="normal"
                      fullWidth
                      autoFocus
                      onChange={event => {
                        setEmail(event.target.value)
                      }}
                      value={email}
                      InputProps={{
                        className: classes.multilineColor,
                      }}
                      className={classes.input}
                    />
                    <TextField
                      required
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      variant="filled"
                      margin="normal"
                      fullWidth
                      autoFocus
                      security
                      onChange={event => {
                        setPassword(event.target.value)
                      }}
                      value={password}
                      InputProps={{
                        className: classes.multilineColor,
                      }}
                      className={classes.input}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      className={classes.formSubmitBtn}
                    >
                      Log In
                    </Button>
                  </form>

                  <Typography
                    variant="body1"
                    component={Link}
                    to="/signup"
                    className={classes.registerLinkStyle}
                  >
                    Sign up for Twitter
                  </Typography>
                  <ResponseAlert
                    type={serverResponseType}
                    text={serverResponse}
                  />
                </div>
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  )
}
Login.propTypes = {
  setAuthToken: PropTypes.func.isRequired,
}

export default Login
