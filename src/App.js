import React, { useState } from 'react'

// theme
import {
  ThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles'
import theme from 'assets/theme'

// react router
import { Switch, Route, Redirect } from 'react-router-dom'

// layouts
import HomeLayout from 'layouts/HomeLayout'

// components
import Login from 'components/Login/Login'
import Signup from 'components/Signup/Signup'
import SearchBar from 'components/Search/SearchBar'
import ProfileStandAlone from 'components/Profile/ProfileStandAlone'


function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'))
  console.log("AUTH", authToken)
  return (
    <StylesProvider >
      <ThemeProvider theme={theme}>
        <Switch>

          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/profilesearch/:id?" component={ProfileStandAlone} />

          <Route exact path="/searchbar">
            <SearchBar />
          </Route>

          <Route exact path="/">
            {authToken ? (
              <Redirect from="/" to="/home" />
            ) : (
                <Redirect from="/" to="/login" />
              )}
          </Route>

          <Route path="/login">
            {authToken ? (
              <Redirect from="/login" to="/home" />
            ) : (
                <Login setAuthToken={setAuthToken} />
              )}
          </Route>

          <Route path="/">
            <HomeLayout authToken={authToken} setAuthToken={setAuthToken} />
          </Route>


        </Switch>
      </ThemeProvider>
    </StylesProvider>
  )
}

export default App
