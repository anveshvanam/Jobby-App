import './index.css'
import {Link} from 'react-router-dom'

const Header = () => {
  const onclickLogout = () => {}
  return (
    <div className="header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="website-logo"
      />
      <ul className="navs-list">
        <Link to="/" className="nav-link">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="nav-link">
          <li>Jobs</li>
        </Link>
      </ul>
      <button type="button" className="logout-button" onClick={onclickLogout}>
        Logout
      </button>
    </div>
  )
}

export default Header
