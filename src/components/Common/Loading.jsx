import React from 'react'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'

// react-lottie
import Lottie from 'react-lottie'

// assets
import animationData from 'assets/lotties/loading'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'lightgray',
  },
  lottieWrapper: {
    marginTop: theme.spacing(1),
    width: '200px',
  },
}))

function Loading() {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Typography> صفحه در حال بارگزاری </Typography>
      <Box className={classes.lottieWrapper}>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
        />
      </Box>
    </Box>
  )
}

export default Loading
