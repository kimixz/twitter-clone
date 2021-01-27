import React from 'react'
import PropTypes from 'prop-types'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
} from '@material-ui/core'

// @material-ui/icons
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  root: {
    top: `${theme.spacing(4)}px !important`,
    left: `${theme.spacing(4)}px !important`,
    right: `${theme.spacing(4)}px !important`,
    bottom: `${theme.spacing(4)}px !important`,
    zIndex: '20000000 !important',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
  },
  dialogTitleWrapper: {
    padding: theme.spacing(0, 3),
    textAlign: 'right',
  },
  closeButton: {
    marginLeft: theme.spacing(-1.5),
  },
  dialogContentWrapper: {
    padding: '0 !important',
    width: '100%',
    overflowX: 'hidden',
    overflow: 'hidden',
    '& canvas': {
      maxWidth: '100% !important',
    },
  },
  pdfControls: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    width: '100%',
    height: 'auto',
    position: 'absolute',
    right: '0',
    left: '0',
    zIndex: 15,
    bottom: theme.spacing(2),
    textAlign: 'center',
  },
  downloadBtn: {
    margin: theme.spacing(1),
  },
  pageStyle: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function CustomDialogPdf({ open, setIsOpen, pdfUrl, setPdfUrl }) {
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      className={classes.root}
      fullScreen
    >
      <DialogTitle disableTypography className={classes.dialogTitleWrapper}>
        <Button
          onClick={() => {
            setIsOpen(false)
            setPdfUrl('')
          }}
          endIcon={<CloseIcon size={20} />}
          className={classes.closeButton}
        >
          بازگشت به غرفه
        </Button>
      </DialogTitle>
      <DialogContent className={classes.dialogContentWrapper}>
        <iframe src={pdfUrl} width="100%" height="100%" title="pdf" />
      </DialogContent>
    </Dialog>
  )
}

CustomDialogPdf.propTypes = {
  open: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  pdfUrl: PropTypes.string.isRequired,
  setPdfUrl: PropTypes.func.isRequired,
}
export default CustomDialogPdf
