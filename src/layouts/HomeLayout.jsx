import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// @material-ui/core
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  Box,
  Grid,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Hidden,
  Drawer,
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'

// react router
import { useLocation, Switch, Route, Redirect } from 'react-router-dom'

// components
import Home from 'components/Home/Home'
import Sidebar from 'components/Sidebar/Sidebar'
import Profile from 'components/Profile/Profile'
import ProfileEdit from 'components/Profile/ProfileEdit'
import Search from 'components/Search/Search'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    '& >main': {
      minHeight: '100vh',
      width: '100%',
      backgroundColor: theme.palette.secondary.main,
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

function HomeLayout({ authToken, setAuthToken }) {
  const { pathname } = useLocation()

  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const classes = useStyles()
  const theme = useTheme()
  const container =
    window !== undefined ? () => window.document.body : undefined

  return (
    <div className={classes.root}>
      <div className={classes.root}>
        <CssBaseline />
        <Hidden smUp implementation="css">
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Twitter
              </Typography>
            </Toolbar>
          </AppBar>
        </Hidden>

        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <Sidebar setAuthToken={setAuthToken} />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <Sidebar setAuthToken={setAuthToken} />
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          {/* <div className={classes.toolbar} /> */}

          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
            {/* <Route exact path="/profile">
              <Profile />
            </Route> */}
            <Route exact path="/profile/:id?" component={Profile} />
            <Route exact path="/profileedit" component={ProfileEdit} />

            <Route exact path="/search">
              <Search />
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  )
}

HomeLayout.defaultProps = {
  authToken: '',
}

HomeLayout.propTypes = {
  authToken: PropTypes.string,
  setAuthToken: PropTypes.func.isRequired,
}

export default HomeLayout
