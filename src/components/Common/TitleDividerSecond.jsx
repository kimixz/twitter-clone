import React from 'react'
import PropTypes from 'prop-types'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
  root: {},
  mainTitle: {
    width: '100%',
    float: 'left',
    textAlign: 'center',
    color: theme.palette.primary.main,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    position: 'relative',
    // '&::before': {
    //   content: '""',
    //   position: 'absolute',
    //   bottom: theme.spacing(-2),
    //   right: 0,
    //   left: 0,
    //   width: '80%',
    //   height: '3px',
    //   margin: '0 auto',
    //   backgroundImage: `linear-gradient(to right,transparent 0%,${theme.palette.secondary.light} 50%,transparent 100%)`,
    // },
    [theme.breakpoints.down('sm')]: {
      fontSize: '28px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '24px',
    },
  },
  clr: {
    clear: 'both',
    margin: '0 auto',
  },
}))

function TitleDividerSecond({ text, ...other }) {
  const classes = useStyles()

  return (
    <Box component="div" className={classes.root}>
      <Typography className={classes.mainTitle} {...other}>
        {text || (
          <Skeleton
            animation="wave"
            style={{ width: '60%', margin: '0 auto' }}
          />
        )}
      </Typography>
      <div className={classes.clr} />
    </Box>
  )
}

TitleDividerSecond.defaultProps = {
  text: '',
}

TitleDividerSecond.propTypes = {
  text: PropTypes.string,
}

export default TitleDividerSecond
