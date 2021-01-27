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
  dialog: {
    '& div:nth-child(3)': {
      alignItems: 'flex-end',
      '& > div': {
        marginBottom: theme.spacing(9),
      },
    },
  },
  closeDialog: {
    color: theme.palette.text.secondary,
  },
  userConfirm: {
    color: '#fff',
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function CustomDialogMoveToBooth({
  message,
  rejectBtnText,
  acceptBtnText,
  open,
  setIsOpen,
  userConfirm,
  userDeny,
}) {
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      className={classes.dialog}
    >
      <DialogContent style={{ padding: '16px 24px 0' }}>
        <DialogContentText id="alert-dialog-slide-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {rejectBtnText && (
          <Button
            color="primary"
            className={classes.closeDialog}
            onClick={() => {
              setIsOpen(false)
              userDeny()
            }}
          >
            {rejectBtnText}
          </Button>
        )}

        <Button
          color="primary"
          variant="contained"
          className={classes.userConfirm}
          onClick={userConfirm}
        >
          {acceptBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
CustomDialogMoveToBooth.defaultProps = {
  message: null,
  rejectBtnText: 'خیر',
  acceptBtnText: 'بله',
}

CustomDialogMoveToBooth.propTypes = {
  message: PropTypes.string,
  rejectBtnText: PropTypes.string,
  acceptBtnText: PropTypes.string,
  open: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  userConfirm: PropTypes.func.isRequired,
  userDeny: PropTypes.func.isRequired,
}
export default CustomDialogMoveToBooth
