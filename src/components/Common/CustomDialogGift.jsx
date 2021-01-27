import React from 'react'
import PropTypes from 'prop-types'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  IconButton,
} from '@material-ui/core'

// @material-ui/icons
import CloseIcon from '@material-ui/icons/Close'

// react-lottie
import Lottie from 'react-lottie'

// assets
import animationData from 'assets/lotties/gift'

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: '20000000 !important',
    overflow: 'hidden',
  },
  dialogTitleWrapper: {
    padding: theme.spacing(0, 3),
    textAlign: 'right',
  },
  closeButton: {
    marginRight: theme.spacing(-0.75),
  },
  dialogContentWrapper: {
    // padding: theme.spacing(0, 2, 0),
    width: '100%',
    minHeight: '200px',
    // maxWidth: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    '& > div': {
      width: '100%',
      height: 'calc(100% - 100px)',
    },
  },
  lottieWrapper: {
    position: 'absolute',
    width: '100%',
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function CustomDialogGift({ open, setIsOpenGift }) {
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      className={classes.root}
    >
      <DialogTitle disableTypography className={classes.dialogTitleWrapper}>
        <IconButton
          onClick={() => {
            setIsOpenGift(false)
          }}
          className={classes.closeButton}
        >
          <CloseIcon size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent className={classes.dialogContentWrapper}>
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
        <Typography variant="body1" component="h3">
          کد تخفیف طراحی سایت : #3d43d
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

CustomDialogGift.propTypes = {
  open: PropTypes.bool.isRequired,
  setIsOpenGift: PropTypes.func.isRequired,
}

export default CustomDialogGift
