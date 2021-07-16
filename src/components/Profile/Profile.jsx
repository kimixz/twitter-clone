/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import { Box, Avatar, Typography, Button } from '@material-ui/core'

import { useHistory, useParams } from 'react-router-dom'

// components
import Tweet from 'components/Tweet/Tweet'

// utils
import api from 'utils/api'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  userInfo: {
    borderBottom: `1px solid ${theme.palette.lines.main}`,
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
  },
  textColor: {
    color: theme.palette.white.main,
    fontWeight: 'bold',
    marginTop: theme.spacing(4),
  },
  followWrapper: {
    display: 'flex',
    color: 'gray',
    marginTop: theme.spacing(1),
    '& > p:nth-child(2)': {
      marginLeft: theme.spacing(2),
    },
  },
  tweetsContainer: {
    marginTop: theme.spacing(10),
  },
  button: {
    textTransform: 'none',
    marginTop: theme.spacing(3),
  },
}))

function Profile() {
  const classes = useStyles()
  const [user, setUser] = useState(null)
  const [myUser, setMyUser] = useState(null)
  const [tweets, setTweets] = useState([])
  const [isMyProfile, setIsMyProfile] = useState(false)
  const [isFollowed, setIsFollowed] = useState(false)
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    api
      .getUserInfo()
      .then(res => {
        setMyUser(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    if (!id) {
      api
        .getUserInfo()
        .then(res => {
          setUser(res.data)
          setTweets(res.data.tweets)
          setIsMyProfile(true)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      api
        .getUser({
          urlParams: {
            id,
          },
        })
        .then(res => {
          setUser(res.data)
          setTweets(res.data.tweets)
          setIsFollowed(res.data.isFollowed)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [id])

  const handleFollow = () => {
    api
      .getFollowUser({
        urlParams: {
          id,
        },
      })
      .then(res => {
        window.location.reload()
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleUnfollow = () => {
    api
      .getUnfollowUser({
        urlParams: {
          id,
        },
      })
      .then(res => {
        window.location.reload()
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <Box component="main" className={classes.root}>
        <Box className={classes.userInfo}>
          <Avatar
            alt={user && user.username}
            src={user && user.profilePicture}
            className={classes.large}
          />
          <Typography component="p" variant="h4" className={classes.textColor}>
            {user && user.username && `@${user.username}`}
          </Typography>
          <Box className={classes.followWrapper}>
            <Typography component="p" variant="body1">
              {user && user.followings.length} Following
            </Typography>
            <Typography component="p" variant="body1">
              {user && user.followers.length} Followers
            </Typography>
          </Box>
          {isMyProfile ? (
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => history.push('profileedit')}
            >
              Edit Profile
            </Button>
          ) : isFollowed ? (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleUnfollow}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={handleFollow}
            >
              Follow
            </Button>
          )}
          <Box className={classes.tweetsContainer}>
            {tweets.map(tweet => (
              <Tweet
                id={tweet._id}
                message={tweet.message}
                media={tweet.media}
                mediaType={tweet.mediaType}
                likes={tweet.likes}
                reteweets={tweet.reteweets}
                hashtags={tweet.hashtags}
                user={user}
                isLiked={tweet.isLiked}
                isRetweeted={tweet.isRetweeted}
                canDeleteTweet={tweet.sender._id === myUser?._id}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Profile
