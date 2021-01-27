import React from 'react'
import PropTypes from 'prop-types'

// material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Typography,
} from '@material-ui/core'

// material-ui/icons
import CloseIcon from '@material-ui/icons/Close'

const useStyle = makeStyles(theme => ({
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogContent: {
    padding: theme.spacing(2),
  },
  dialogActions: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))

function DeleteDialog({ open, handleClose, handleDelete, title }) {
  const classes = useStyle()

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle disableTypography className={classes.dialogTitle}>
        <Typography variant="h6"> حذف {title}</Typography>
        {handleClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        <Typography variant="body1">
          {' '}
          از حذف این {title} اطمینان دارید؟
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          بله حذف شود
        </Button>
        <Button variant="contained" color="default" onClick={handleClose}>
          خیر
        </Button>
      </DialogActions>
    </Dialog>
  )
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}
export default DeleteDialog
