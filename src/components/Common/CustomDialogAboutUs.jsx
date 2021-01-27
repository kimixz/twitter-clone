import React from 'react'
import PropTypes from 'prop-types'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  Divider,
} from '@material-ui/core'

// @material-ui/icons
import CloseIcon from '@material-ui/icons/Close'
import CallIcon from '@material-ui/icons/Call'
import LanguageIcon from '@material-ui/icons/Language'
import LocationOnIcon from '@material-ui/icons/LocationOn'

// @material-ui/core/colors
import { blue } from '@material-ui/core/colors'

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
    // backgroundColor: '#f5f5f5',
    padding: theme.spacing(0, 3),
    textAlign: 'right',
  },
  closeButton: {
    // marginLeft: theme.spacing(-0.75),
    marginRight: theme.spacing(-0.75),
    marginLeft: theme.spacing(2.5),
  },
  dialogContentWrapper: {
    //  backgroundColor: '#f5f5f5',
    padding: theme.spacing(0, 2, 2),
    '& > video': {
      width: theme.spacing(75),
      maxWidth: '100%',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingLeft: `${theme.spacing(0)}px !important`,
    paddingRight: `${theme.spacing(0)}px !important`,
  },
  contactLink: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
    '& svg': {
      color: theme.palette.info.light,
      fontSize: '16px',
      marginRight: theme.spacing(1),
    },
  },
  aboutUsTxt: {
    // marginBottom: theme.spacing(2),
  },
  aboutUsTxtLink: {
    color: blue[700],
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function CustomDialogAboutUs({
  open,
  setIsOpen,
  phone,
  link,
  address,
  description,
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
          بازگشت به غرفه
        </Button>
      </DialogTitle>

      <DialogContent className={classes.dialogContentWrapper}>
        <Container maxWidth="lg" className={classes.container}>
          <a href={`tel:${phone}`} className={classes.contactLink}>
            <CallIcon fontSize="small" />

            <Typography
              variant="body2"
              component="span"
              className={classes.aboutUsTxt}
            >
              {phone}
            </Typography>
          </a>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.contactLink}
          >
            <LanguageIcon fontSize="small" />

            <Typography
              variant="body2"
              component="span"
              className={`${classes.aboutUsTxt} ${classes.aboutUsTxtLink}`}
            >
              {link}
            </Typography>
          </a>

          <div className={classes.contactLink}>
            <LocationOnIcon fontSize="small" />

            <Typography
              variant="body2"
              component="span"
              className={classes.aboutUsTxt}
            >
              {address}
            </Typography>
          </div>
          <Divider />
          <Typography
            variant="body2"
            component="div"
            className={classes.contextP}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </Container>
      </DialogContent>
    </Dialog>
  )
}

CustomDialogAboutUs.defaultProps = {
  phone: '',
  link: '',
  address: '',
  description: '',
}

CustomDialogAboutUs.propTypes = {
  open: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  phone: PropTypes.string,
  link: PropTypes.string,
  address: PropTypes.string,
  description: PropTypes.string,
}

export default CustomDialogAboutUs
