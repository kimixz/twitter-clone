import React from 'react'
import PropTypes from 'prop-types'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
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
    right: '8px !important',
    bottom: '8px !important',
    top: '8px !important',
    left: '8px !important',
    zIndex: '20000000 !important',
    // zIndex: '1500 !important',
    // borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
  },
  dialogTitleWrapper: {
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(0, 3),
    textAlign: 'right',
  },
  closeButton: {
    // marginLeft: theme.spacing(-0.75),
    marginRight: theme.spacing(-0.75),
    marginLeft: theme.spacing(2.5),
  },
  dialogContentWrapper: {
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(0, 2, 2),
    '& > video': {
      width: theme.spacing(75),
      maxWidth: '100%',
    },
  },
  container: {
    height: '100%',
    paddingLeft: `${theme.spacing(0)}px !important`,
    paddingRight: `${theme.spacing(0)}px !important`,
  },
  howtoImg: {
    width: '100%',
    maxWidth: '350px',
    height: 'auto',
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function CustomDialogHowto({
  open,
  setIsOpen,
  desktopImg,
  mobileImg,
  isMobile,
}) {
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      // fullScreen
      keepMounted
      scroll="paper"
      className={classes.root}
    >
      <DialogTitle disableTypography className={classes.dialogTitleWrapper}>
        <Button
          onClick={() => {
            setIsOpen(false)
          }}
          endIcon={<CloseIcon size={20} />}
          className={classes.closeButton}
        >
          بازگشت
        </Button>
      </DialogTitle>

      <DialogContent className={classes.dialogContentWrapper}>
        <Container maxWidth="lg" className={classes.container}>
          {!isMobile ? (
            <img
              src={desktopImg}
              alt="desktopImg"
              className={classes.howtoImg}
            />
          ) : (
            <img src={mobileImg} alt="mobileImg" className={classes.howtoImg} />
          )}
        </Container>
      </DialogContent>
    </Dialog>
  )
}

CustomDialogHowto.defaultProps = {
  desktopImg: '',
  mobileImg: '',
  isMobile: false,
}

CustomDialogHowto.propTypes = {
  desktopImg: PropTypes.string,
  mobileImg: PropTypes.string,
  open: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
}

export default CustomDialogHowto
