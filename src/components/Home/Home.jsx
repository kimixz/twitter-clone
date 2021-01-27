import React, { useEffect, useState } from 'react'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

// components
import AddTweet from 'components/Tweet/AddTweet'
import Tweet from 'components/Tweet/Tweet'

// utils
import api from 'utils/api'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}))

function Home() {
  const classes = useStyles()
  const [tweets, setTweets] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    api
      .getFeed()
      .then(res => {
        setTweets(res.data)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    api
      .getUserInfo()
      .then(res => {
        setUser(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <Box component="main" className={classes.root}>
        <AddTweet />
        {user &&
          tweets.map(tweet => (
            <Tweet
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
              canDeleteTweet={tweet.sender._id === user._id}
            />
          ))}
      </Box>
    </>
  )
}

export default Home
