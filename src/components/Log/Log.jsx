/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import { Box, List, ListItemText, Typography } from '@material-ui/core'

// Moment
import moment from 'moment'
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

function Log() {
  const classes = useStyles()
  const [log, setLog] = useState([])

  useEffect(() => {
    api
      .getMyLog()
      .then(res => {
        setLog(res.data)
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
          Logs
        </Typography>
        <List>
          {log.map(logItem => (
            <ListItemText
              primary={
                logItem.type === 'follow'
                  ? `You Followed @${logItem.following.username} at ${moment(
                      logItem.createdAt,
                    ).format('MMMM Do YYYY, h:mm:ss a')}`
                  : logItem.type === 'like'
                  ? `You Liked Tweet with message "${
                      logItem.tweet.message
                    }" at ${moment(logItem.createdAt).format(
                      'MMMM Do YYYY, h:mm:ss a',
                    )}`
                  : `You Retweeted Tweet with message "${
                      logItem.tweet.message
                    }" at ${moment(logItem.createdAt).format(
                      'MMMM Do YYYY, h:mm:ss a',
                    )}`
              }
              className={classes.listItem}
            />
          ))}
        </List>
      </Box>
    </>
  )
}

export default Log
