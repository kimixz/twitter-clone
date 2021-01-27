import React from 'react'
import PropTypes from 'prop-types'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
} from '@material-ui/core'

// react router
import { Switch, Route, useParams, useLocation, Link } from 'react-router-dom'

// components
import { listNames, contentTypeNames } from 'constants/constants'

const useStyles = makeStyles(theme => ({
  root: {},
  container: {},
  breadcrumbs: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  hoverColor: {
    textDecoration: 'none !important',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}))

function BreadcrumbsSection({ text, chapterCatSlug, chapterCatTitle }) {
  const { type, slug } = useParams()
  const location = useLocation()
  const urlFirstPart = location.pathname.slice(1).split('/')[0].toLowerCase()

  const classes = useStyles()
  return (
    <Box component="section" className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Switch>
          {/* <Route path={['/productlist/:slug', '/contentlist/:slug']}> */}
          <Route path="/productlist/:slug">
            <Breadcrumbs
              separator="›"
              aria-label="breadcrumb"
              className={classes.breadcrumbs}
            >
              <MuiLink
                variant="body2"
                color="inherit"
                to="/"
                component={Link}
                className={classes.hoverColor}
              >
                خانه
              </MuiLink>
              <Typography variant="body2" component="p" color="textPrimary">
                {listNames[urlFirstPart][0] &&
                  `لیست ${listNames[urlFirstPart][0]} ${text}`}
              </Typography>
            </Breadcrumbs>
          </Route>

          <Route path="/panel">
            <Breadcrumbs
              separator="›"
              aria-label="breadcrumb"
              className={classes.breadcrumbs}
            >
              <MuiLink
                variant="body2"
                color="inherit"
                to="/"
                component={Link}
                className={classes.hoverColor}
              >
                خانه
              </MuiLink>
              <Typography variant="body2" component="p" color="textPrimary">
                {listNames[urlFirstPart][0] &&
                  ` ${listNames[urlFirstPart][0]} `}
              </Typography>
            </Breadcrumbs>
          </Route>

          {/* <Route path={['/product/:slug', '/content/:slug']}> */}
          <Route path="/product/:slug">
            <Breadcrumbs
              separator="›"
              aria-label="breadcrumb"
              className={classes.breadcrumbs}
            >
              <MuiLink
                variant="body2"
                color="inherit"
                to="/"
                component={Link}
                className={classes.hoverColor}
              >
                خانه
              </MuiLink>
              <MuiLink
                variant="body2"
                color="inherit"
                to={chapterCatSlug && `/productlist/${chapterCatSlug}`}
                component={Link}
                className={classes.hoverColor}
              >
                {listNames[urlFirstPart][0] &&
                  `لیست ${listNames[urlFirstPart][0]} ${chapterCatTitle}`}
              </MuiLink>
              <Typography variant="body2" component="p" color="textPrimary">
                {text && text}
              </Typography>
            </Breadcrumbs>
          </Route>

          <Route path="/productcompare">
            <Breadcrumbs
              separator="›"
              aria-label="breadcrumb"
              className={classes.breadcrumbs}
            >
              <MuiLink
                variant="body2"
                color="inherit"
                to="/"
                component={Link}
                className={classes.hoverColor}
              >
                خانه
              </MuiLink>
              <Typography variant="body2" component="p" color="textPrimary">
                {text}
              </Typography>
            </Breadcrumbs>
          </Route>

          <Route path="/webinarlist">
            <Breadcrumbs
              separator="›"
              aria-label="breadcrumb"
              className={classes.breadcrumbs}
            >
              <MuiLink
                variant="body2"
                color="inherit"
                to="/"
                component={Link}
                className={classes.hoverColor}
              >
                خانه
              </MuiLink>
              <Typography variant="body2" component="p" color="textPrimary">
                لیست وبینارها {text && text === 'live' ? '(لایو)' : ''}
                {text && text === 'video' ? '(فیلم)' : ''}
              </Typography>
            </Breadcrumbs>
          </Route>

          <Route path="/webinar/:slug">
            <Breadcrumbs
              separator="›"
              aria-label="breadcrumb"
              className={classes.breadcrumbs}
            >
              <MuiLink
                variant="body2"
                color="inherit"
                to="/"
                component={Link}
                className={classes.hoverColor}
              >
                خانه
              </MuiLink>
              <MuiLink
                variant="body2"
                color="inherit"
                to="/webinarlist"
                component={Link}
                className={classes.hoverColor}
              >
                لیست وبینارها
              </MuiLink>
              <Typography variant="body2" component="p" color="textPrimary">
                {text && text}
              </Typography>
            </Breadcrumbs>
          </Route>

          <Route path="/paymentverification">
            <Breadcrumbs
              separator="›"
              aria-label="breadcrumb"
              className={classes.breadcrumbs}
            >
              <MuiLink
                variant="body2"
                color="inherit"
                to="/"
                component={Link}
                className={classes.hoverColor}
              >
                خانه
              </MuiLink>
              <Typography variant="body2" component="p" color="textPrimary">
                نتیجه تراکنش
              </Typography>
            </Breadcrumbs>
          </Route>

          <Route path="/search">
            <Breadcrumbs
              separator="›"
              aria-label="breadcrumb"
              className={classes.breadcrumbs}
            >
              <MuiLink
                variant="body2"
                color="inherit"
                to="/"
                component={Link}
                className={classes.hoverColor}
              >
                خانه
              </MuiLink>
              <Typography variant="body2" component="p" color="textPrimary">
                {`نتایج جستجو برای "${text}"`}
              </Typography>
            </Breadcrumbs>
          </Route>

          <Route path="/">
            <Breadcrumbs
              separator="›"
              aria-label="breadcrumb"
              className={classes.breadcrumbs}
            >
              <MuiLink
                variant="body2"
                color="inherit"
                to="/"
                component={Link}
                className={classes.hoverColor}
              >
                خانه
              </MuiLink>
              {!slug ? (
                <Typography variant="body2" component="p" color="textPrimary">
                  {type
                    ? contentTypeNames[type] && contentTypeNames[type][0]
                    : contentTypeNames[
                        location.pathname.slice(1).toLowerCase()
                      ][0]}
                </Typography>
              ) : (
                <MuiLink
                  variant="body2"
                  color="inherit"
                  to={
                    type
                      ? contentTypeNames[type] &&
                        `/${contentTypeNames[type][1]}/${type}`
                      : `/${
                          contentTypeNames[
                            location.pathname.split('/')[1].toLowerCase()
                          ][1]
                        }`
                  }
                  component={Link}
                  className={classes.hoverColor}
                >
                  {type
                    ? contentTypeNames[type] && contentTypeNames[type][0]
                    : contentTypeNames[
                        location.pathname.split('/')[1].toLowerCase()
                      ][0]}
                </MuiLink>
              )}
              {slug && (
                <Typography variant="body2" component="p" color="textPrimary">
                  {text}
                </Typography>
              )}
            </Breadcrumbs>
          </Route>
        </Switch>
      </Container>
    </Box>
  )
}

BreadcrumbsSection.defaultProps = {
  text: '',
  chapterCatSlug: '',
  chapterCatTitle: '',
}

BreadcrumbsSection.propTypes = {
  text: PropTypes.string,
  chapterCatSlug: PropTypes.string,
  chapterCatTitle: PropTypes.string,
}

export default BreadcrumbsSection
