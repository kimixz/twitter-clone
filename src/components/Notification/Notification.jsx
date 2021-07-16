/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import { Box, List, ListItemText, Typography } from '@material-ui/core'

// utils
import api from 'utils/api'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  textColor: {
    color: theme.palette.white.main,
  },
  listItem: {
    color: theme.palette.white.main,
    margin: theme.spacing(1),
    border: `1px solid ${theme.palette.lines.main}`,
    padding: theme.spacing(2),
  },
}))

function Notification() {
  const classes = useStyles()
  const [notification, setNotification] = useState([])

  useEffect(() => {
    api
      .getMyNotification()
      .then(res => {
        setNotification(res.data)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <Box component="main" className={classes.root}>
        <Typography variant="h2" component="p" className={classes.textColor}>
          Notifications
        </Typography>
        <List>
          {notification.map(notif => (
            <ListItemText
              primary={`@${notif.doer.username} ${
                notif.type === 'like'
                  ? 'liked your tweet'
                  : notif.type === 'follow'
                  ? 'followed you'
                  : 'retweeted your tweet'
              }`}
              className={classes.listItem}
            />
          ))}
        </List>
      </Box>
    </>
  )
}

export default Notification
