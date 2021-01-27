import React from 'react'
import PropTypes from 'prop-types'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import { Snackbar, IconButton, Fade } from '@material-ui/core'

// @material-ui/icons
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  root: {
    top: '40px',
    maxWidth: '80%',
    margin: '0 auto',
    '& > div': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}))

function CustomSnackbar({ open, setIsOpenSnackbar, text }) {
  const classes = useStyles()

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      // onClose={handleClose}
      TransitionComponent={Fade}
      open={open}
      message={text}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => setIsOpenSnackbar(false)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
      className={classes.root}
    />
  )
}

CustomSnackbar.defaultProps = {
  open: false,
  text: '',
}

CustomSnackbar.propTypes = {
  open: PropTypes.bool,
  text: PropTypes.string,
  setIsOpenSnackbar: PropTypes.func.isRequired,
}

export default CustomSnackbar
