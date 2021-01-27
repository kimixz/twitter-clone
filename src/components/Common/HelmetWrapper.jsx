import React from 'react'
import PropTypes from 'prop-types'

// react router
import { useLocation } from 'react-router-dom'

// react-helmet
import { Helmet } from 'react-helmet'

function HelmetWrapper({ title, description, keyword }) {
  const { state } = useLocation()

  return (
    <Helmet>
      <title>
        {/* eslint-disable no-nested-ternary */}
        {title
          ? `${title} | کنگره مجازی رادیولوژی`
          : state
          ? `${state.title} | کنگره مجازی رادیولوژی`
          : 'کنگره مجازی رادیولوژی'}
        {/* eslint-enable no-nested-ternary */}
      </title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keyword} />
    </Helmet>
  )
}

HelmetWrapper.defaultProps = {
  title: null,
  description: 'کنگره مجازی رادیولوژی',
  keyword: 'کنگره مجازی رادیولوژی',
}

HelmetWrapper.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keyword: PropTypes.string,
}

export default HelmetWrapper
