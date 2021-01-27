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

// components
import ImageCarousel from 'components/Sponsors/ImageCarousel'
import VideoCarousel from 'components/Sponsors/VideoCarousel'

const useStyles = makeStyles(theme => ({
  root: {
    top: `${theme.spacing(4)}px !important`,
    left: `${theme.spacing(4)}px !important`,
    right: `${theme.spacing(4)}px !important`,
    bottom: `${theme.spacing(4)}px !important`,
    zIndex: '20000000 !important',
    // zIndex: '1500 !important',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
  },
  dialogTitleWrapper: {
    padding: theme.spacing(0, 3),
    textAlign: 'right',
  },
  closeButton: {
    // marginLeft: theme.spacing(-0.75),
    marginRight: theme.spacing(-0.75),
  },
  dialogContentWrapper: {
    padding: theme.spacing(0, 2, 0),
    '& > div': {
      width: '100%',
      height: 'calc(100% - 100px)',
    },
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function CustomDialogGallery({
  open,
  setIsOpenGallery,
  isImgOrVid,
  setIsImgOrVid,
  sponsorImages,
  sponsorVideos,
}) {
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      fullScreen
      keepMounted
      // scroll="paper"
      className={classes.root}
    >
      <DialogTitle disableTypography className={classes.dialogTitleWrapper}>
        <Button
          onClick={() => {
            setIsOpenGallery(false)
            setIsImgOrVid('image')
          }}
          endIcon={<CloseIcon size={20} />}
          className={classes.closeButton}
        >
          بازگشت به غرفه
        </Button>
      </DialogTitle>

      <DialogContent className={classes.dialogContentWrapper}>
        <div>
          {isImgOrVid === 'image' && <ImageCarousel images={sponsorImages} />}

          {isImgOrVid === 'video' && <VideoCarousel films={sponsorVideos} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}

CustomDialogGallery.defaultProps = {
  sponsorImages: [],
  sponsorVideos: [],
}

CustomDialogGallery.propTypes = {
  open: PropTypes.bool.isRequired,
  setIsOpenGallery: PropTypes.func.isRequired,
  isImgOrVid: PropTypes.string.isRequired,
  setIsImgOrVid: PropTypes.func.isRequired,
  sponsorImages: PropTypes.arrayOf(PropTypes.string),
  sponsorVideos: PropTypes.arrayOf(PropTypes.string),
}

export default CustomDialogGallery
