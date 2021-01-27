import React from 'react'
import PropTypes from 'prop-types'

// @material-ui/core
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  item: {
    marginTop: theme.spacing(3),
  },
  textColor: {
    color: theme.palette.white.main,
  },
  icon: {
    '& > svg': {
      fontSize: '30px',
      color: theme.palette.white.main,
    },
  },
  selectedIconColor: {
    '& > svg': {
      color: theme.palette.primary.main,
    },
  },
  selectedTextColor: {
    color: theme.palette.primary.main,
  },
}))

function SidebarItem({ label, icon, onClick, selected }) {
  const classes = useStyles()

  return (
    <ListItem
      button
      onClick={onClick}
      selected={selected}
      className={classes.item}
    >
      <ListItemIcon
        className={`${classes.icon} ${selected && classes.selectedIconColor}`}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={label}
        className={`${classes.textColor} ${
          selected && classes.selectedTextColor
        }`}
      />
    </ListItem>
  )
}

SidebarItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
}

SidebarItem.defaultProps = {
  selected: false,
}

export default SidebarItem
