import React from 'react'
import PropTypes from 'prop-types'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  ListItem,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  List,
  ListSubheader,
  IconButton,
} from '@material-ui/core'

// @material-ui/icons
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'

// utils
import { toFaDigit } from 'utils/commonUtils'

const useStyles = makeStyles(theme => ({
  root: {},
  listItem: {
    paddingRight: theme.spacing(8),
  },
  listItemText: {
    color: 'asd',
  },
  listItemSecondaryAction: {
    color: 'asd',
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function CustomDialogList({
  videoList,
  open,
  closeDialog,
  handleClickPlayVideo,
}) {
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeDialog}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent style={{ padding: '16px 24px 0' }}>
        <DialogContentText id="alert-dialog-slide-description">
          <List>
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              color="primary"
            >
              لیست ویدیو ها
            </ListSubheader>
            {videoList.length === 0 ? (
              <ListItem className={classes.listItem}>
                <ListItemText
                  primary="ویدیو ای بارگزاری نکردید"
                  className={classes.listItemText}
                />
              </ListItem>
            ) : (
              videoList.map((video, index) => (
                <>
                  <ListItem className={classes.listItem} key={index}>
                    <ListItemText
                      primary={`${toFaDigit(index + 1)}. ${video.title}`}
                      className={classes.listItemText}
                    />
                    <ListItemSecondaryAction
                      className={classes.listItemSecondaryAction}
                    >
                      <IconButton onClick={() => handleClickPlayVideo(index)}>
                        <PlayCircleFilledIcon size="small" color="primary" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider component="li" />
                </>
              ))
            )}
          </List>
        </DialogContentText>
      </DialogContent>
      <DialogActions />
    </Dialog>
  )
}

CustomDialogList.propTypes = {
  videoList: PropTypes.arrayOf(PropTypes.string).isRequired,
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  handleClickPlayVideo: PropTypes.func.isRequired,
}
export default CustomDialogList
