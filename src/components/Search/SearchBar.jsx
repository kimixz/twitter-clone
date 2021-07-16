import React, { useState } from 'react'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import { Box, TextField, Button } from '@material-ui/core'

import { useHistory } from 'react-router-dom'

// utils
import api from 'utils/api'

// components
import ResponseAlert from 'components/Common/ResponseAlert'
import Tweet from 'components/Tweet/Tweet'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(3),
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
  tweetWrapper: {
    width: '100%',
    height: '100%',
  },
}))

function SearchBar() {
  const classes = useStyles()
  const history = useHistory()
  const [message, setMessage] = useState('')
  const [tweets, setTweets] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const handleSearch = () => {
    console.log(message)
    setErrorMessage('')
    api
      .search({ data: { search: message } })
      .then(res => {
        if (res.data.status === 'OK') {
          if (res.data.user) {
            history.push(`/profilesearch/${res.data.user._id}`)
          } else if (res.data.hashtag) {
            console.log(res.data.hashtag)
            setTweets(res.data.hashtag)
          } else {
            setTweets(res.data.tweets)
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
        <Box className={classes.tweetWrapper}>
          {tweets.map(tweet => (
            <Tweet
              key={tweet._id}
              id={tweet._id}
              message={tweet.message}
              media={tweet.media}
              mediaType={tweet.mediaType}
              likes={tweet.likes}
              reteweets={tweet.reteweets}
              hashtags={tweet.hashtags}
              user={tweet.sender}
              isLiked={tweet.isLiked}
              isRetweeted={tweet.isRetweeted}
              dontShowControls
            />
          ))}
        </Box>

        <ResponseAlert type="error" text={errorMessage} />
      </Box>
    </>
  )
}

export default SearchBar
