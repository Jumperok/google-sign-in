import React, { Component } from 'react'
import { User } from './User'
import './App.css'

class App extends Component {
  state = {
    name: null,
    imgUrl: null,
  }

  loadGapiAndThenInitAuth() {
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/platform.js'
    script.async = true
    script.defer = true
    script.onload = this.initAuth

    const meta = document.createElement('meta')
    meta.name = 'google-signin-client_id'
    meta.content = process.env.REACT_APP_GOOGLE_CLIENT_ID

    document.head.appendChild(script)
    document.head.appendChild(meta)
  }

  initAuth = () => {
    const that = this

    const _initOk = () => {
      window.gapi.signin2.render('my-signin2', {
        scope: 'profile email',
        width: 240,
        height: 50,
        longtitle: true,
        theme: 'dark',
        onsuccess: that.onSignInSuccess,
        onfailure: that.onSignInFailure,
      })
    }

    const _initErr = () => {
      console.log('init fail')
    }

    window.gapi.load('auth2', function() {
      window.gapi.auth2
        .init({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        })
        .then(_initOk, _initErr)
    })
  }

  onSignInFailure() {
    console.log('Sign In Fail')
  }

  onSignInSuccess = googleUser =>
    this.setState({
      name: googleUser.getBasicProfile().getGivenName(),
      imgUrl: googleUser.getBasicProfile().getImageUrl(),
    })

  signOut = () => {
    const that = this
    const auth2 = window.gapi.auth2.getAuthInstance()

    auth2.signOut().then(() => that.setState({ name: null }))
  }

  componentDidMount() {
    this.loadGapiAndThenInitAuth()
  }

  renderSignOutButton() {
    return (
      <div className="signOutButton abcRioButton" onClick={this.signOut}>
        <div className="abcRioButtonContentWrapper">
          <div className="abcRioButtonIcon roundIcon">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              height="18px"
              viewBox="0 0 50 50"
              className="abcRioButtonSvg"
            >
              <g>
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </g>
            </svg>
          </div>
          <span className="abcRioButtonContents buttonText">
            <span className="marginRight">Sign Out</span>
          </span>
        </div>
      </div>
    )
  }

  render() {
    const { name, imgUrl } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <p className="Title">Google sign in App</p>
          {name && <User name={name} imgUrl={imgUrl} />}
          <div id="my-signin2" className={name && 'invisibleButton'} />
          {name && this.renderSignOutButton()}
        </div>
      </div>
    )
  }
}

export default App
