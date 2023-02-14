import './index.css'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

class LoginForm extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    showSubmitError: false,
    errorMessage: '',
  }

  onChangeUserInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSubmitSucces = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const loginDetails = {username: usernameInput, password: passwordInput}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(loginDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSucces(data.jwt_token)
    } else {
      this.setState({showSubmitError: true, errorMessage: data.error_msg})
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {
      usernameInput,
      passwordInput,
      showSubmitError,
      errorMessage,
    } = this.state
    return (
      <div className="bg-container">
        <form className="login-form" onSubmit={this.onSubmitLoginForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <label htmlFor="userName" className="label">
            USERNAME
          </label>
          <input
            type="text"
            id="userName"
            className="input"
            value={usernameInput}
            onChange={this.onChangeUserInput}
            placeholder="Username"
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="input"
            onChange={this.onChangePasswordInput}
            placeholder="Password"
            value={passwordInput}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
