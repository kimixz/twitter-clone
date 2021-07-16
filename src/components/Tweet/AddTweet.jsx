/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from 'react'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import { Box, TextField, Button, IconButton } from '@material-ui/core'

// @material-ui/icons
import ImageIcon from '@material-ui/icons/Image'
import VideoLabelIcon from '@material-ui/icons/VideoLabel'

// utils
import api from 'utils/api'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // height: '200px',
    border: `1px solid ${theme.palette.lines.main}`,
    padding: theme.spacing(5),
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
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(5),
  },
  fileInput: {
    display: 'none',
  },
  imageStyle: {
    maxWidth: '100%',
    height: '200px',
    marginTop: theme.spacing(5),
  },
  videoStyle: {
    maxWidth: '100%',
    height: '200px',
    marginTop: theme.spacing(5),
  },
}))

function AddTweet() {
  const classes = useStyles()
  const [message, setMessage] = useState(null)
  const [media, setMedia] = useState(null)
  const [mediaType, setMediaType] = useState(null)

  const postUploadImage = b64Image => {
    api
      .postUploadImage({ data: { image: b64Image } })
      .then(res => {
        setMedia(res.data)
        setMediaType('image')
      })
      .catch(err => {
        if (err.response && err.response.data) {
          console.log(err.response.data.message)
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

  const postUploadVideo = b64Image => {
    api
      .postUploadVideo({ data: { video: b64Image } })
      .then(res => {
        setMedia(res.data)
        setMediaType('video')
      })
      .catch(err => {
        if (err.response && err.response.data) {
          console.log(err.response.data.message)
        }
      })
  }

  const handleVideoChange = e => {
    e.preventDefault()
    const reader = new window.FileReader()
    const file = e.target.files[0]
    reader.onloadend = () => {
      postUploadVideo(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  function getHashTags(inputText) {
    const regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm
    const matches = []
    let match

    // eslint-disable-next-line no-cond-assign
    while ((match = regex.exec(inputText))) {
      matches.push(match[1])
    }

    return matches
  }

  const onSubmit = e => {
    // e.preventDefault()
    if (!message && !media) {
      e.preventDefault()
      return
    }
    let sendingMediaType = ''
    if (message && mediaType) {
      sendingMediaType = `${mediaType}/text`
    } else {
      sendingMediaType = 'text'
    }

    const hashtags = getHashTags(message)
    console.log(hashtags)
    api
      .postTweet({
        data: { message, media, mediaType: sendingMediaType, hashtags },
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <Box component="main" className={classes.root}>
        <form onSubmit={onSubmit}>
          <TextField
            id="filled-textarea"
            //  label="Message"
            placeholder="What's Happening?"
            multiline
            InputProps={{
              className: classes.multilineColor,
            }}
            className={classes.input}
            fullWidth
            // eslint-disable-next-line react/jsx-no-duplicate-props
            inputProps={{
              maxLength: 250,
              minLength: 1,
            }}
            value={message}
            onChange={event => {
              setMessage(event.target.value)
            }}
          />

          {media && mediaType === 'image' ? (
            <img src={media} alt={message} className={classes.imageStyle} />
          ) : media && mediaType === 'video' ? (
            <video src={media} className={classes.videoStyle} controls />
          ) : null}
          <Box className={classes.controls}>
            <div>
              <label htmlFor="file-input">
                <IconButton component="span">
                  <ImageIcon color="primary" />
                </IconButton>

                <input
                  type="file"
                  accept="image/*"
                  id="file-input"
                  onChange={handleImageChange}
                  className={classes.fileInput}
                />
              </label>

              <label htmlFor="file-input-video">
                <IconButton component="span">
                  <VideoLabelIcon color="primary" />
                </IconButton>

                <input
                  type="file"
                  accept="video/*"
                  id="file-input-video"
                  onChange={handleVideoChange}
                  className={classes.fileInput}
                />
              </label>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Tweet
            </Button>
          </Box>
        </form>
      </Box>
    </>
  )
}

export default AddTweet
