import React from 'react'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import { Box, Container, Button, Paper, Typography } from '@material-ui/core'

// react router
import { Link } from 'react-router-dom'

// react-lottie
import Lottie from 'react-lottie'

// components
import HelmetWrapper from 'components/Common/HelmetWrapper'

// assets
import animationData from 'assets/lotties/3227-error-404-facebook-style'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  paperWrapper: {
    position: 'relative',
    marginTop: theme.spacing(20),
    padding: theme.spacing(15, 2, 2, 2),
    borderRadius: theme.shape.borderRadius,
  },
  lottieWrapper: {
    position: 'absolute',
    width: '100%',
    maxWidth: '240px',
    left: 0,
    right: 0,
    margin: '0 auto',
    top: '-120px',
    '& > div': {
      width: '100% !important',
      maxWidth: '240px',
    },
  },
  message404Number: {
    textAlign: 'center',
    marginTop: theme.spacing(5),
  },
  message404: {
    textAlign: 'center',
    marginTop: theme.spacing(1),
  },
  navigateBtnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(5, 0, 3),
  },
  navigateBtn: {
    // color: '#fff',
    fontSize: '14px',
    padding: theme.spacing(1, 2),
    marginRight: theme.spacing(2),
    boxShadow: theme.shadows[2],
    '&:hover': {
      textDecoration: 'none',
    },
  },
}))

function Page404() {
  const classes = useStyles()

  return (
    <>
      <HelmetWrapper
        title="کنگره مجازی رادیولوژی"
        description=" کنگره مجازی رادیولوژی"
        keyword=" کنگره مجازی رادیولوژی"
      />
      <Box component="main" className={classes.root}>
        <Container maxWidth="lg">
          <Paper className={classes.paperWrapper}>
            <div className={classes.lottieWrapper}>
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
            </div>

            <Typography
              variant="h2"
              color="textSecondary"
              component="p"
              className={classes.message404Number}
            >
              ۴۰۴
            </Typography>

            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              className={classes.message404}
            >
              صفحه مورد نظر یافت نشد!
            </Typography>

            <div className={classes.navigateBtnWrapper}>
              <Button
                size="small"
                color="primary"
                variant="outlined"
                component={Link}
                to="/"
                className={classes.navigateBtn}
              >
                بازگشت به خانه
              </Button>
            </div>
          </Paper>
        </Container>
      </Box>
    </>
  )
}

export default Page404
