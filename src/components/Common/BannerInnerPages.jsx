import React from 'react'
import PropTypes from 'prop-types'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import { Box, Container } from '@material-ui/core'

const useStyles = makeStyles({
  root: {},
  banner: {
    backgroundImage: ({ img }) => `url("${img}")`,
    backgroundColor: '#fafafa',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    padding: 0,
    paddingTop: '25%',
    position: 'relative',
  },
  bannerContentWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
})

function BannerInnerPages({ img }) {
  const classes = useStyles({ img })

  return (
    <Box component="section">
      <Container maxWidth="xl" className={classes.banner}>
        <div className={classes.bannerContentWrapper}>
          <div />
        </div>
      </Container>
    </Box>
  )
}

BannerInnerPages.defaultProps = {
  img: '',
}

BannerInnerPages.propTypes = {
  img: PropTypes.string,
}

export default BannerInnerPages
