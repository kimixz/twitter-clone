import React, { useState, useEffect } from 'react'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Icon,
  Avatar,
} from '@material-ui/core'

// @material-ui/icons
import TwitterIcon from '@material-ui/icons/Twitter'

// react router
import { useHistory } from 'react-router-dom'
// utils
import api from 'utils/api'

// components
import ResponseAlert from 'components/Common/ResponseAlert'

const useStyles = makeStyles(theme => ({
  loginInnerWrapper: {
    // width: '800px',
    maxWidth: '100%',
    margin: '0 auto',
    // padding: theme.spacing(8, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '300px',
  },
  form: {
    width: '100%',
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
  fileInput: {
    display: 'none',
  },
  button: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  avatar: {
    marginTop: theme.spacing(4),
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
}))

function ProfileEdit() {
  const classes = useStyles()
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [profilePicture, setProfilePicture] = useState('')

  const [serverResponseType, setServerResponseType] = useState(null)
  const [serverResponse, setServerResponse] = useState(null)

  useEffect(() => {
    api
      .getUserInfo()
      .then(res => {
        setUsername(res.data.username)
        setProfilePicture(res.data.profilePicture)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const postUploadImage = b64Image => {
    api
      .postUploadImage({ data: { image: b64Image } })
      .then(res => {
        setProfilePicture(res.data)
      })
      .catch(err => {
        if (err.response && err.response.data) {
          setServerResponseType('error')
          setServerResponse(err.response.data.message)
        }
      })
  }

  const handleImageChange = e => {
    e.preventDefault()
    const reader = new window.FileReader()
    const file = e.target.files[0]
    reader.onloadend = () => {
      postUploadImage(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    api
      .postEditProfile({
        data: {
          username,
          profilePicture,
        },
      })
      .then(() => {
        setServerResponseType('success')
        setServerResponse('Changed Successfully')
        history.push('/profile')
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
                  <Typography
                    variant="h3"
                    component="h3"
                    className={classes.featuresMainTitle}
                  >
                    Edit your profile
                  </Typography>
                  <form onSubmit={handleSubmit} className={classes.formStyle}>
                    <Avatar src={profilePicture} className={classes.avatar} />
                    <label htmlFor="file-input">
                      <Button
                        component="span"
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                      >
                        Upload Profile Image
                      </Button>

                      <input
                        type="file"
                        accept="image/*"
                        id="file-input"
                        onChange={handleImageChange}
                        className={classes.fileInput}
                      />
                    </label>
                    <TextField
                      // required
                      id="username"
                      name="username"
                      label="Username"
                      type="username"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      autoFocus
                      onChange={event => {
                        setUsername(event.target.value)
                      }}
                      value={username}
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
                      Edit
                    </Button>
                  </form>

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

export default ProfileEdit
