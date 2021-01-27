import React from 'react'
import PropTypes from 'prop-types'

import { useHistory, useLocation } from 'react-router-dom'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import { List, Icon, IconButton } from '@material-ui/core'

// @material-ui/icons
import HomeIcon from '@material-ui/icons/Home'
import TwitterIcon from '@material-ui/icons/Twitter'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import NotificationsIcon from '@material-ui/icons/Notifications'
import SearchIcon from '@material-ui/icons/Search'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

// components
import SidebarItem from 'components/Sidebar/SidebarItem'

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  sidebar: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(5),
    paddingRight: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    height: '100%',
  },
  icon: {
    paddingLeft: theme.spacing(2),

    '& > svg': {
      fontSize: '50px',
      color: theme.palette.white.main,
    },
  },
  list: {
    marginTop: theme.spacing(4),
  },
  logout: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    '& svg': {
      color: theme.palette.white.main,
    },
  },
}))

function Sidebar({ setAuthToken }) {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  const changeRoute = route => {
    history.push(route)
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setAuthToken(null)
    //  window.location.reload()
    history.push('/')
  }

  return (
    <div className={classes.sidebar}>
      {/* <div className={classes.toolbar} /> */}
      <Icon fontSize="large" className={classes.icon}>
        <TwitterIcon fontSize="large" />
      </Icon>
      <List className={classes.list}>
        <SidebarItem
          label="Home"
          icon={<HomeIcon />}
          onClick={() => {
            changeRoute('/home')
          }}
          selected={location.pathname === '/home'}
        />

        <SidebarItem
          label="Notifications"
          icon={<NotificationsIcon />}
          onClick={() => {
            changeRoute('/notification')
          }}
          selected={location.pathname === '/notification'}
        />
        <SidebarItem
          label="Profile"
          icon={<PermIdentityIcon />}
          onClick={() => {
            changeRoute('/profile')
          }}
          selected={location.pathname === '/profile'}
        />
        <SidebarItem
          label="Search"
          icon={<SearchIcon />}
          onClick={() => {
            changeRoute('/search')
          }}
          selected={location.pathname === '/search'}
        />
      </List>
      <IconButton className={classes.logout} onClick={handleLogout}>
        <ExitToAppIcon />
      </IconButton>
    </div>
  )
}
Sidebar.propTypes = {
  setAuthToken: PropTypes.func.isRequired,
}

export default Sidebar
