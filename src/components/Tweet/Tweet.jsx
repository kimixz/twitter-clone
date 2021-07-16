/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import {
  IconButton,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CardActions,
  CardMedia,
  Box,
  Modal,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
} from '@material-ui/core'

// @material-ui/icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ShareIcon from '@material-ui/icons/Share'
import DeleteIcon from '@material-ui/icons/Delete'

// utils
import api from 'utils/api'

const useStyles = makeStyles(theme => ({
  root: {
    // width: '100%',
    marginTop: theme.spacing(4),
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.lines.main}`,
  },
  media: {
    maxWidth: '100%',
    maxHeight: '200px',
  },
  mediaImage: {
    maxWidth: '100%',
    maxHeight: '200px',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  mediaContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  cardHeader: {
    '& span': {
      fontSize: '16px',
      color: theme.palette.white.main,
    },
  },
  textColor: {
    color: theme.palette.white.main,
    cursor: 'pointer',
  },
  iconColor: {
    '& svg': {
      color: '#fff',
    },
  },
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'rgb(255,255,255,0.7)',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  chipStyle: {
    margin: theme.spacing(1),
  },
}))

function Tweet({
  id,
  message,
  media,
  mediaType,
  likes,
  user,
  isLiked,
  isRetweeted,
  canDeleteTweet,
  dontShowControls,
}) {
  const classes = useStyles()
  const [likers, setLikers] = useState([])
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleClick = () => {
    if (isLiked) {
      api
        .getUnlikeTweet({
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
    } else {
      api
        .getLikeTweet({
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
  }

  const handleClickGetLikers = () => {
    setOpen(true)
    api
      .getLikesTweet({
        urlParams: {
          id,
        },
      })
      .then(res => {
        console.log(res)
        setLikers(res.data.likes)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleRetweet = () => {
    api
      .getRetweet({
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

  const handleDelete = () => {
    console.log('delete')
    api
      .deleteTweet({
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
      <Card className={classes.root}>
        {isRetweeted && (
          <Chip
            label="Retweeted"
            color="primary"
            className={classes.chipStyle}
          />
        )}
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar
              src={user && user.profilePicture}
              className={classes.avatar}
            />
          }
          title={`@${user && user.username}`}
        />
        <Box className={classes.mediaContainer}>
          {mediaType !== 'text' &&
            (mediaType.includes('video') ? (
              <CardMedia
                className={classes.media}
                component="video"
                image={media}
                controls
              />
            ) : (
              <img src={media} alt="media" className={classes.mediaImage} />
            ))}
        </Box>

        <CardContent>
          <Typography
            variant="body1"
            className={classes.textColor}
            component="p"
          >
            {message}
          </Typography>
        </CardContent>
        {!dontShowControls && (
          <CardActions disableSpacing>
            <IconButton
              aria-label="like"
              className={classes.iconColor}
              onClick={handleClick}
            >
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Box className={classes.textColor} onClick={handleClickGetLikers}>
              {likes.length}
            </Box>
            <IconButton
              aria-label="share"
              className={classes.iconColor}
              onClick={handleRetweet}
            >
              <ShareIcon />
            </IconButton>

            {canDeleteTweet && (
              <IconButton
                aria-label="share"
                className={classes.iconColor}
                onClick={handleDelete}
              >
                <DeleteIcon />
              </IconButton>
            )}
            {/* <Box className={classes.textColor}>{retweets.length}</Box> */}
          </CardActions>
        )}
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <List>
          {likers.map(likerItem => (
            <ListItem>
              <ListItemAvatar>
                <Avatar src={likerItem.profilePicture} />
              </ListItemAvatar>
              <ListItemText primary={likerItem.username} />
            </ListItem>
          ))}
        </List>
      </Modal>
    </>
  )
}

Tweet.defaultProps = {
  id: '',
  message: '',
  media: '',
  mediaType: '',
  likes: [],
  user: null,
  isLiked: false,
  isRetweeted: false,
  canDeleteTweet: false,
  dontShowControls: false,
}

Tweet.propTypes = {
  id: PropTypes.string,
  message: PropTypes.string,
  media: PropTypes.string,
  mediaType: PropTypes.string,
  likes: PropTypes.arrayOf(PropTypes.shape()),
  user: PropTypes.shape(),
  isLiked: PropTypes.bool,
  isRetweeted: PropTypes.bool,
  canDeleteTweet: PropTypes.bool,
  dontShowControls: PropTypes.bool,
}

export default Tweet
