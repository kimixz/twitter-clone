import React, { useState } from 'react'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import { Box, TextField, Button } from '@material-ui/core'

import { useHistory, useLocation } from 'react-router-dom'

// utils
import api from 'utils/api'

// components
import ResponseAlert from 'components/Common/ResponseAlert'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  multilineColor: {
    '& textarea': {
      color: 'white !important',
    },
  },
  input: {
    backgroundColor: theme.palette.secondary.main,
    '& label': {
      color: 'red !important',
    },
  },
  button: {
    textTransform: 'none',
    marginLeft: theme.spacing(3),
  },
}))

function Search() {
  const classes = useStyles()
  const history = useHistory()
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSearch = () => {
    console.log(message)
    setErrorMessage('')
    api
      .search({ data: { search: message } })
      .then(res => {
        if (res.data.status === 'OK') {
          if (res.data.user) {
            history.push(`/profile/${res.data.user._id}`)
          }
          if (res.data.tweets) {
            console.log(res.data.tweets)
          }
        } else {
          setErrorMessage(res.data.message)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <Box component="main" className={classes.root}>
        <Box className={classes.searchWrapper}>
          <TextField
            id="filled-textarea"
            placeholder="Search username,hashtags,tweets"
            multiline
            InputProps={{
              className: classes.multilineColor,
            }}
            className={classes.input}
            fullWidth
            value={message}
            onChange={event => {
              setMessage(event.target.value)
            }}
          />
          <Button
            component="span"
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
        <ResponseAlert type="error" text={errorMessage} />
      </Box>
    </>
  )
}

export default Search
