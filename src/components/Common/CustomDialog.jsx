import React from 'react'
import PropTypes from 'prop-types'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {},
  closeDialog: {
    color: '#fff',
  },
  userConfirm: {
    color: theme.palette.text.secondary,
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function CustomDialog({
  message,
  rejectBtnText,
  acceptBtnText,
  open,
  setIsOpen,
  userConfirm,
}) {
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent style={{ padding: '16px 24px 0' }}>
        <DialogContentText id="alert-dialog-slide-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          className={classes.userConfirm}
          onClick={userConfirm}
        >
          {acceptBtnText}
        </Button>

        {rejectBtnText && (
          <Button
            color="primary"
            variant="contained"
            className={classes.closeDialog}
            onClick={() => setIsOpen(false)}
          >
            {rejectBtnText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
CustomDialog.defaultProps = {
  message: null,
  rejectBtnText: 'خیر',
  acceptBtnText: 'بله',
}

CustomDialog.propTypes = {
  message: PropTypes.string,
  rejectBtnText: PropTypes.string,
  acceptBtnText: PropTypes.string,
  open: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  userConfirm: PropTypes.func.isRequired,
}
export default CustomDialog
